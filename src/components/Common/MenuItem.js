import React from 'react';
import { View, TouchableOpacity, Text} from 'react-native'
export default class MenuItem extends React.Component{
	render(){
		return(
			<View style={{marginTop: 20,backgroundColor: '#000',height: '100%'}}>
              	<TouchableOpacity style={{width: '100%',height: 40,justifyContent: 'center',marginBottom: 10,paddingLeft: 20}}>
                	<Text style={{fontSize: 20,color: '#fff'}}>Login</Text>
              	</TouchableOpacity>
              	<TouchableOpacity style={{width: '100%',height: 40,justifyContent: 'center',marginBottom: 10,paddingLeft: 20}}>
                	<Text style={{fontSize: 20,color: '#fff'}}>Register</Text>
              	</TouchableOpacity>
            </View>
		)
	}
}