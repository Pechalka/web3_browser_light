
const URLToDURA = (url, apps) => {

	const parts = url.split(/ipfs\/|ipns|#\/|\/\?query=/);
	// console.log(parts)

	const hash = parts[1];
	let q = parts[2];
	let path = parts[3];

	let app = 'ipfs';

	let find = false;
	Object.keys(apps).forEach(key => {
		if (apps[key].hash === hash) {
			app = key;
			find = true;
		}
	})

	if (!find) {
		q = hash;
	}


	return { app, q, path };
} 


const DURAToURL = (params, apps, IPFS_END_POINT = 'http://localhost:8080') => {
	const { app, q, path } = params;

//    console.log('generateSrc ', q, app, path, apps);

    if (apps[app]) {
        const { hash, protocol } = apps[app];
        return `${IPFS_END_POINT}/${protocol}/${hash}/?query=${q || ''}${path ? '#' + path : '#/'}`;
    }

    if (app === 'ipfs' || app === 'ipns'){
      const protocol = app;
      const hash = q;
      return `${IPFS_END_POINT}/${protocol}/${hash}/?query=${q || ''}${path ? '#' + path : ''}`;
    }
    
    return `${IPFS_END_POINT}/ipfs/QmZfSNpHVzTNi9gezLcgq64Wbj1xhwi9wk4AxYyxMZgtCG/`;
} 

module.exports = { URLToDURA, DURAToURL }

