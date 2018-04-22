import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

// PRODUCTS
const GET_PRODUCTS = 'GET_PRODUCTS';

const fetchProducts = () => {
  return dispatch => {
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch({ type: GET_PRODUCTS, products }))
      .catch(err => console.log(err));
  };
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
  }
  return state;
};

//USER
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

const fetchUser = (user) => {
  let _user;
  return dispatch => {
    axios.post(`/api/users/`, { user })
      .then(res => res.data)
      .then(user => {
        _user = user;
        dispatch({ type: SET_USER, user });
      })
      .catch(err => console.log(err));
  };
};

const userReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case LOG_OUT:
      return [];
  }
  return state;
};


//CART
const GET_CART = 'GET_CART';

const fetchCart = (userId) => {
  return dispatch => {
    axios.get(`/api/users/${userId}/cart`)
      .then(res => res.data)
      .then(cart => dispatch({ type: GET_CART, cart }));
  };
};

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
  }
  return state;
};

//ORDERS
const GET_ORDERS = 'GET_ORDERS';

const fetchOrders = () => {
  return dispatch => {
    axios.get(`/api/orders`)
      .then(res => res.data)
      .then(orders => dispatch({ type: GET_ORDERS, orders }));
  };
};

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
  }
  return state;
};

//LINE ITEMS
const GET_LINEITEMS = 'GET_LINEITEMS';

const fetchLineItems = () => {
  return dispatch => {
    axios.get(`/api/lineItems`)
      .then(res => res.data)
      .then(lineItems => dispatch({ type: GET_LINEITEMS, lineItems }));
  };
};

const lineItemsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_LINEITEMS:
      return action.lineItems;
  }
  return state;
};

//REDUCER
const reducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  cart: cartReducer,
  orders: ordersReducer,
  lineItems: lineItemsReducer
});


export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export { fetchProducts, fetchUser, fetchOrders, fetchLineItems };
