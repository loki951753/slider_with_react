import React from 'react';
import { Route, IndexRoute, Redirect, Link } from 'react-router';

import App from './components/App';
import SliderMaker from './containers/SliderMaker'
import NotFoundView from './views/NotFoundView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SliderMaker} />
    <Route path="404" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
);
