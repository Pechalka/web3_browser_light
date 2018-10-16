import React, {Component} from 'react';
import {connect} from "react-redux";
import {navigate} from './redux/browser';
import {init as initWallet, approve, reject} from './redux/wallet';

import CybLink from './components/CybLink';

//TODO: wallet, fix nav bar css

class Application extends Component {
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const value = this.refs.input.value;
            this.props.navigate(value);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.dura !== nextProps.dura) {
            this.refs.input.value = nextProps.dura;
        }
    }

    approve = () => {
        this.props.approve();
    }

    reject = () => {
        this.props.reject();
    }

    render() {
        const {dura, pendingRequest} = this.props;

        return (
            <div className='applications'>
                <div className='app'>
                    <div className='app__navigation'>
                        <CybLink dura=''>logo</CybLink>
                        <input
                            className='input'
                            ref='input'
                            defaultValue={dura}
                            onKeyPress={this._handleKeyPress}
                        />
                        <CybLink dura='settings.cyb'>settings</CybLink>
                        <div>
                            <CybLink dura='wallet.cyb'>Wallet</CybLink>
                            <div> {this.props.defaultAccount} </div>
                            {pendingRequest && <div>
                                <button onClick={this.approve}>approve</button>
                                <button onClick={this.reject}>reject</button>
                            </div>}
                        </div>
                    </div>
                    <div className='app__content'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        dura: state.browser.dura,
        pendingRequest: state.wallet.pendingRequest,
        defaultAccount: state.wallet.defaultAccount
    }),
    {
        navigate,
        initWallet,
        approve,
        reject
    }
)(Application);
