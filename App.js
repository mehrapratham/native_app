import React from 'react'
import Tranzoil from './src/App'
import { Provider } from 'react-redux';
import store from './src/store';
export default class App extends React.Component {
	console.log(this.props,333)
  render() {
    return (
        <Provider store={store}>
            <Tranzoil />
        </Provider>
    );
  }
}