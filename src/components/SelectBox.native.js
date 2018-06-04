import React from 'react';
import {Text, View, Dimensions,StyleSheet} from 'react-native'
import { Picker } from "native-base";
var {height, width} = Dimensions.get('window');
width = width - 40;
export default class SelectBox extends React.Component{
  onChange(event){
    console.log(event,111111111111111)
    this.props.onValueChange(event)
  }
	render(){		
		return(
			<Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.props.selectedValue}
              onValueChange={this.onChange.bind(this)}
              style={styles.container}
              placeholder={this.props.placeholder}
              placeholderStyle={{color: "#646262"}}
            >
              {this.props.list && this.props.list.map((item, key) => {
              	return <Picker.Item label={item} value={item} key={key}/>
              })}
            </Picker>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    width, 
    marginBottom: 10
  }
});