import React, { Component } from 'react';

import { getApps } from './store';
import { getSettings } from './store';

import { connect } from "react-redux";
import * as actions from './redux/browser';


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
  } 

  render() {
    const { url, dura, loading } = this.props;
    return (
      <div className='app'>
        <webview 
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
