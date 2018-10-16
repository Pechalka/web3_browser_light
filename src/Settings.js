import React, { Component } from 'react';

import { getAllSettings, setSettings } from './store';

class Settings extends Component {

	state = {
		IPFS_END_POINT: '',
		PARITTY_END_POINT: ''
	}

	componentDidMount() {
		getAllSettings().then(state => this.setState(state));
	}

	updateIPFS = () => {
		const value = this.refs.IPFS_END_POINT.value;
		setSettings('IPFS_END_POINT', value)
	}

	updateParitty = () => {
		const value = this.refs.PARITTY_END_POINT.value;
		setSettings('PARITTY_END_POINT', value);
	}

	render() {
		const {
			IPFS_END_POINT,
			PARITTY_END_POINT
		} = this.state;

		return (
			<div>
				<div>
					<div>
						<div>IPFS:</div>
						<input className='form-input' ref='IPFS_END_POINT' defaultValue={IPFS_END_POINT}/>
						<button onClick={this.updateIPFS}>update</button>
					</div>
					<div>
						<div>paritty:</div>
						<input className='form-input' ref='PARITTY_END_POINT' defaultValue={PARITTY_END_POINT}/>
						<button onClick={this.updateParitty}>update</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Settings;
