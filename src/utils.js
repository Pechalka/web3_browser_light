
const URLToDURA = (url, apps, IPFS_END_POINT = '') => {

	// const parts = url.split(/ipfs\/|ipns|#\/|\/\?query=/);
	// console.log(parts)

	let hash;
	let path = '';
	let q = '';
	let app = 'ipfs';
	const ipfsIndex = url.indexOf('ipfs');
	if (ipfsIndex !== -1) {
		hash = url.substr(ipfsIndex + 5, 46);
		path = url.substr(ipfsIndex + 46 + 5, url.length);
		// console.log(' hash ', hash);
		let find = false;
		Object.keys(apps).forEach(key => {
			if (apps[key].hash === hash) {
				app = key;
				find = true;
			}
		})


	}


	// console.log(hash, path)

	// const hash = parts[1];
	// let q = parts[2];
	// let path = parts[3];

	// let app = 'ipfs';

	// let find = false;
	// Object.keys(apps).forEach(key => {
	// 	if (apps[key].hash === hash) {
	// 		app = key;
	// 		find = true;
	// 	}
	// })

	// if (!find) {
	// 	q = hash;
	// }


	// return { app, q, path };

	return `${q}.${app}${path}`;
} 

const parseURL = (url) => {
	let q = '';
	let app = '';
	let path = '';

	const dotIndex = url.indexOf('.')
	if (dotIndex !== -1) {
		q = url.substr(0, dotIndex);
        app = url.substr(dotIndex + 1, url.length);
        const slashIndex = app.indexOf('/');
        if (slashIndex !== -1) {
        	path = app.substr(slashIndex + 1, url.length);
	        app = app.substr(0, slashIndex);
        }
	} else {
		q = url;
		app = 'cyber';
	}

	return { q, app, path };
}

const DURAToURL = (dura, apps = {}, IPFS_END_POINT = 'http://localhost:8080') => {
	if (dura === '')
	    return { 
	    	url: `${IPFS_END_POINT}/ipfs/QmZfSNpHVzTNi9gezLcgq64Wbj1xhwi9wk4AxYyxMZgtCG/`, 
	    	dura: ''
	    };

	const { q, app, path } = parseURL(dura);

    if (apps[app]) {
        const { hash, protocol } = apps[app];
        return {
        	url: `${IPFS_END_POINT}/${protocol}/${hash}/${path}${q ? '?query=' + q : ''}`,
        	dura: `${q || ''}.${app}${path ? '/' + path : ''}`
        };
    }

    if (app === 'ipfs' || app === 'ipns'){
      const protocol = app;
      const hash = q;
      return {
      	url: `${IPFS_END_POINT}/${protocol}/${hash}/`,
      	dura: `${hash}.${app}`
      };
    }
    
    return {
    	url: `${IPFS_END_POINT}/ipfs/QmZfSNpHVzTNi9gezLcgq64Wbj1xhwi9wk4AxYyxMZgtCG/`
    };
} 

module.exports = { URLToDURA, DURAToURL, parseURL }

