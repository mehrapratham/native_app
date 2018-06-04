
import {AsyncStorage } from 'react-native'

export const saveToLocalStorage = (key, data) => {
   return dispatch => {
     AsyncStorage.setItem(key, data)
   }
}

export const getFromLocalStorage = (key) => {
   return async dispatch => {
	  	try {
	   		console.log('hi')
		    let data = await AsyncStorage.getItem(key);
		    data = JSON.parse(data) || [];
		    console.log(data,44444)
		    return data
		}
		catch(error){
		    console.log(error, 'error aa gya');
		}
	}
}

/*export const getData = async(key) => {
	console.log('ethe aa gya')
	return await AsyncStorage.getItem(key)
}*/


