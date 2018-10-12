
import Web3 from 'web3';
const SignerProvider = require('ethjs-provider-signer');
const sign = require('ethjs-signer').sign;


// let __accounts;
let __accounts = {
  // '0xf2492533f7d89dbfed69757156c4b746839e59e8': '0x' + '13d712799c61540c37b83aec99cc19504cdc943ffe38e94b61e80d26c80f32f9'
};

__accounts = JSON.parse(localStorage.getItem('accounts')||'{}');

const provider = new SignerProvider('http://localhost:8545', {
  signTransaction: (rawTx, cb) => {
   const privateKey = __accounts[rawTx.from];
   cb(null, sign(rawTx, privateKey))
  },
  accounts: (cb) => {
   cb(null, Object.keys(__accounts))
  },
});

let web3 = new Web3(provider);
let eth = web3.eth;



export const getAccounts = () => new Promise(resolve => {
	eth.getAccounts((err, _accounts) => {
		const accounts = _accounts.map(address => ({
			address,
		}))

		Promise.all(
			_accounts.map(address => new Promise(resolve=> {
				eth.getBalance(address)
				.then(balance => resolve({ 
					balance: web3.utils.fromWei(balance, 'ether'), 
					address 
				}))
			}))
		).then(accounts => {
			resolve(accounts);
		})
	})
})

export const createAccount = () => new Promise(resolve => {
	const data = web3.eth.accounts.create();
	__accounts[data.address.toLowerCase()] = data.privateKey;
	localStorage.setItem('accounts', JSON.stringify(__accounts));
	resolve(data);
})

export const removeAccount = (address) => new Promise(resolve => {
	delete __accounts[address.toLowerCase()] ;
	localStorage.setItem('accounts', JSON.stringify(__accounts));
	resolve(address);
});

export const importKey = (privatekey) => new Promise(resolve => {
	const data = web3.eth.accounts.privateKeyToAccount('0x' + privatekey);

	__accounts[data.address.toLowerCase()] = data.privateKey;
	localStorage.setItem('accounts', JSON.stringify(__accounts));
	resolve(data);
})

let onRequest;

export const subscribe = (cb) => {
	onRequest = cb;
}

export const receiveMessage =  (e) => {

  if ( e.channel === 'web3_eth' ) {
    const payload = e.args[0]
    console.log('web3_eth ->', payload)
    // if (payload.method === 'eth_accounts') {
    //   payload.result = ['0xf2492533f7d89dbfed69757156c4b746839e59e8'];
    // } 
    // if (payload.method === 'eth_getBalance') {
    //   payload.result = 234234234;
    // }
    var wv = e.target;
    if (payload.method == 'eth_sendTransaction' && onRequest ) {
	    onRequest(() => {
	    	provider.sendAsync(payload, (e, result) => {
		      // debugger
		      // payload.result = result;
		      wv.send('web3_eth_call', { ...payload, ...result });
		    })
	    });
    } else {
	    provider.sendAsync(payload, (e, result) => {
	      // debugger
	      // payload.result = result;
	      wv.send('web3_eth_call', { ...payload, ...result });
	    })    	
    }

  }
}

