const { ipcRenderer } = require('electron')


const __providerCallbacks = {

}


const ElectronProvider = {
	sendAsync: function (payload, callback) {
		ipcRenderer.sendToHost('web3_eth', payload);
		__providerCallbacks[payload.id + payload.method] = callback
	}
}

ipcRenderer.on('web3_eth_call', (_, payload) => {
	if (__providerCallbacks[payload.id + payload.method]) {
		__providerCallbacks[payload.id + payload.method](null, payload);
	}
});

window.web3 = { currentProvider: ElectronProvider }

