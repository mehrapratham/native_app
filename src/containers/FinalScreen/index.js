import React from 'react';
import { View, Text, StyleSheet} from 'react-native'
import {Link } from '../../Routing'
import ConfirmButton from '../../components/Buttons/ConfirmButton'
export default class RecomendedOil extends React.Component{
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.view}>
					<Text style={styles.heading}>Congratulations Your Oil service Has been scheduled</Text>
				</View>
				<View style={styles.view}>
					<View style={styles.arrow}>
						<Text>Oil type: 5w30</Text>
					</View>
					<View style={styles.arrow}>
						<Text>filter type: stp32323</Text>
					</View>
					<View style={styles.arrow}>
						<Text>Nissan sentra 2013</Text>
					</View>
					<View style={styles.arrow}>
						<Text>Time: 4/23 8:00-9:00 am</Text>
					</View>
					<View style={styles.arrow}>
						<Text>Address: 2323 23st, Mill Creek WA, 99233</Text>
					</View>
				</View>
				<View style={styles.view}>
					<View style={styles.address}>
						<Text style={styles.text2}>Sign up and create Profile and recieve 50% off next oil change</Text>
					</View>
					<View style={styles.text}> 
						<ConfirmButton label="Confirm order" />
					</View>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  	paddingLeft: 20,
  	paddingRight: 20
  },
  arrow: {
  	width: '100%',
  	height: 40,
  	backgroundColor: '#fff',
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderRadius: 5,
  	marginBottom: 5
  },
  heading: {
  	fontSize: 26,
  	textAlign: 'center'
  },
  address: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  text: {
  	flex: 1,
  	width: '100%'
  },
  text2: {
  	textAlign: 'center',
  	fontSize: 20
  }
});