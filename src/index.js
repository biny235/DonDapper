import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom'
import store, {fetchProducts} from './store';
import Main from './main';


const app = document.getElementById('app');

store.dispatch(fetchProducts())
render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  app
);
