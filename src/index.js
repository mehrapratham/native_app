import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { View } from 'react-native'
import './index.css';
import App from './App';
import store from './store'
import registerServiceWorker from './registerServiceWorker';
const target = document.getElementById('root')

ReactDOM.render(
	
	<Provider store={store}>
			<App />
 	</Provider>,
	target
);
registerServiceWorker();


