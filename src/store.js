import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_USERS = 'GET_USERS';


const fetchProducts = ()=>{
  return dispatch =>{
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch({type: GET_PRODUCTS, products}))
      .catch(err => console.log(err))
  }

}

const productsReducer = (state = [], action)=>{
  switch(action.type){
    case GET_PRODUCTS:
      return action.products
  }
  return state
};


const reducer = combineReducers({
  products: productsReducer,
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export { fetchProducts }