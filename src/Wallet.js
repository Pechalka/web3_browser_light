import React, { Component } from 'react';

import CybLink from './components/CybLink';

const walletStore = require('./walletStore');

class Wallet extends Component {
	state = {
		accounts: [],
		defaultAccount: ''
	}

	loadAccounts = () => {
		walletStore.getAccounts().then(accounts => {
			this.setState({ accounts })
		})
	}

	componentWillMount() {
		this.loadAccounts();
	}

	deleteAccount = (address) => {
		walletStore.removeAccount(address);
		this.loadAccounts();
		// delete __accounts[address] ;
		// localStorage.setItem('accounts', JSON.stringify(__accounts));
		// this.loadAccounts();
	}

	create = () =>  {
		walletStore.createAccount();
		this.loadAccounts();
		// const data = web3.eth.accounts.create();
		// __accounts[data.address.toLowerCase()] = data.privateKey;
		// localStorage.setItem('accounts', JSON.stringify(__accounts));
		// this.loadAccounts();
		// console.log(data);
	}

	importKey = () => {
		const privatekey = this.refs.importPrivateKey.value;
		walletStore.importKey(privatekey);
		this.loadAccounts();
		// const privatekey = this.refs.importPrivateKey.value;
		// const data = web3.eth.accounts.privateKeyToAccount('0x' + privatekey);

		// __accounts[data.address.toLowerCase()] = data.privateKey;
		// localStorage.setItem('accounts', JSON.stringify(__accounts));
		// this.loadAccounts();
	}
	
	selectAccount = (account) => {
		// web3.eth.defaultAccount = account.address;
		// this.setState({
		// 	defaultAccount: account.address
		// })
	}
	render() {
    	const { accounts, defaultAccount } = this.state;

		return (
			<div>
				<h2>accounts</h2>
            	<div>
            		{accounts.map(account => {
            			const css = `account ${account.address === defaultAccount ? 'account---defaultAccount' : ''}`;
            			return (
            				<div onClick={() => this.selectAccount(account)} className={css} key={account.address}>
	            				<div>{account.address}</div>
	            				<div>{account.balance}</div>
	            				<button onClick={() => this.deleteAccount(account.address)}>forget</button>
	            			</div>
            			);
            		})}
            	</div>
            	<div>
            		<button onClick={this.create}>create</button>
            	</div>
            	<div>
            		<button onClick={this.importKey}>import</button> <input ref='importPrivateKey' placeholder='privatekey'/>
            	</div>				
			</div>
		);
	}
}

export default Wallet