import initialState from '../initialState'
import { GET_VEHICLE_YEARS } from '../../actions/types'
export default (state = initialState.VehicleForm, action) => {
 switch (action.type) {
   case GET_VEHICLE_YEARS:
     return { ...state, yearList: action.data }
   default:
     return state
 }
}