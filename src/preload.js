const {ipcRenderer, remote, webFrame } = require('electron')
const fs = require('fs');
const path = require('path');


// import fs from 'fs';
// import { ipcRenderer, remote, webFrame } from 'electron';
// import path from 'path';

// const injectFile = fs.readFileSync(path.join(`${__dirname}`, 'inject.js'), 'utf8');

// webFrame.executeJavaScript(injectFile);

// webFrame.executeJavaScript('alert(' + __dirname + ')')

// let __accounts = {
// 	// '0xf2492533f7d89dbfed69757156c4b746839e59e8': '0x' + '13d712799c61540c37b83aec99cc19504cdc943ffe38e94b61e80d26c80f32f9'
// };

// // localStorage.setItem('accounts', JSON.stringify(__accounts));

// const SignerProvider = require('ethjs-provider-signer');
// const sign = require('ethjs-signer').sign;

// __accounts = JSON.parse(localStorage.getItem('accounts')||'{}');

// const currentProvider = new SignerProvider('http://localhost:8545', {
//   signTransaction: (rawTx, cb) => {
//   	const privateKey = __accounts[rawTx.from];
//   	cb(null, sign(rawTx, privateKey))
//   },
//   accounts: (cb) => {
//   	cb(null, Object.keys(__accounts))
//   },
// });

const __providerCallbacks = {

}


const ElectronProvider = {
	sendAsync: function (payload, callback) {
		ipcRenderer.sendToHost('web3_eth', payload);
		__providerCallbacks[payload.id + payload.method] = callback
		// const newPayload = { 
		// 	...payload,
		// 	result: ['0xf2492533f7d89dbfed69757156c4b746839e59e8']
		// }
		// callback(null, newPayload);
	}
}

ipcRenderer.on('web3_eth_call', (_, payload) => {
	if (__providerCallbacks[payload.id + payload.method]) {
		__providerCallbacks[payload.id + payload.method](null, payload);
	}
});

window.web3 = { currentProvider: ElectronProvider }


// document.addEventListener('DOMContentLoaded', function () {
//   // var data = {
//   //   'title': document.title,
//   //   'url': window.location.href,
//   //   'array': {
//   //       'array': ['1','2','3']
//   //   }
//   // };
//   // // console.log(fs)
//   // ipcRenderer.sendToHost('data', remote.getGlobal('zz'));


// });

