import React from 'react'
import NativeApp from './src/App'
import { Provider } from 'react-redux';
import store from './src/store';
export default class App extends React.Component {

  render() {
    return (
        <Provider store={store}>
            <NativeApp />
        </Provider>
    );
  }
}