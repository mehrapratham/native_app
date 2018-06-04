import { combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import VehicleForm from './VehicleForm';

export default combineReducers({
 router: routerReducer,
 VehicleForm: VehicleForm,
});
