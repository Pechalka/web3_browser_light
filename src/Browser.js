import React, { Component } from 'react';

import { getApps } from './store';
import { getSettings } from './store';

import { URLToDURA, DURAToURL } from './utils';

let eventNavigation = false;

let apps = {};
let IPFS_END_POINT;

// MOVE input in application, use redux for state managment, proccess loading

class Browser extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(' props ', props);

    this.state = {
      dura: '',
      url: DURAToURL('')
    };
  }
  
  componentDidMount() {
    Promise.all([
      getApps(),
      getSettings('IPFS_END_POINT')
    ]).then(([_apps, _IPFS_END_POINT]) => {
      apps = _apps;
      IPFS_END_POINT = _IPFS_END_POINT;

      const dura = localStorage.getItem('LAST_DURA')||'';
      this.navigate(dura);
    })

  }

  updateDURA(dura) {
    this.refs.input.value = dura;
    localStorage.setItem('LAST_DURA', dura);    
  }

  navigate(_dura) {
    const { url, dura } = DURAToURL(_dura, apps, IPFS_END_POINT)
    console.log('navigate');
    console.log('dura', dura);
    console.log('url', url);
    console.log('');

    this.updateDURA(dura);

    this.setState({
      url,
      dura
    })

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

      this.navigate(value)
    }
  }

  
  handleWebview = webview => {
    if (!webview) {
      return;
    }


    webview.addEventListener('did-navigate-in-page', (e) => {
        const url = e.url;
        const dura = URLToDURA(url, apps, IPFS_END_POINT);
        console.log('did-navigate-in-page ');
        console.log('url', url);
        console.log('dura', dura);

        e.preventDefault();
    
        this.updateDURA(dura);
    });

    webview.addEventListener('will-navigate', event => {      
      const url = event.url;
      let dura = URLToDURA(url, apps, IPFS_END_POINT);

      if (url.indexOf('cyb://')!==-1) {
        dura = url.split('cyb://')[1]
      } 

      console.log('will-navigate');
      console.log('url', url);
      console.log('dura', dura);
      console.log('');

      event.preventDefault();
      this.navigate(dura);        


    });
  }


  render() {
    const { url, dura, loading } = this.state;

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

export default Browser;
