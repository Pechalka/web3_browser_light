import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Application from './Application';
import Browser from './Browser';
import RootRegistry from './RootRegistry';
import Settings from './Settings';
import Home from './Home';
import Wallet from './Wallet';

import { Provider } from "react-redux";
import { store, appStart } from './redux/store';

import { IndexRoute, Route, Router, hashHistory } from 'react-router';


ReactDOM.render(
  <Provider store={store}>
  	<Router history={ hashHistory }>
          <Route path='/' component={ Application }>
            <Route path='/rootregistry' component={ RootRegistry } />
            <Route path='/settings' component={ Settings } />
            <Route path='/wallet' component={ Wallet } />
            <Route path='/browser' component={ Browser } />
            <IndexRoute component={ Home } />
            <Route path='*' exact={true} component={RootRegistry} />
          </Route>
      </Router>
    </Provider>
, document.getElementById('root'));

appStart(store);


