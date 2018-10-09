import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Browser from './Browser';
import Apps from './Apps';
import Settings from './Settings';

import { Provider } from "react-redux";

import Application from './Application';

import { IndexRoute, Route, Router, hashHistory } from 'react-router';

import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
	<Router history={ hashHistory }>
        <Route path='/' component={ Application }>
          <Route path='/apps' component={ Apps } />
          <Route path='/settings' component={ Settings } />
          <Route path='/:q^:app/:path' component={ Browser } />
          <Route path='/:q^:app' component={ Browser } />
          <Route path='/^:app/:path' component={ Browser } />
          <Route path='/^:app' component={ Browser } />
          <IndexRoute component={ Browser } />
          <Route path='*' exact={true} component={Apps} />
        </Route>
    </Router>
    </Provider>
, document.getElementById('root'));
