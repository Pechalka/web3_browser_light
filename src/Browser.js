import React, { Component } from 'react';

import { getApps } from './store';
import { getSettings } from './store';

import { URLToDURA, DURAToURL } from './utils';

let eventNavigation = false;

class Browser extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(' props ', props);

    this.state = {
      apps: {},
      loading: false,
      IPFS_END_POINT: null,
    };
  }
  
  componentDidMount() {
    eventNavigation = true;
    const { params } = this.props;

    Promise.all([
      getApps(),
      getSettings('IPFS_END_POINT')
    ]).then(([apps, IPFS_END_POINT])=> {
      this.setState({ 
        apps: { ...apps },
        IPFS_END_POINT
      }, () => {
        this.forceUpdate();
        this.refs.input.value = this.generateInput();
      });
    })

  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const value = this.refs.input.value;

      let newUrl = null;

      if (value === '') {
        newUrl = '/';
        this.props.router.push(newUrl); 
        return;
      }

      if (value === 'apps.cyb') {
        newUrl = '/apps';
        this.props.router.push(newUrl); 
        return;
      }

      if (value === 'settings.cyb') {
        newUrl = '/settings';
        this.props.router.push(newUrl); 
        return;
      }

      if (value.indexOf('.') !== -1) {
        const contentid = value.split('.')[0];
        const appName = value.split('.')[1] || 'cyber';

        newUrl = `/${contentid || ''}^${appName}`;
      } else {
        const contentid = value;
        const appName = 'cyber';

        newUrl = `/${contentid || ''}^${appName}`;
      }

      if (newUrl) {
        console.log('navigate to ', newUrl);
        eventNavigation = false;
        this.props.router.push(newUrl);     
      }
    }
  }

    componentDidUpdate(prevProps, prevState) {
        this.refs.input.value = this.generateInput();   
    }

    shouldComponentUpdate(nextProps, nextState) {
      const urlChange = nextProps.params.q !== this.props.params.q ||
        nextProps.params.app !== this.props.params.app ||
        nextProps.params.path !== this.props.params.path;

      if (urlChange) {

        // TODO: fix rerender 
        // console.log('shouldComponentUpdate', !eventNavigation);
        // return !eventNavigation;

        return true;
      }

      return false;
    }

  
  handleWebview = webview => {
    if (!webview) {
      return;
    }


    webview.addEventListener('did-navigate-in-page', (e) => {
          console.log('did-navigate-in-page ', e.url);

          const { q, app, path } = URLToDURA(e.url, this.state.apps);
          const newUrl = `/${q || ''}^${app}${path ? '/' + path : ''}`;
          eventNavigation = true;
          this.props.router.push(newUrl);   
          const inputText = this.generateInput();
          this.refs.input.value = inputText;

    });

    webview.addEventListener('will-navigate', event => {
      console.log('will-navigate ', event.url)
      if (event.url.indexOf('cyb://') !== -1) {
        event.preventDefault();
        const appName = event.url.split('cyb://')[1].replace('.', '^');

        this.props.router.push(appName);
      } else {
        
      }
    });
  }


  generateInput = (state) => {
    const { q, app, path } = this.props.params;
    
    console.log('generateInput', this.props.params)

    if (!app) return '';

    return `${q || ''}.${app}${path ? '/' + path : ''}`
  }

  render() {
    const { loading, apps, IPFS_END_POINT } = this.state;
    const src = DURAToURL(this.props.params, apps, IPFS_END_POINT)
    console.log('render', src);
    console.log('');

    return (
      <div className='app'>
        <div className='app_navigation'>
          <input 
            className='input'
            ref='input'
            defaultValue={this.generateInput()}
            onKeyPress={this._handleKeyPress}
          />
        </div>
        <webview 
          src={src} 
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
