import initialState from '../initialState'
import { GET_VEHICLE_YEARS, GET_VEHICLE_MAKES, GET_VEHICLE_MODELS, GET_VEHICLE_OIL_TYPES, GET_VEHICLE_FILTER_TYPES, GET_AVAILABILITY, GET_VEHICLE_BOOKINGS, GET_CARQUERY_MAKES, GET_CARQUERY_MODELS} from '../../actions/types'
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
   case GET_AVAILABILITY:
     return { ...state, availabilityList: action.data }
   case GET_VEHICLE_BOOKINGS:
     return { ...state, bookingList: action.data }
   case GET_CARQUERY_MAKES:
     return { ...state, makesList: action.data } 
    case GET_CARQUERY_MODELS:
     return { ...state, modelsList: action.data } 
   default:
     return state
 }
}