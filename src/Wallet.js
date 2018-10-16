import React, {Component} from 'react';

import connect from "react-redux/es/connect/connect";
import * as actions from "./redux/wallet";

class Wallet extends Component {

    loadAccounts = () => {
        this.props.loadAccounts()
    }

    componentWillMount() {
        this.loadAccounts();
    }

    deleteAccount = (e, address) => {
        e.stopPropagation();
        this.props.deleteAccount(address).then(this.loadAccounts);
    }

    create = () => {
        this.props.createAccount().then(this.loadAccounts);
    }

    importKey = () => {
        const privatekey = this.refs.importPrivateKey.value;
        this.props.importAccount(privatekey).then(this.loadAccounts);
    }

    selectAccount = (account) => {
        this.props.setDefaultAccount(account.address);
    }

    render() {
        const {accounts, defaultAccount} = this.props;

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
                                <button onClick={(e) => this.deleteAccount(e, account.address)}>forget</button>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <button onClick={this.create}>create</button>
                </div>
                <div>
                    <button onClick={this.importKey}>import</button>
                    <input ref='importPrivateKey' placeholder='privatekey'/>
                </div>
            </div>
        );
    }
}

export default connect(
    ({wallet}) => ({
        accounts: wallet.accounts,
        defaultAccount: wallet.defaultAccount
    }),
    actions
)(Wallet);
