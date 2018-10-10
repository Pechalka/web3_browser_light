import React, { Component } from 'react';

import { Link } from 'react-router';

import { getApps, AddApp } from './store';

//TODO: 5000.dev => localhost:5000 with hot reloeader, redux


class Apps extends Component {
	state = {
		apps: []
	}

	loadApps = () => {
		getApps().then(state => {
			const apps = Object.keys(state).map(key => ({
				name: key,
				hash: state[key].hash,
				protocol: state[key].protocol,
			}));
			this.setState({ apps });
		})		
	}

	componentDidMount() {
		this.loadApps();
	}

	addApp = () => {
		const name = this.refs.name.value;
		const hash = this.refs.hash.value;
		const isIpfs = !!this.refs.ipfs.checked;
		AddApp(
			name,
			hash,
			isIpfs ? 'ipfs': 'ipns'
		).then(() => this.loadApps());
	}

	render() {
		const { apps } = this.state;
		const rows = apps.map(app => (
			<tr key={app.name}>
				<td>.{app.name}</td>
				<td>{app.hash}</td>
				<td>{app.protocol}</td>
			</tr>
		))
		return (
			<div>
				<div>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>hash</th>
								<th>protacol</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{rows}
							<tr key='add_row'>
								<td>.<input ref='name' placeholder='name'/></td>
								<td><input  ref='hash' placeholder='hash'/></td>
								<td>
									<label>
										<input type='radio' defaultChecked={true} ref='ipfs' name='protacol'/>ipfs
									</label>
									<label>
										<input type='radio' defaultChecked={false} ref='ipns' name='protacol'/>ipns
									</label>
								</td>
								<td>
									<button onClick={this.addApp}>add</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Apps;