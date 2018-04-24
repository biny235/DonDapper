import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

/*
CONSTANTS
*/

// PRODUCTS
const GET_PRODUCTS = 'GET_PRODUCTS';
// CATEGORIES
const GET_CATEGORIES = 'GET_CATEGORIES';
// USER
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
// CART
const GET_CART = 'GET_CART';
// ORDERS
const GET_ORDERS = 'GET_ORDERS';
// LINE ITEMS
const GET_LINE_ITEMS = 'GET_LINE_ITEMS';
const ADD_LINE_ITEM = 'ADD_LINE_ITEM';
const EDIT_LINE_ITEM = 'EDIT_LINE_ITEM';

/*
THUNKS
*/

// PRODUCTS
const fetchProducts = () => {
  return dispatch => {
    axios
      .get('/api/products')
      .then(res => res.data)
      .then(products => dispatch({ type: GET_PRODUCTS, products }))
      .catch(err => console.log(err));
  };
};

// CATEGORIES
const fetchCategories = () => {
  return dispatch => {
    axios
      .get('/api/categories')
      .then(res => res.data)
      .then(categories => dispatch({ type: GET_CATEGORIES, categories }))
      .catch(err => console.log(err));
  };
};

// USER
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

// CART
const fetchCart = userId => {
  return dispatch => {
    axios
      .get(`/api/users/${userId}/cart`)
      .then(res => res.data)
      .then(cart => dispatch({ type: GET_CART, cart }))
      .catch(err => console.log(err));
  };
};

// ORDERS
const fetchOrders = () => {
  return dispatch => {
    axios
      .get('/api/orders')
      .then(res => res.data)
      .then(orders => dispatch({ type: GET_ORDERS, orders }))
      .catch(err => console.log(err));
  };
};

// LINE ITEMS
const fetchLineItems = () => {
  return dispatch => {
    axios
      .get('/api/lineItems')
      .then(res => res.data)
      .then(lineItems => dispatch({ type: GET_LINE_ITEMS, lineItems }))
      .catch(err => console.log(err));
  };
};

const addLineItem = (lineItem) => {
  return dispatch => {
    axios
      .post('/api/lineItems', lineItem)
      .then(res => res.data)
      .then(lineItem => dispatch({ type: ADD_LINE_ITEM, lineItem }))
      .catch(err => console.log(err));
  };
};

const editLineItem = (lineItem, id) => {
  return dispatch => {
    axios
      .put(`/api/lineItems/${id}`, lineItem)
      .then(res => res.data)
      .then(lineItem => dispatch({ type: EDIT_LINE_ITEM, lineItem }))
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
      return action.orders;
  }
  return state;
};

const lineItemsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_LINE_ITEMS:
      return action.lineItems;
    case ADD_LINE_ITEM:
      return [...state, action.lineItem];
    case EDIT_LINE_ITEM:
      return state.map(lineItem => {
        return lineItem.id === action.lineItem.id ? action.lineItem : lineItem;
      });
  }
  return state;
};

const reducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  user: userReducer,
  cart: cartReducer,
  orders: ordersReducer,
  lineItems: lineItemsReducer
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export { fetchProducts, fetchCategories, fetchUser, fetchCart, fetchOrders, fetchLineItems, addLineItem, editLineItem };
