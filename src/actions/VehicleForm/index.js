import axios from 'axios'
import { GRAPHQL_URL } from '../apiConstant'
import { HAS_ERROR, GET_VEHICLE_YEARS, GET_VEHICLE_MAKES, GET_VEHICLE_MODELS, GET_VEHICLE_OIL_TYPES, GET_VEHICLE_FILTER_TYPES, GET_AVAILABILITY, GET_STATE_LIST, GET_VEHICLE_BOOKINGS } from '../types'
var qs = require('qs');

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
export const getVehicleMakes = (year) => {
let query = {query: '{make(year:"'+year+'")}'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
       dispatch({
         type: GET_VEHICLE_MAKES,
         data: res.data.data.make
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

export const getVehicleModels = (make) => {
let query = {query: '{model(make:"'+make+'")}'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
       dispatch({
         type: GET_VEHICLE_MODELS,
         data: res.data.data.model
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

export const getVehicleTypes = (make,model) => {
let query = {query: '{types(make:"'+make+'",model:"'+model+'")}'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
       dispatch({
         type: GET_VEHICLE_OIL_TYPES,
         data: res.data.data.types
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
export const getVehicleFilters = (make,model) => {
let query = {query: '{filters(make:"'+make+'",model:"'+model+'")}'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
       dispatch({
         type: GET_VEHICLE_FILTER_TYPES,
         data: res.data.data.filters
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
export const getAvailability = (data) => {
 return dispatch => {
   dispatch({
     type: GET_AVAILABILITY,
     data: data
   })
   return data
 }
}
export const confirmOrder = (data) => {
let query = {query: 'mutation{createServiceAppointment(input:'+data+'){year, _id, make, oilType, filterType, model, street, mileage, time, message, city, zip, state, date}}'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
       return res.data.data.createServiceAppointment
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
export const confirmBookingOrder = (token, id) => {
let query = {query: 'mutation{payment(input:{paymentToken:"'+token+ '",id:"' + id + '"}){msz}}'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
       return res.data.data.payment
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


export const payAmount = (token, amount) => {
let query = {query: '{payment(paymentToken:"'+token+'",amount:"'+amount+'"){msz}}'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
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

export const createToken = (data) => {
let url = 'https://api.stripe.com/v1/tokens';
 return dispatch => {
   return axios
     .post(url, qs.stringify(data), {
        headers: {
          'Authorization' : 'Bearer '+data.key,
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
      })
     .then(res => {
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

export const getStateList = () => {
return dispatch => {
  return axios
    .get('../json/state.js')
    .then(res => {
      dispatch({
        type: GET_STATE_LIST,
        data: res.data
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
export const getBookings = () => {
let query = {query: '{ bookings {date,token} }'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
       dispatch({
         type: GET_VEHICLE_BOOKINGS,
         data: res.data.data.bookings
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



