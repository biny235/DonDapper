import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

// PRODUCTS
const GET_PRODUCTS = 'GET_PRODUCTS';

const fetchProducts = ()=>{
  return dispatch =>{
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch({type: GET_PRODUCTS, products}))
      .catch(err => console.log(err))
  }
};

const productsReducer = (state = [], action)=>{
  switch(action.type){
    case GET_PRODUCTS:
      return action.products
  }
  return state
};

//USER
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

const fetchUser = (userId) =>{
  return dispatch =>{
    axios.get(`/api/users/${userId}`)
      .then(res => res.data)
      .then(user => dispatch({type: setUser, user}))
  }
}

const userReducer = (state = [], action) => {
  switch(action.type){
    case SET_USER:
      return action.user;
    case LOG_OUT:
      return []
  }
  return state;
}


//REDUCER
const reducer = combineReducers({
  products: productsReducer,
  users: userReducer
})




export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export { fetchProducts }