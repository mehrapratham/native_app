
import {AsyncStorage } from 'react-native'

export const saveToLocalStorage = (key, data) => {
   return dispatch => {
     AsyncStorage.setItem(key, data)
   }
}

export const getFromLocalStorage = (key) => {
   return async dispatch => {
	  	try {
		    let data = await AsyncStorage.getItem(key);
		   	data = JSON.parse(data) || [];
		    if (data.length != 0) {
		    	return data
		    }
		    else{
		    	return null
		    }
		}
		catch(error){
		}
	}
}

export const removeLocalStorage = (key) => {
   return dispatch => {
     AsyncStorage.removeItem(key)
   }
}



