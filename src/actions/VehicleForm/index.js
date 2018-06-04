import axios from 'axios'
import { GRAPHQL_URL } from '../apiConstant'
import { HAS_ERROR, GET_VEHICLE_YEARS, GET_VEHICLE_MAKES, GET_VEHICLE_MODELS, GET_VEHICLE_OIL_TYPES, GET_VEHICLE_FILTER_TYPES } from '../types'

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
