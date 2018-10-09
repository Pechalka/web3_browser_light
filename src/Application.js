import React, { Component } from 'react';

class Application extends Component {
	render() {
		return (
			<div className='applications'>
				{this.props.children}
			</div>
		);
	}
}

export default Application;