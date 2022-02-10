import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import listReducer from './list_reducer';
import authReducer from './auth_reducer';
import popupReducer from './popup_reducer';
import {reducer as form} from 'redux-form';

let reducers = combineReducers({
    listReducer,
    authReducer,
    popupReducer,
    form 
})


let store = createStore(reducers, applyMiddleware(thunk));
window.state = store;

export default store;