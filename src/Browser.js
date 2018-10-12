import React, { Component } from 'react';

import { getApps } from './store';
import { getSettings } from './store';

import { connect } from "react-redux";
import * as actions from './redux/browser';


const walletStore = require('./walletStore');

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
      walletStore.receiveMessage(e);
    });
  } 


  render() {
    const { dura, loading } = this.props;
    // const url = 'http://localhost:5600/';
    const { url } = this.props;

    return (
      <div className='app'>
        <webview 
          preload={'file:///users/andrey/projects/electron/browser/src/preload.js'}
          src={url} 
          ref={ this.handleWebview }
          className={`app__content ${loading ? 'app__content--hidden' : ''}`}
        />
        <div 
          className={`app__content ${loading ? '' : 'app__content--hidden'}`}
        >loading...</div>
      </div>
    );
  }
}


export default connect(
  state => ({
    dura: state.dura,
    url: state.url,
    loading: state.loading
  }),
  actions
)(Browser);
