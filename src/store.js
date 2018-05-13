import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

// Setting axios headers
let token = window.localStorage.getItem('token');
axios.defaults.headers.common.token = token;

/*
CONSTANTS
*/

// PRODUCTS
const GET_PRODUCTS = 'GET_PRODUCTS';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

// CATEGORIES
const GET_CATEGORIES = 'GET_CATEGORIES';

// USER
const GET_USER = 'GET_USER';
const GET_USERS = 'GET_USERS';

// CART
const GET_CART = 'GET_CART';
const EDIT_ORDER = 'EDIT_ORDER';

// ORDERS
const ADD_ORDER = 'ADD_ORDER';
const GET_ORDERS = 'GET_ORDERS';

// LINE ITEMS
const GET_CART_LINE_ITEMS = 'GET_CART_LINE_ITEMS';
const CREATE_LINE_ITEM = 'CREATE_LINE_ITEM';
const UPDATE_LINE_ITEM = 'UPDATE_LINE_ITEM';
const DELETE_LINE_ITEM = 'DELETE_LINE_ITEM';

// LOGOUT
const RESET_STATE = 'RESET_STATE';

/*
THUNKS
*/

// PRODUCTS
const fetchProducts = () => {
  return dispatch => {
    axios
      .get('/api/products')
      .then(res => res.data)
      .then(products => dispatch({ type: GET_PRODUCTS, products }));
  };
};

const createOrUpdateProduct = product => {
  return dispatch => {
    const { id } = product;
    const putOrPost = !id ? 'post' : 'put';
    return axios[putOrPost](`/api/products/${id ? id : ''}`, { product })
      .then(res => res.data)
      .then(product => {
        if (!id) {
          return dispatch({ type: CREATE_PRODUCT, product });
        } else {
          return dispatch({ type: EDIT_PRODUCT, product });
        }
      });
  };
};

// CATEGORIES
const fetchCategories = () => {
  return dispatch => {
    axios
      .get('/api/categories')
      .then(res => res.data)
      .then(categories => dispatch({ type: GET_CATEGORIES, categories }));
  };
};

// USERS
const fetchUser = user => {
  return dispatch => {
    dispatch(login(user));
  };
};

const login = user => {
  return dispatch => {
    return axios
      .post(`/api/users/login`, { user })
      .then(res => res.data)
      .then(token => {
        axios.defaults.headers.common.token = token;
        window.localStorage.setItem('token', token);
        dispatch(authenticateUser);
      });
  };
};

const logout = (path, history, dispatch) => {
  window.localStorage.removeItem('token');
  if (path === '/checkout' || path === '/user') {
    history.push(`/`);
  }
  return dispatch({ type: RESET_STATE });
};

const authenticateUser = dispatch => {
  return axios
    .get('/api/users')
    .then(res => res.data)
    .then(user => {
      dispatch({ type: GET_USER, user });
      dispatch(fetchCart(user.id));
      dispatch(fetchOrders(user));
    })
    .catch(err => {
      window.localStorage.removeItem('token');
      console.log(err);
    });
};

const createOrUpdateUser = (user, history, admin) => {
  const { id } = user;
  const putOrPost = id ? 'put' : 'post';
  return dispatch => {
    return axios[putOrPost](`/api/users/${id ? id : ''}`, { user })
      .then(res => res.data)
      .then(user => {
        admin ? dispatch(showUsers()) : dispatch(login(user, dispatch));
        if (history) {
          history.push(`/user`);
        }
      });
  };
};

const showUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users/all')
      .then(res => res.data)
      .then(users => {
        dispatch({ type: GET_USERS, users });
      });
  };
};

// ORDERS
const fetchOrders = user => {
  const { id, admin } = user;
  const userId = id;
  return dispatch => {
    let pathName;
    admin
      ? (pathName = `/api/orders`)
      : (pathName = `/api/users/${userId}/orders`);
    return axios
      .get(pathName)
      .then(res => res.data)
      .then(orders => {
        dispatch({ type: GET_ORDERS, orders });
      });
  };
};

const editOrder = (order, history) => {
  const { id } = order;
  return dispatch => {
    axios
      .put(`/api/orders/${id}`, order)
      .then(res => res.data)
      .then(order => {
        dispatch({ type: EDIT_ORDER, order });
        dispatch(fetchCart(order.userId));
        if (history) {
          dispatch({ type: ADD_ORDER, order });
          history.push(`/user`);
        }
      })

      .catch(err => console.log(err));
  };
};

// ADDRESS
const createOrUpdateAddress = (address, cart) => {
  return dispatch => {
    const { id } = address;
    const putOrPost = !id ? 'post' : 'put';
    return axios[putOrPost](`api/addresses/${id ? id : ''}`, { address })
      .then(res => res.data)
      .then(address => {
        dispatch(editOrder({ id: cart.id, addressId: address.id }));
        dispatch(authenticateUser);
      });
  };
};

