import React from 'react';
import {Text, View, Dimensions,StyleSheet} from 'react-native'
import { Picker, Icon } from "native-base";
var {height, width} = Dimensions.get('window');
width = width - 40;
export default class SelectBox extends React.Component{
  onChange(event){
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
        iosIcon={<Icon name="ios-arrow-down-outline" />}
      >
        {this.props.list && this.props.list.map((item, key) => {
        	return <Picker.Item label={item.abbreviation} value={item.abbreviation} key={key}/>
        })}
      </Picker>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    width: '100%',
    borderBottomWidth: 4,
    borderColor: '#c5c3c4',
  }
})