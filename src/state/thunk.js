import { stopSubmit } from "redux-form";
import { LocalData, AuthAPI } from "./api"
import { authChangeActionCreator, initializationActionCreator } from "./auth_reducer";
import { changeInputActionCreator, getTaskActionCreator } from "./list_reducer"
import { addPopupActionCreator } from "./popup_reducer";

let AUTH = 'auth',
TASKS = 'tasks'
export const assignId = (state) => state.length ? state[state.length-1].id + 1 : 0;

export const firstAuthTunk = () => (dispatch) => {
    return new Promise((resolve, reject)=> resolve(dispatch(getLocalDataThunk(AUTH))))
        .then((e)=>{
            dispatch(initializationActionCreator())
            dispatch(authChangeActionCreator(true, e.id, e.login))
            dispatch(getDataWithServThunk(e.id))
        })
}

export const getDataWithServThunk = (id) => (dispatch) =>{
    AuthAPI.getDatabase(id)
}

export const setAuthLocalDataThunk = (event ,login = '', password="", id="") => (dispatch) => {
    let authUser = null;
    if (event) {
        authUser = {
            id,
            login,
            password
        } 
    }
    LocalData.setState(AUTH, authUser)
    dispatch(authChangeActionCreator(event, login, id))
    dispatch(getDataWithServThunk(id))
}

export const singInThunk = (login = null, password = null) => (dispatch) => {
    AuthAPI.signIn(login, password).then((id) => {
          dispatch(setAuthLocalDataThunk(true, login, password, id))
    }).catch(err => {
        let errroText = 'login or password is invalid'
        let error = stopSubmit('login', {_error: errroText})
        dispatch( addPopupActionCreator(errroText, 'error') )
        dispatch(error)
    })
}

export const singOutThunk = () => (dispatch) => {
    if (window.confirm("You want exit?")) dispatch(setAuthLocalDataThunk(false))
}

export const createAccountThunk = (login = null, password = null) => (dispatch) => {
    AuthAPI.createAccount(login, password)
}

export const getLocalDataThunk = (stateName) => (dispatch) => {
    const promise = new Promise ((resolve, reject) => {
        resolve(LocalData.getState(stateName))
    }).then(e => e ? e : []).then(e=>JSON.parse(e)).then(e => {
        switch(stateName){
            case AUTH :
                return  e
            case TASKS :
                return dispatch(getTaskActionCreator(e))
        }
    })
    return promise
}

export const changeLocalDataThunk = (stateName ,state) =>(dispatch)=> {
    const promise = new Promise ((resolve, reject) => {
        resolve(LocalData.setState(stateName, state))
    }).then((e)=>{
        dispatch(getLocalDataThunk('tasks'))
    })
    return promise
}

export const addTaskThunk = (state, text, dateTo = false) => (dispatch) => {
    if (text.trim() != ''){
        dispatch(changeLocalDataThunk('tasks', [...state, {id: assignId(state), text: text, dateTo: dateTo, checked: false}]))
        dispatch(changeInputActionCreator(''))
    }
    
}

export const changeCheckedThunk = (state, id) => (dispatch) => {
   
    let newTasks = state.map(e => {
        if (e.id == id) {
            let a = e
            a.checked = !e.checked
            return a
        }
        return e
    }) 
    dispatch(changeLocalDataThunk('tasks',[...newTasks]))
}

export const deleteTaskThunk = (state, id) => (dispatch) => {
    const newTaskList = state.filter(e=>{
        let compresion = e.id == id
        if (compresion) return;
        return e
    })
    dispatch(changeLocalDataThunk('tasks', newTaskList))
}