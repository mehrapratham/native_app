import React from 'react'
import { View, Text } from 'react-native'
import { Router, Switch, Route, Link } from './Routing'
import Login from './containers/Login'
import Vehicleform from './containers/Vehicleform'
import RecomendedOil from './containers/RecomendedOil'
import RecomendedFilter from './containers/RecomendedFilter'
import Address from './containers/Address'
import Summary from './containers/Summary'
import PaymentInfo from './containers/PaymentInfo'
import FinalScreen from './containers/FinalScreen'
import TimeSlot from './containers/TimeSlot'

import Gradient from './components/Gradient'

class App extends React.Component{
  constructor(props){
    super(props);
    
  }
  render(){
    console.disableYellowBox = true;
    let child = (
      <Router>
        <Switch>
          <View style={{ display: 'flex', minHeight: '100%'}}>
            <Route exact path="/" component={Login} />
            <Route path="/vehicle-form" component={Vehicleform} />
            <Route path="/recomended-oil" component={RecomendedOil} />
            <Route path="/recomended-filter" component={RecomendedFilter} />
            <Route path="/address" component={Address} />
            <Route path="/time-slot" component={TimeSlot} />
            <Route path="/summary" component={Summary} />
            <Route path="/payment-info" component={PaymentInfo} />
            <Route path="/final-screen" component={FinalScreen} />
          </View>
        </Switch>
      </Router>
    )
    return(
      <View style={{flex: 1, padingTop: 20}}>
        <Gradient child = {child}/>
      </View>
    )
  }
}

export default App