import { render } from 'react-dom';
//import { Provider } from 'react-redux';
import React from 'react';
//import store from './store';
import Main from './main';

const app = document.getElementById('app');

render(
  // <Provider store={store}>
  <Main />,
  // </Provider>,
  app
);
