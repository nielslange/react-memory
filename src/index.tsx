import React from 'react';
import ReactDOM from 'react-dom/client';

import Game from './Game';
import './index.scss';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
	<React.StrictMode>
		<Game />
	</React.StrictMode>
);
