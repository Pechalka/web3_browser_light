import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from './redux/browser';


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

	render() {
		const { dura } = this.props;
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