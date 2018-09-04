import React from 'react';
import {Text, View, Dimensions,StyleSheet} from 'react-native'
import { Picker, Icon } from "native-base";
var {height, width} = Dimensions.get('window');
width = width - 40;
export default class SelectBoxObject extends React.Component{
  onChange(event){
    this.props.onValueChange(event)
  }
	render(){		
		return(
			<Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.props.selectedValue}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              onValueChange={this.onChange.bind(this)}
              style={styles.container}
              placeholder={this.props.placeholder}
              placeholderStyle={{color: "#646262"}}
            >
              {this.props.list && this.props.list.map((item, key) => {
              	return <Picker.Item label={item[this.props.valueToShow]} value={item[this.props.valueToShow]} key={key}/>
              })}
            </Picker>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    width, 
    marginBottom: 10,
    borderBottomWidth: 4,
    borderColor: '#c5c3c4',
  }
});