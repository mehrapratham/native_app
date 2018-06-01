import axios from 'axios'
import { VEHICLE_YEARS } from '../apiConstants'
import { HAS_ERROR, GET_VEHICLE_YEARS } from '../types'
import {
	getMemberAPI
} from '../../api/Search/Member';
const {dispatch} = store;

export const getVehicleYears = () => {
 return dispatch => {
   return axios
     .get(`${VEHICLE_YEARS}`)
     .then(res => {
       dispatch({
         type: GET_VEHICLE_YEARS,
         data: res.data
       })
       return res.data
     })
     .catch(function(error) {
       dispatch({
         type: HAS_ERROR,
         data: error.response.data,
       })
       return error.response.data
     })
 }
}
