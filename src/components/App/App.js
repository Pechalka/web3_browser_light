import React from 'react';

import './App.css';

export const AppHeader = ({ isHome, children }) => (
	<div className={`app__header ${isHome ? 'app__header--open' : ''}`}>
		<div className='app__header-container'>
		{children}
		</div>
	</div>
)

export const AppContent = ({ children }) => (
	<div className='app__content'>
		{children}
	</div>
);

const App = ({ children }) => (
	<div className='app'>
		{children}
	</div>
);


export default App;