import axios from 'axios'
import { GRAPHQL_URL } from '../apiConstant'
import { HAS_ERROR, GET_VEHICLE_YEARS, GET_VEHICLE_MAKES, GET_VEHICLE_MODELS, GET_VEHICLE_OIL_TYPES, GET_VEHICLE_FILTER_TYPES, GET_AVAILABILITY } from '../types'
var qs = require('qs');

export const getVehicleYears = () => {
let query = {query: '{ years }'}
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
     	// console.log(res.data.data.years,234543)
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
console.log(query)
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
     	console.log(res.data.data.make,234543)
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
console.log(query)
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
     	console.log(res.data.data.model,234543)
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
console.log(query)
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
     	console.log(res.data.data.types,234543)
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
console.log(query)
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
      console.log(res.data.data.filters,234543)
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
  console.log(data)
let query = {query: 'mutation{createServiceAppointment(input:'+data+'){year, _id, make, oilType, filterType, model, street, mileage, time, message, city, zip, state, date}}'}
console.log(query)
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
      console.log(res.data.data.createServiceAppointment,234543)
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


export const payAmount = (token, amount) => {
let query = {query: '{payment(paymentToken:"'+token+'",amount:"'+amount+'"){msz}}'}
console.log(token)
 return dispatch => {
   return axios
     .post(`${GRAPHQL_URL}`, query)
     .then(res => {
        console.log(res)
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
console.log(data)
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
        console.log(res)
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