// CART
const fetchCart = userId => {
  return dispatch => {
    const lineItems = JSON.parse(window.localStorage.getItem('lineItems')) || [];
    if (!userId) {
      dispatch({ type: GET_CART_LINE_ITEMS, cartLineItems: lineItems });
    } else {
      axios
        .get(`/api/users/${userId}/cart`)
        .then(res => res.data)
        .then(cart => {
          const cartLineItems = cart.lineItems;
          // const products = {};
          // const cartLineItems = lineItems.map(lineItem => {
          //   lineItem.orderId = cart.id;
          //   return lineItem;
          // })
          //   .concat(cart.lineItems);
          // cartLineItems.forEach(lineItem => {
          //   if (!products[lineItem.productId]) {
          //     products[lineItems.productId] = lineItem.quantity;
          //   }
          //   else {
          //     products[lineItems.productId] += lineItem.quantity;
          //   }
          // });
          dispatch({ type: GET_CART, cart });
          dispatch({ type: GET_CART_LINE_ITEMS, cartLineItems });
        })
        .then(() => window.localStorage.removeItem('lineItems'))
        .catch(err => console.log(err));
    }
  };
};

// LINE ITEMS
const addLineItem = (lineItem, user, history) => {
  return dispatch => {
    if (!user.id) {
      const lineItems = JSON.parse(window.localStorage.getItem('lineItems')) || [];
      const cartLineItems = [...lineItems, lineItem];
      window.localStorage.setItem('lineItems', JSON.stringify(cartLineItems));
      dispatch({ type: GET_CART_LINE_ITEMS, cartLineItems });
      history && history.push(`/cart`);
    } else {
      axios
        .post(`/api/lineItems`, lineItem)
        .then(res => res.data)
        .then(lineItem => {
          if (history) {
            dispatch({ type: CREATE_LINE_ITEM, lineItem });
            history.push(`/cart`);
          }
        })
        .catch(err => console.log(err));
    }
  };
};

const editLineItem = (lineItem, lineItemId, history) => {
  return dispatch => {
    if (!lineItemId) {
      const lineItems = JSON.parse(window.localStorage.getItem('lineItems'));
      const cartLineItems =
        lineItems &&
        lineItems.map(cartLineItem => {
          if (lineItem.productId === cartLineItem.productId) {
            cartLineItem = lineItem;
          }
          return cartLineItem;
        });
      window.localStorage.setItem('lineItems', JSON.stringify(cartLineItems));
      dispatch({ type: GET_CART_LINE_ITEMS, cartLineItems });
      history && history.push(`/cart`);
    } else {
      axios
        .put(`/api/lineItems/${lineItemId}`, lineItem)
        .then(res => res.data)
        .then(lineItem => dispatch({ type: UPDATE_LINE_ITEM, lineItem }))
        .then(() => history && history.push(`/cart`))
        .catch(err => console.log(err));
    }
  };
};

const deleteLineItem = lineItem => {
  return dispatch => {
    if (!lineItem.id) {
      const lineItems = JSON.parse(window.localStorage.getItem('lineItems'));
      const cartLineItems =
        lineItems &&
        lineItems.filter(_lineItem => _lineItem.productId !== lineItem.productId);
      window.localStorage.setItem('lineItems', JSON.stringify(cartLineItems));
      dispatch({ type: GET_CART_LINE_ITEMS, cartLineItems });
    }
    else {
      axios
        .delete(`/api/lineItems/${lineItem.id}`)
        .then(res => res.data)
        .then(() => dispatch({ type: DELETE_LINE_ITEM, lineItem }))
        .catch(err => console.log(err));
    }
  };
};

/*
REDUCERS
*/

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case EDIT_PRODUCT:
      return state.map(
        product => (product.id === action.product.id ? action.product : product)
      );
    case CREATE_PRODUCT:
      return [...state, action.product];
  }
  return state;
};

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
  }
  return state;
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case RESET_STATE:
      return {};
  }
  return state;
};
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
  }
  return state;
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case RESET_STATE:
      return {};
  }
  return state;
};

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case EDIT_ORDER:
      return state.map(
        order => (order.id === action.id ? action.order : order)
      );
    case ADD_ORDER:
      return [...state, action.order];
    case RESET_STATE:
      return [];
  }
  return state;
};

const lineItemsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART_LINE_ITEMS:
      return action.cartLineItems;
    case CREATE_LINE_ITEM:
      return [...state, action.lineItem];
    case UPDATE_LINE_ITEM:
      return state.map(lineItem => {
        return lineItem.productId === action.lineItem.productId
          ? action.lineItem
          : lineItem;
      });
    case DELETE_LINE_ITEM:
      return state.filter(lineItem => lineItem.productId !== action.lineItem.productId);
    case RESET_STATE:
      return [];
  }
  return state;
};

const reducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  user: userReducer,
  cart: cartReducer,
  lineItems: lineItemsReducer,
  orders: ordersReducer,
  users: usersReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

export {
  fetchProducts,
  fetchCategories,
  fetchUser,
  fetchCart,
  fetchOrders,
  editOrder,
  addLineItem,
  editLineItem,
  deleteLineItem,
  createOrUpdateUser,
  logout,
  authenticateUser,
  createOrUpdateAddress,
  createOrUpdateProduct,
  showUsers
};
