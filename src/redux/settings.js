import {init as initWallet, getStatus } from './wallet';
import axios from 'axios';

let initState = {
    IPFS_END_POINT: 'http://earth.cybernode.ai:34402',
    PARITTY_END_POINT: 'http://earth.cybernode.ai:34645',
    SEARCH_END_POINT: 'http://earth.cybernode.ai:34657',

    pending: false,
    ipfsStatus: 'fail',
    ethNodeStatus: 'fail',
    cyberNodeStatus: 'fail'
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
        case 'SET_STATUS': {
            return {
                ...state,
                ...action.payload,
                pending: false
            }
        }

        case 'SET_CHECKING_PENDING': {
            return {
                ...state,
                pending: true
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
    dispatch(checkStatus());
}

export const setParity = (PARITTY_END_POINT) => (dispatch, getState) => {
    dispatch({type: 'SET_PARITTY_END_POINT', payload: PARITTY_END_POINT});
    dispatch(saveSettingsInLS());
    dispatch(initWallet(PARITTY_END_POINT));
    dispatch(checkStatus());
}

export const setSearch = (SEARCH_END_POINT) => (dispatch, getState) => {
    dispatch({type: 'SET_SEARCH_END_POINT', payload: SEARCH_END_POINT});
    dispatch(saveSettingsInLS());
    dispatch(checkStatus());
}

const getIPFSStatus = (url) => new Promise(resolve => {
    axios.get(url + '/ipfs/QmZfSNpHVzTNi9gezLcgq64Wbj1xhwi9wk4AxYyxMZgtCG', { timeout: 4 * 1000 })
        .then(data => {
            if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1) {
                resolve('local')
            } else {
                resolve('remote')
            }
        }).catch(e => {
            resolve('fail')
        })
})

const getCyberStatus = (url) => new Promise(resolve => {
    axios.head(url + '/health', { timeout: 4 * 1000 })
        .then(data => {
            if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1) {
                resolve('local')
            } else {
                resolve('remote')
            }
        }).catch(e => {
            resolve('fail')
        })
}) 

export const checkStatus = () => (dispatch, getState) => {
    const {
        IPFS_END_POINT,
        PARITTY_END_POINT,
        SEARCH_END_POINT
    } = getState().settings;

    dispatch({ type: 'SET_CHECKING_PENDING' })

    Promise.all([
        getIPFSStatus(IPFS_END_POINT),
        getStatus(PARITTY_END_POINT),
        getCyberStatus(SEARCH_END_POINT)
    ]).then(([ipfsStatus, ethNodeStatus, cyberNodeStatus]) => {
        dispatch({
            type: 'SET_STATUS',
            payload: {
                ipfsStatus,
                ethNodeStatus,
                cyberNodeStatus
            }
        })
    })
    
}

export const resetAllSettings = () => (dispatch, getState) => {
    localStorage.removeItem('settings');
    localStorage.removeItem('rootRegistry');
    localStorage.removeItem('appMenu');
    dispatch(init());
    dispatch(checkStatus());
}

