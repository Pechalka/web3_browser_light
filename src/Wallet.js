import React, {Component} from 'react';

import connect from "react-redux/es/connect/connect";
import * as actions from "./redux/wallet";
import Container from './components/Container/Container';

class Wallet extends Component {
    state = {
        showSendPanel: false
    }
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

    startSend = () => {
        this.setState({
            showSendPanel: true
        })
    }

    cancelSend = () => {
        this.setState({
            showSendPanel: false
        })
    }

    sendMony = () => {
        const { defaultAccount } = this.props;
        const recipientAddress = this.refs.recipientAddress.value;
        const amount = this.refs.amount.value;
        this.props.sendMony(defaultAccount, recipientAddress, amount)
            .then(() => {
                this.props.loadAccounts();
            })
        this.setState({
            showSendPanel: false
        })
    }

    render() {
        const {accounts, defaultAccount} = this.props;
        const { showSendPanel } = this.state;
        return (
            <Container>
                <div>current account</div>
                {defaultAccount}
                <div>
                    {!showSendPanel && <div>
                        <button onClick={this.startSend}>send</button>
                    </div>}
                    {showSendPanel && <div>
                        <div>
                            <input ref='recipientAddress' placeholder='Recipient Address'/>
                        </div>
                        <div>
                            <input ref='amount' placeholder='Amount'/>
                        </div>
                        <button onClick={this.sendMony}>next</button>
                        <button onClick={this.cancelSend}>cancel</button>
                    </div>}
                </div>
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
            </Container>
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
