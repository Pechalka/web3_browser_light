import React, { Component } from 'react';

import { getApps } from './store';
import { getSettings } from './store';

import { connect } from "react-redux";
import * as actions from './redux/browser';


class Browser extends Component {

  componentDidMount() {    
    this.props.init();
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const value = this.refs.input.value;

      if (value === 'apps.cyb') {
        this.props.router.push('/apps'); 
        return;
      }

      if (value === 'settings.cyb') {
        this.props.router.push('/settings'); 
        return;
      }

      this.props.navigate(value)
    }
  }

  
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

  componentWillReceiveProps(nextProps) {
    if (this.props.dura !== nextProps.dura) {
      this.refs.input.value = nextProps.dura;
    }
  }  

  render() {
    const { url, dura, loading } = this.props;

    return (
      <div className='app'>
        <div className='app_navigation'>
          <input 
            className='input'
            ref='input'
            defaultValue={dura}
            onKeyPress={this._handleKeyPress}
          />
        </div>
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
