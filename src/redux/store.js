import {createStore, applyMiddleware, combineReducers} from 'redux';
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

import {
    reducer as rootRegistryReducer,
    init as initRootRegistry
} from './rootRegistry';


const rootReducer = combineReducers({
    browser: browserReducer,
    wallet: walletReducer,
    settings: settingReducer,
    rootRegistry: rootRegistryReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));


export const appStart = () => {
    store.dispatch(initSettings()).then(({IPFS_END_POINT, PARITTY_END_POINT}) => {
        store.dispatch(initBrowser(IPFS_END_POINT));
        store.dispatch(initWallet(PARITTY_END_POINT));
        store.dispatch(initRootRegistry());
    })
}

export {store};
