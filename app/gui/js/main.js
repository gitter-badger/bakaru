require('font-awesome/css/font-awesome.css');
require('../styles/font.css');
require('../styles/main.scss');

import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Header from 'components/Header';
import Layer from 'components/Layer';

import appReducers from './reducers';
import { setStore } from './rpc';

const store = createStore(appReducers);

setStore(store);

const Gui = () => (
  <gui>
    <Header />
    <Layer />
  </gui>
);

ReactDom.render(
  <Provider store={store}>
    <Gui />
  </Provider>,
  document.getElementById('gui-mount')
);
