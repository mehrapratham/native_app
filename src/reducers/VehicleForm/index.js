import initialState from '../initialState'
import { GET_VEHICLE_YEARS, GET_VEHICLE_MAKES, GET_VEHICLE_MODELS, GET_VEHICLE_OIL_TYPES, GET_VEHICLE_FILTER_TYPES } from '../../actions/types'
export default (state = initialState.VehicleForm, action) => {
 switch (action.type) {
   case GET_VEHICLE_YEARS:
     return { ...state, yearList: action.data }
   case GET_VEHICLE_MAKES:
     return { ...state, makeList: action.data }
   case GET_VEHICLE_MODELS:
     return { ...state, modelList: action.data }
   case GET_VEHICLE_OIL_TYPES:
     return { ...state, oilTypeList: action.data }
   case GET_VEHICLE_FILTER_TYPES:
     return { ...state, filterTypeList: action.data }
   default:
     return state
 }
}