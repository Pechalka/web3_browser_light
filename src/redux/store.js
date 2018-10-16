import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { reducer as browserReducer } from './browser';
import { reducer as walletReducer } from './wallet';


const rootReducer = combineReducers({
    browser: browserReducer,
    wallet: walletReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;
