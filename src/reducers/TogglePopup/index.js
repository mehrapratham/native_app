import initialState from '../initialState'
import { GET_TOGGLE_POPUP_STATUS } from '../../actions/types'
export default (state = initialState.TogglePopup, action) => {
  console.log(action,666555)
 switch (action.type) {

   case GET_TOGGLE_POPUP_STATUS:
     return { ...state, isPopUp: action }
   default:
     return state
 }
}