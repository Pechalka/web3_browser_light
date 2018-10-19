import React from 'react';

import './Indecator.css';

const Indecator = ({ status }) => {
	const style = {
		background: status === 'fail' ? 'red' : status === 'local' ? 'green' : 'yellow'
	}
	return (
		<span style={style} className='indecator' >{status}</span>
	);
}

export default Indecator;