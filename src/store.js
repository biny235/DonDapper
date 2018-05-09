import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

//Setting axios headers
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

// CART
const GET_CART = 'GET_CART';
const EDIT_ORDER = 'EDIT_ORDER';

// ORDERS
const ADD_ORDER = 'ADD_ORDER';
const GET_ORDERS = 'GET_ORDERS';

// LINE ITEMS
const GET_LINE_ITEMS = 'GET_LINE_ITEMS';
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

// USER
const fetchUser = user => {
  return dispatch => {
    login(user, dispatch);
  };
};

const login = (user, dispatch) => {
  return axios
    .post(`/api/users/login`, { user })
    .then(res => res.data)
    .then(token => {
      axios.defaults.headers.common.token = token;
      window.localStorage.setItem('token', token);
      dispatch(authenticateUser);
    });
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

const createOrUpdateUser = (user, history) => {
  const { id } = user;
  const putOrPost = id ? 'put' : 'post';
  return dispatch => {
    return axios[putOrPost](`/api/users/${id ? id : ''}`, { user })
      .then(res => res.data)
      .then(user => {
        login(user, dispatch);
        if (history) {
          history.push(`/user`);
        }
      });
  };
};

// CART
const fetchCart = userId => {
  return dispatch => {
    axios
      .get(`/api/users/${userId}/cart`)
      .then(res => res.data)
      .then(cart => {
        dispatch({ type: GET_CART, cart });
        dispatch({ type: GET_LINE_ITEMS, lineItems: cart.lineItems || [] });
      })
      .catch(err => console.log(err));
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

//ADDRESS
const createOrUpdateAddress = (address, cart) => {
  return dispatch => {
    const { id } = address;
    const putOrPost = !id ? 'post' : 'put';

   return axios[putOrPost](`api/addresses/${id ? id : ''}`, { address })
      .then(res => res.data)
      .then(address => {
        dispatch(editOrder({ id: cart.id, addressId: address.id }));
      })
      .then(() => dispatch(authenticateUser));
  };
};

// LINE ITEMS
const addLineItem = (lineItem, history) => {
  return dispatch => {
    axios
      .post(`/api/lineItems`, lineItem, history)
      .then(res => res.data)
      .then(lineItem => dispatch({ type: CREATE_LINE_ITEM, lineItem }))
      .then(() => history && history.push(`/cart`))
      .catch(err => console.log(err));
  };
};

const editLineItem = (lineItem, lineItemId, history) => {
  return dispatch => {
    axios
      .put(`/api/lineItems/${lineItemId}`, lineItem)
      .then(res => res.data)
      .then(lineItem => dispatch({ type: UPDATE_LINE_ITEM, lineItem }))
      .then(() => {
        if (history) {
          history.push(`/cart`);
        }
      })
      .catch(err => console.log(err));
  };
};

const deleteLineItem = lineItem => {
  return dispatch => {
    axios
      .delete(`/api/lineItems/${lineItem.id}`)
      .then(res => res.data)
      .then(() => dispatch({ type: DELETE_LINE_ITEM, lineItem }))
      .catch(err => console.log(err));
  };
};

// EMAIL
const sendEmail = (email, history) => {
  return dispatch => {
    axios
      .post(`/api/email/send`, email, history)
      .then(res => res.data)
      .catch(err => console.log(err));
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
    case GET_LINE_ITEMS:
      return action.lineItems;
    case CREATE_LINE_ITEM:
      return [...state, action.lineItem];
    case UPDATE_LINE_ITEM:
      return state.map(lineItem => {
        return lineItem.id === action.lineItem.id ? action.lineItem : lineItem;
      });
    case DELETE_LINE_ITEM:
      return state.filter(lineItem => lineItem.id !== action.lineItem.id);
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
  orders: ordersReducer
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
  createOrUpdateProduct
};
