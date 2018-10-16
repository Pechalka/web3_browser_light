import React, { Component } from 'react';

import CybLink from './components/CybLink';


class Home extends Component {
	render() {
		return (
			<div>
				<CybLink dura='root.cyb'>Root registry</CybLink>
			</div>
		);
	}
}

export default Home
