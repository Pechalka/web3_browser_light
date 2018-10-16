import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { 
	reducer as browserReducer,
	init as initBrowser
} from './browser';
import { 
	reducer as walletReducer,
	init as initWallet
} from './wallet';


import { 
	reducer as settingReducer,
	init as initSettings 
} from './settings';


const rootReducer = combineReducers({
    browser: browserReducer,
    wallet: walletReducer,
    settings: settingReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));


export const appStart = () => {
	store.dispatch(initSettings()).then(({ IPFS_END_POINT, PARITTY_END_POINT}) => {
	  store.dispatch(initBrowser(IPFS_END_POINT));  
	  store.dispatch(initWallet(PARITTY_END_POINT))
	})
}

export { store };
