import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from './redux/browser';

import { getSettings } from './store';

import CybLink from './components/CybLink';

//TODO: wallet, fix nav bar css

const walletStore = require('./walletStore');

let approvecalback;
class Application extends Component {
	state = {
		pending: false
	}

	componentWillMount() {
		walletStore.subscribe(this.showRequest)
		walletStore.init('http://localhost:8545');

		getSettings('PARITTY_END_POINT').then(PARITTY_END_POINT => {
			walletStore.subscribe(this.showRequest)
			walletStore.init(PARITTY_END_POINT);			
		});
	}

	showRequest = (_approvecalback) => {
		approvecalback = _approvecalback;
		this.setState({ pending: true })
	}

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
  		if (approvecalback) {
  			approvecalback();
  		}
  		this.setState({ pending: false })
  	}

  	reject = () => {
  		this.setState({ pending: false })
  	}

	render() {
		const { dura } = this.props;
		const { pending } = this.state;

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
				          	{pending && <div>
				          		<button onClick={this.approve}>approve</button>
				          		<button onClick={this.reject}>rejec</button>
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
    dura: state.dura
  }),
  actions
)(Application);