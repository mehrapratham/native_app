import React from 'react';
import {Text, View} from 'react-native'
export default class SelectBox extends React.Component{
	onChange(event){
		console.log(event.target.value)
		this.props.onSelectValue(event.target.value)
	}
	render(){
		return(
			<View >
				{this.props.list && this.props.list.map((item,key) => {
					return(
						<View style={{marginBottom: 10,backgroundColor: '#fff',borderRadius: 5,height: 50,backgroundColor: '#fff',justifyContent: 'center',paddingLeft: 15}}>
							<Text>
								<input type="radio" name="common" style={{height: 20,width: 20}} value={item} onChange={this.onChange.bind(this)}/>
								<Text style={{fontSize: 20}}> {item}</Text>
							</Text>
						</View>
				)
				})}
			</View>
		)
	}
}