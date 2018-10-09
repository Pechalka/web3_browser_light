import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as browserReducer } from './browser';

const store = createStore(browserReducer, applyMiddleware(thunk));


export default store;