import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Application from './Application';
import Browser from './Browser';
import Apps from './Apps';
import Settings from './Settings';
import Home from './Home';
import Wallet from './Wallet';

import { Provider } from "react-redux";
import store from './redux/store';
import { init } from './redux/browser';

import { IndexRoute, Route, Router, hashHistory } from 'react-router';


ReactDOM.render(
  <Provider store={store}>
  	<Router history={ hashHistory }>
          <Route path='/' component={ Application }>
            <Route path='/apps' component={ Apps } />
            <Route path='/settings' component={ Settings } />
            <Route path='/wallet' component={ Wallet } />
            <Route path='/browser' component={ Browser } />
            <IndexRoute component={ Home } />
            <Route path='*' exact={true} component={Apps} />
          </Route>
      </Router>
    </Provider>
, document.getElementById('root'));


store.dispatch(init());