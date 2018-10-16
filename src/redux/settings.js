import {init as initWallet} from './wallet';

let initState = {
    IPFS_END_POINT: 'http://earth.cybernode.ai:34402',
    PARITTY_END_POINT: 'http://localhost:8545',
    SEARCH_END_POINT: 'http://earth.cybernode.ai:34657'
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'INIT_SETTINGS': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'SET_IPFS_END_POINT': {
            return {
                ...state,
                IPFS_END_POINT: action.payload
            }
        }
        case 'SET_PARITTY_END_POINT': {
            return {
                ...state,
                PARITTY_END_POINT: action.payload
            }
        }

        case 'SET_SEARCH_END_POINT': {
            return {
                ...state,
                SEARCH_END_POINT: action.payload
            }
        }
        default:
            return state;
    }
}

export const getIpfsEndpoint = (state) => {
    return state.settings.IPFS_END_POINT;
}

export const init = () => (dispatch, getState) => new Promise(resolve => {
    const __settings = localStorage.getItem('settings')
        ? JSON.parse(localStorage.getItem('settings'))
        : initState;
    dispatch({
        type: 'INIT_SETTINGS',
        payload: __settings
    })
    resolve(__settings);
})

const saveSettingsInLS = () => (dispatch, getState) => {
    const {settings} = getState();
    localStorage.setItem('settings', JSON.stringify(settings));
}

export const setIPFS = (IPFS_END_POINT) => (dispatch, getState) => {
    dispatch({type: 'SET_IPFS_END_POINT', payload: IPFS_END_POINT});
    dispatch(saveSettingsInLS());
}

export const setParity = (PARITTY_END_POINT) => (dispatch, getState) => {
    dispatch({type: 'SET_PARITTY_END_POINT', payload: PARITTY_END_POINT});
    dispatch(saveSettingsInLS());
    dispatch(initWallet(PARITTY_END_POINT));
}

export const setSearch = (SEARCH_END_POINT) => (dispatch, getState) => {
    dispatch({type: 'SET_SEARCH_END_POINT', payload: SEARCH_END_POINT});
    dispatch(saveSettingsInLS());
}

