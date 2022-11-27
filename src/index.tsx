/**
 * External dependencies
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * Internal dependencies
 */
import Game from './game';
import './index.scss';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
	<React.StrictMode>
		<Game />
	</React.StrictMode>
);
