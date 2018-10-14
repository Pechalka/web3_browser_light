import React, { Component } from 'react';

import { getApps } from './store';
import { getSettings } from './store';

import { connect } from "react-redux";
import * as actions from './redux/browser';
import path from 'path';
import isElectron from 'is-electron';
const isDev = window.require('electron-is-dev');

const { remote } = window.require('electron');

const walletStore = require('./walletStore');

function getPreloaddPath () {
  // // Condition necessary for store.spec.js
  // const basePath = remote.app.getPath('userData');

  // // Replace all backslashes by front-slashes (happens in Windows)
  // // Note: `dirName` contains backslashes in Windows. One would assume that
  // // path.join in Windows would handle everything for us, but after some time
  // // I realized that even in Windows path.join here bahaves like POSIX (maybe
  // // it's electron, maybe browser env?). Switching to '/'. -Amaury 12.03.2018
  // const posixDirName = basePath.replace(/\\/g, '/');
  // const buildPath = path.join(
  //   posixDirName,
  //   '..',
  //   '.build');

  // return buildPath;

  console.log('>>> ', remote.getGlobal('dirname'));

  if (isDev) 
    return 'file://' + path.join(remote.app.getAppPath(), 'src', 'preload.js');

  return 'file://' + path.join(remote.app.getAppPath(), './build/preload.js');  
}

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
          preload={`${getPreloaddPath()}`}
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
