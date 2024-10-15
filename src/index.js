import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.js';
import Intl from './Utils/Intl.js'

const container = document.getElementById('container');


const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <Intl />
  </Provider>
);