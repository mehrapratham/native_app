import React from 'react';
import {Text, View} from 'react-native'
export default class SelectBox extends React.Component{
	onChange(event){
		this.props.onSelectValue(event.target.value)
	}
	render(){
		return(
			<View >
				{this.props.list && this.props.list.map((item,key) => {
					return(
						<View key={key} style={{marginBottom: 1,borderRadius: 5,height: 50,justifyContent: 'center',paddingLeft: 15}}>
							<Text>
								<input type="radio" name="common" style={{height: 25,width: 25, backgroundColor: '#fff', position: 'relative', top: 4,color: 'blue'}} value={item} checked={this.props.value == item}  onChange={this.onChange.bind(this)}/>
								<Text style={{fontSize: 20, marginLeft: 15, marginTop: -5}}> {item}</Text>
							</Text>
						</View>
				)
				})}
			</View>
		)
	}
}