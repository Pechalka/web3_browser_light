import {URLToDURA, DURAToURL} from '../utils';
import {getRegistryItems} from './rootRegistry';
import {hashHistory} from 'react-router';
import {getIpfsEndpoint} from "./settings";

//TODO: proccess loading

const START_DURA = '';

const initState = {
    url: DURAToURL(START_DURA).url,
    dura: START_DURA,
    loading: false
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'NAVIGATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'UPDATE_DURA': {
            return {
                ...state,
                dura: action.payload
            }
        }
        default:
            return state;
    }
}

export const init = (_IPFS_END_POINT) => (dispatch, getState) => {
    const dura = localStorage.getItem('LAST_DURA') || '';
    dispatch(navigate(dura, true))
}

export const navigate = (_dura, init = false) => (dispatch, getState) => {
    const apps = getRegistryItems(getState());
    const ipfsEndpoint = getIpfsEndpoint(getState());
    const {url, dura} = DURAToURL(_dura, apps, ipfsEndpoint);
    if (_dura === 'root.cyb') {
        if (!init)
            hashHistory.push('/rootregistry');
        dispatch(updateDURA(_dura));
        return;
    }

    if (_dura === 'settings.cyb') {
        if (!init)
            hashHistory.push('/settings');
        dispatch(updateDURA(_dura));
        return;
    }

    if (_dura === 'wallet.cyb') {
        if (!init)
            hashHistory.push('/wallet');
        dispatch(updateDURA(_dura));
        return;
    }

    if (_dura === '') {
        if (!init)
            hashHistory.push('/');
        dispatch(updateDURA(_dura));
        return;
    }

    console.log('navigate');
    console.log('dura', dura);
    console.log('url', url);
    console.log('');

    dispatch(updateDURA(dura));


    dispatch({
        type: 'NAVIGATE',
        payload: {
            url,
            dura,
            loading: false
        }
    })
    if (!init)
        hashHistory.push('/browser');
}

export const willNavigate = (url) => (dispatch, getState) => {
    const apps = getRegistryItems(getState());
    const ipfsEndpoint = getIpfsEndpoint(getState());

    let dura = URLToDURA(url, apps, ipfsEndpoint);

    if (url.indexOf('cyb://') !== -1) {
        dura = url.split('cyb://')[1]
    }

    console.log('will-navigate');
    console.log('url', url);
    console.log('dura', dura);
    console.log('');

    dispatch(navigate(dura));
}

export const didNavigateInPage = (url) => (dispatch, getState) => {
    const apps = getRegistryItems(getState());
    const ipfsEndpoint = getIpfsEndpoint(getState());

    const dura = URLToDURA(url, apps, ipfsEndpoint);
    console.log('did-navigate-in-page ');
    console.log('url', url);
    console.log('dura', dura);


    dispatch(updateDURA(dura));
}

export const updateDURA = (dura) => (dispatch, getState) => {
    localStorage.setItem('LAST_DURA', dura);
    dispatch({
        type: 'UPDATE_DURA',
        payload: dura
    })
}
