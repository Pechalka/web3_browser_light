import utils from './utils';


const apps = {
	'help': {
		hash: 'QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf',
		protocol: 'ipfs'
	},
	'cyber': {
		hash: 'QmXZ5GeuFGYJswXT93hmjG5Z6fGJM2ifgXsXBxyomi63GN',
		protocol: 'ipfs'
	},
	'wiki': {
		hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
		protocol: 'ipfs'
	}
};

it('/ipfs/hash?query=#/ => .help', () => {
	const url = 'http://earth.cybernode.ai:34402/ipfs/QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf/?query=#/';
  	

  	const { q, app, path } = utils.URLToDURA(url, apps);

  	expect(q).toEqual('');
  	expect(app).toEqual('help');
  	expect(path).toEqual('');
});




it('/ipfs/hash?query=1#/create => 1.help/create', () => {
	const url = 'http://earth.cybernode.ai:34402/ipfs/QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf/?query=1#/create';
  	
  	const { q, app, path } = utils.URLToDURA(url, apps);

  	expect(q).toEqual('1');
  	expect(app).toEqual('help');
  	expect(path).toEqual('create');
});


it('/ipfs/hash?query=43#/ => 43.cyber', () => {
	const url = 'http://earth.cybernode.ai:34402/ipfs/QmXZ5GeuFGYJswXT93hmjG5Z6fGJM2ifgXsXBxyomi63GN/?query=43#/';
  	
  	const { q, app, path } = utils.URLToDURA(url, apps);

  	expect(q).toEqual('43');
  	expect(app).toEqual('cyber');
  	expect(path).toEqual('');
});

it('/ipfs/hash?query=#/ => .wiki', () => {
	const url = 'http://earth.cybernode.ai:34402/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/?query=#/';
  	
  	const { q, app, path } = utils.URLToDURA(url, apps);

  	expect(q).toEqual('');
  	expect(app).toEqual('wiki');
  	expect(path).toEqual('');
});


it('unknow app /ipfs/hash?query=#/ => hash.ipfs', () => {
	const url = 'http://earth.cybernode.ai:34402/ipfs/QmXoypizjW3Wkn4iJnKLwHCnL72vedxjQkDDP1mXWo6uco/?query=#/';
  	
  	const { q, app, path } = utils.URLToDURA(url, apps);

  	expect(q).toEqual('QmXoypizjW3Wkn4iJnKLwHCnL72vedxjQkDDP1mXWo6uco');
  	expect(app).toEqual('ipfs');
  	expect(path).toEqual('');
});


// it('unknow app /ipfs/hash/wiki => .wiki/wiki', () => {
//   const url = 'http://earth.cybernode.ai:34402/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/';
    
//     const { q, app, path } = utils.URLToDURA(url, apps);

//     expect(q).toEqual('');
//     expect(app).toEqual('wiki');
//     expect(path).toEqual('wiki');
// });

it('.wiki => /ipfs/hash', () => {
  const q = '';
  const app = 'wiki';
  const path = '';
  const url = utils.DURAToURL({ q, app, path }, apps, '');

  expect(url).toEqual(`/${apps[app].protocol}/${apps[app].hash}/?query=${q}#/`);
})



