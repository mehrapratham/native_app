import axios from 'axios'
import { GRAPHQL_URL } from '../apiConstant'
import { HAS_ERROR,GET_CARQUERY_MODELS, GET_VEHICLE_YEARS,GET_CARQUERY_YEARS, GET_VEHICLE_MAKES, GET_VEHICLE_MODELS, GET_VEHICLE_OIL_TYPES, GET_VEHICLE_FILTER_TYPES, GET_AVAILABILITY, GET_STATE_LIST, GET_VEHICLE_BOOKINGS, GET_TOGGLE_POPUP_STATUS, GET_CARQUERY_MAKES, GET_CARQUERY_TRIMS } from '../types'
import store from '../../store'
var qs = require('qs');
let {getState} = store;
export const getVehicleYears = () => {
let query = {query: '{ years }'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
       dispatch({
         type: GET_VEHICLE_YEARS,
         data: res.data.data.years
       })
       return res.data
     })
     .catch(function(error) {
       dispatch({
         type: HAS_ERROR,
         data: error,
       })
       return error
     })
 }
}




