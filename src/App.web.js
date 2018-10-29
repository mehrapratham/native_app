import React from 'react'
import { View, Text } from 'react-native'
import { Router, Switch, Route, Link } from './Routing'
import Home from './containers/Home'

class App extends React.Component{
  constructor(props){
    super(props);
    
  }
  render(){
    console.disableYellowBox = true;
    return(
      <Router>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App