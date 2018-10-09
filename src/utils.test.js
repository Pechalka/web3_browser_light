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




it('parseURL .help', () => {
  const { q, app, path } = utils.parseURL('.help');

  expect(q).toEqual('');
  expect(app).toEqual('help');
  expect(path).toEqual('');  
})


it('parseURL .wiki', () => {
  const { q, app, path } = utils.parseURL('.wiki');

  expect(q).toEqual('');
  expect(app).toEqual('wiki');
  expect(path).toEqual('');  
})


it('parseURL 1.help', () => {
  const { q, app, path } = utils.parseURL('1.help');

  expect(q).toEqual('1');
  expect(app).toEqual('help');
  expect(path).toEqual('');  
})


it('parseURL 43', () => {
  const { q, app, path } = utils.parseURL('43');

  expect(q).toEqual('43');
  expect(app).toEqual('cyber');
  expect(path).toEqual('');  
})


it('parseURL .wiki/test', () => {
  const { q, app, path } = utils.parseURL('.wiki/test');

  expect(q).toEqual('');
  expect(app).toEqual('wiki');
  expect(path).toEqual('test');  
})


it('parseURL .wiki/page.html', () => {
  const { q, app, path } = utils.parseURL('.wiki/page.html');

  expect(q).toEqual('');
  expect(app).toEqual('wiki');
  expect(path).toEqual('page.html');  
})

it('parseURL .wiki/wiki/page1.html', () => {
  const { q, app, path } = utils.parseURL('.wiki/wiki/page1.html');

  expect(q).toEqual('');
  expect(app).toEqual('wiki');
  expect(path).toEqual('wiki/page1.html');  
})


it('-> /ipfs/wikiHash/wiki/ =>  .wiki/wiki/', () => {
  const dura = utils.URLToDURA('/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/', apps, '');

  expect(dura).toEqual('.wiki/wiki/');
})

it('-> /ipfs/wikiHash/test/ =>  .wiki/test/', () => {
  const dura = utils.URLToDURA('/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/test/', apps, '');

  expect(dura).toEqual('.wiki/test/');
})


it('-> /ipfs/wikiHash/test/ =>  .wiki/wiki/page5.html', () => {
  const dura = utils.URLToDURA('/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/page5.html', apps, '');

  expect(dura).toEqual('.wiki/wiki/page5.html');
})


it('-> URLToDURA', () => {
  const dura = utils.URLToDURA('http://earth.cybernode.ai:34402/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/', apps, 'http://earth.cybernode.ai:34402');

  expect(dura).toEqual('.wiki/wiki/');
})

it('-> DURAToURL', () => {
  const { url } = utils.DURAToURL('.wiki/wiki/', apps, 'http://earth.cybernode.ai:34402');

  expect(url).toEqual('http://earth.cybernode.ai:34402/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/');
})

it('-> DURAToURL empty => ipfshome ', () => {
  const { url, dura } = utils.DURAToURL('', apps, '');

  expect(url).toEqual('/ipfs/QmZfSNpHVzTNi9gezLcgq64Wbj1xhwi9wk4AxYyxMZgtCG/');
  expect(dura).toEqual('')
})

it('DURAToURL should change dura after call', () => {
  const { url, dura } = utils.DURAToURL('.cyber', apps, '');

  expect(url).toEqual(`/ipfs/${apps['cyber'].hash}/`);
  expect(dura).toEqual('.cyber')
})


it('DURAToURL should process ipfs', () => {
  const { url, dura } = utils.DURAToURL('QmZP5VsY5r2i7FekSJf6tjkByw97FusJKSQ2Y8euczfhZw.ipfs', apps, '');

  expect(url).toEqual(`/ipfs/QmZP5VsY5r2i7FekSJf6tjkByw97FusJKSQ2Y8euczfhZw/`);
  expect(dura).toEqual('QmZP5VsY5r2i7FekSJf6tjkByw97FusJKSQ2Y8euczfhZw.ipfs')
})


it('DURAToURL should process q', () => {
  const { url, dura } = utils.DURAToURL('43.cyber', apps, '');

  expect(url).toEqual(`/ipfs/${apps['cyber'].hash}/?query=43`);
  expect(dura).toEqual('43.cyber')
})




















