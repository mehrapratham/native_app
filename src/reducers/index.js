import { combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import VehicleForm from './VehicleForm';
import TogglePopup from './TogglePopup'

export default combineReducers({
 router: routerReducer,
 VehicleForm: VehicleForm,
 TogglePopup: TogglePopup,
});
