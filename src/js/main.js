import '../styles/styles.sass';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore  from './store/configureStore';

import SliderMaker from './components/SliderMaker'

const store = configureStore();
const rootElement = document.getElementById('app');
let ComponentEl;

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./containers/DevTools').default;
  const Perf = require('react-addons-perf')
  Perf.enableMeasure = true
  window.Perf = Perf
  console.log(Perf);
  // window.Perf.start()
  // If using routes
  // <DevTools></DevTools>
  ComponentEl = (
    <SliderMaker></SliderMaker>
  );
} else {
  ComponentEl = (
    <SliderMaker></SliderMaker>
  );
}

// Render the React application to the DOM
ReactDOM.render(
  <Provider store={store}>
    {ComponentEl}
  </Provider>,
  rootElement
);
