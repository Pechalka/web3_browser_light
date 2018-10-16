import React, {Component} from 'react';

import {connect} from "react-redux";
import {didNavigateInPage, willNavigate} from "./redux/browser";
import {receiveMessage} from './redux/wallet';
import {getPreloadPath} from "./utils";

class Browser extends Component {

    handleWebview = webview => {
        if (!webview) {
            return;
        }

        webview.addEventListener('did-navigate-in-page', (e) => {
            e.preventDefault();
            this.props.didNavigateInPage(e.url);
        });

        webview.addEventListener('will-navigate', event => {
            event.preventDefault();
            this.props.willNavigate(event.url);
        });

        webview.addEventListener('console-message', e => {
            console.log('[DAPP]', e.message);
        });

        webview.addEventListener('ipc-message', (e) => {
            this.props.receiveMessage(e);
        });
    }


    render() {
        const {loading, url} = this.props;

        return (
            <div className='app'>
                <webview
                    preload={`${getPreloadPath()}`}
                    src={url}
                    ref={this.handleWebview}
                    className={`app__content ${loading ? 'app__content--hidden' : ''}`}
                />
                <div
                    className={`app__content ${loading ? '' : 'app__content--hidden'}`}
                >loading...
                </div>
            </div>
        );
    }
}


export default connect(
    ({browser}) => ({
        dura: browser.dura,
        url: browser.url,
        loading: browser.loading
    }),
    {
        willNavigate,
        didNavigateInPage,
        receiveMessage
    }
)(Browser);
