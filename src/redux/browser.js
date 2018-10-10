
import { URLToDURA, DURAToURL } from '../utils';
import { getApps, getSettings } from '../store';
import { hashHistory } from 'react-router';

// MOVE proccess loading, home page, rewrite all to reudx

let apps = {};
let IPFS_END_POINT;


const START_DURA = '';

const initState = {
	url: DURAToURL(START_DURA).url,
	dura: START_DURA,
	loading: false
}


export const reducer = (state = initState, action) => {
	switch(action.type) {
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

export const init = () => (dispatch, getState) => {
	Promise.all([
      getApps(),
      getSettings('IPFS_END_POINT')
    ]).then(([_apps, _IPFS_END_POINT]) => {
      apps = _apps;
      IPFS_END_POINT = _IPFS_END_POINT;

      const dura = localStorage.getItem('LAST_DURA')||'';

      dispatch(navigate(dura, true))
    })
}

export const navigate = (_dura, init = false) => (dispatch, getState) => {
	const { url, dura } = DURAToURL(_dura, apps, IPFS_END_POINT)
  if (_dura === 'apps.cyb') {
    if (!init)
      hashHistory.push('/apps');
    dispatch(updateDURA(_dura));
    return;
  }

  if (_dura === 'settings.cyb') {
    if (!init)
      hashHistory.push('/settings');
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
  let dura = URLToDURA(url, apps, IPFS_END_POINT);

  if (url.indexOf('cyb://')!==-1) {
    dura = url.split('cyb://')[1]
  } 

  console.log('will-navigate');
  console.log('url', url);
  console.log('dura', dura);
  console.log('');

  dispatch(navigate(dura));
}

export const didNavigateInPage = (url) => (dispatch, getState) => {
    const dura = URLToDURA(url, apps, IPFS_END_POINT);
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