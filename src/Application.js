import React, {Component} from 'react';
import {connect} from "react-redux";
import {navigate} from './redux/browser';
import {init as initWallet, approve, reject} from './redux/wallet';

import CybLink from './components/CybLink';
import App, { AppHeader, AppContent } from './components/App/App';
import Navigation, { NavigationLeft, NavigationRight, NavigationCenter } from './components/Navigation/Navigation';
import SearchInput from './components/SearchInput/SearchInput';
import Logo from './components/Logo/Logo';
import IdBar, { SettingsLink, WalletLink, CurrentUser } from './components/IdBar/IdBar';
import ConfirmationPopup, { ApproveButton, RejectButton} from './components/ConfirmationPopup/ConfirmationPopup';


class Application extends Component {
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const value = this.input.value;
            this.props.navigate(value);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.dura !== nextProps.dura) {
            this.input.value = nextProps.dura;
        }
    }

    approve = () => {
        this.props.approve();
    }

    reject = () => {
        this.props.reject();
    }

    render() {
        const {dura, defaultAccount, pendingRequest } = this.props;
        const homePage = dura === '';
        return (
            <App>
                {pendingRequest && <ConfirmationPopup>
                    <ApproveButton onClick={this.approve}>approve</ApproveButton>
                    <ApproveButton onClick={this.reject}>reject</ApproveButton>
                </ConfirmationPopup>}
                <AppHeader isHome={homePage}>
                    <Navigation isHome={homePage}>
                        <NavigationLeft>
                            <Logo />
                        </NavigationLeft>
                        <NavigationCenter>
                            <SearchInput
                                inputRef={node => { this.input = node;}}
                                defaultValue={dura}
                                onKeyPress={this._handleKeyPress}
                            />
                        </NavigationCenter>
                        <NavigationRight>
                            <IdBar>
                                <SettingsLink />
                                <WalletLink />
                                <CurrentUser defaultAccount={defaultAccount}/>
                            </IdBar>
                        </NavigationRight>
                    </Navigation>
                </AppHeader>
                <AppContent>
                    {this.props.children}
                </AppContent>
            </App>
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
