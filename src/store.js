// TODO: rewrite all to reudx, save data in ls
const state = {
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

const settings = {
	IPFS_END_POINT: 'http://earth.cybernode.ai:34402',
	PARITTY_END_POINT: 'http://localhost:5600'
}


export const getApps = () => {
	return new Promise(resolve => {
		resolve(state);
	})
}

export const AddApp = (name, hash, protocol) => {
	return new Promise(resolve => {
		
		state[name] = {
			hash,
			protocol
		}
		resolve(state);
	})
}

export const getSettings = (key) => new Promise(resolve => resolve(settings[key]))
export const getAllSettings = () => new Promise(resolve => resolve(settings))

export const setSettings = (key, value) => new Promise(resolve => {
	settings[key] = value;
	resolve(settings[key]);
})