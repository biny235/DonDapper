import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

//======CONST======================

// PRODUCTS
const GET_PRODUCTS = 'GET_PRODUCTS';
//USER
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
//CART
const GET_CART = 'GET_CART';
//ORDERS
const GET_ORDERS = 'GET_ORDERS';
//========THUNKS==========

//PRODUCTS
const fetchProducts = () => {
  return dispatch => {
    axios
      .get('/api/products')
      .then(res => res.data)
      .then(products => dispatch({ type: GET_PRODUCTS, products }))
      .catch(err => console.log(err));
  };
};
//USER
const fetchUser = user => {
  let _user;
  return dispatch => {
    axios
      .post(`/api/users/`, { user })
      .then(res => res.data)
      .then(user => {
        _user = user;
        dispatch({ type: SET_USER, user });
      })
      .catch(err => console.log(err));
  };
};
//CART
const fetchCart = userId => {
  return dispatch => {
    axios
      .get(`/api/users/${userId}/cart`)
      .then(res => res.data)
      .then(cart => dispatch({ type: GET_CART, cart }));
  };
};
//ORDERS

const fetchOrders = userId => {
  return dispatch => {
    axios
      .get(`/api/users/${userId}/orders`)
      .then(res => res.data)
      .then(orders => {
        console.log('YEY');
        dispatch({ type: GET_ORDERS, orders });
      });
  };
};

<<<<<<< HEAD
const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
  }
  return state;
};

//LINE ITEMS
const GET_LINEITEMS = 'GET_LINEITEMS';
=======
//==========REDUCERS====================
>>>>>>> master

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
  }
  return state;
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
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
  }
  return state;
};

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.cart;
  }
  return state;
};

const reducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  cart: cartReducer,
  orders: ordersReducer
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export { fetchProducts, fetchUser, fetchCart, fetchOrders };
