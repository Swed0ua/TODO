import { stopSubmit } from "redux-form";
import { LocalData, AuthAPI } from "./api"
import { authChangeActionCreator, initializationActionCreator } from "./auth_reducer";
import { changeInputActionCreator, getTaskActionCreator } from "./list_reducer"
import { addPopupActionCreator } from "./popup_reducer";

let AUTH = 'auth',
TASKS = 'tasks',
GET = 'GET'

const mergeLists = (localList = [], servList = {}) => {
    const newList = []
    localList.map(elem=>{
        if (!servList[elem.id]){
            newList.push(elem)
        }
    })
    for (let [key, value] of Object.entries(servList)) {
        newList.push(value)
    }
    return ([...newList])
}

export const assignId = (state) => {
    let lastID = state.length ? state[state.length-1].id + 1 : 0;
    let nowDate = new Date().getTime()
    let result = lastID.toString() + nowDate.toString()
    return result ;
}

export const firstAuthTunk = () => (dispatch) => {
    return new Promise((resolve, reject)=> resolve(dispatch(getLocalDataThunk(AUTH))))
        .then((e)=>{
            dispatch(initializationActionCreator())
            dispatch(authChangeActionCreator(true, e.login, e.id))
        })
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
    dispatch(getListDataWithServThunk(id))
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

export const ToDoListsEventTunk = (event, id = 'FbM0EoauMvSA7nJOrIyEsX88t6n1', state = []) => (dispatch) => {
    if (event === 'GET') {
        let lcDataList,
            srDataList,
            newState;
        dispatch(getListDataWithServThunk(id))
            .then(e => {
                srDataList = e.todo_list
                dispatch(getLocalDataThunk(TASKS)).then(ld=>{
                    console.log(ld)
                    lcDataList = ld
                    newState = mergeLists(lcDataList, srDataList)
                    console.log(newState)
                    dispatch(getTaskActionCreator(newState))

                })
            })
    } else if (event === 'SET') {

    }
}

export const getListDataWithServThunk = (id) => (dispatch) =>{
    const promise = new Promise((resolve, reject) => {
        resolve( AuthAPI.getTODOListData(id));
    })

    return promise
}

export const getLocalDataThunk = (stateName) => (dispatch) => {
    const promise = new Promise ((resolve, reject) => {
        resolve(LocalData.getState(stateName))
    }).then(e => e ? e : []).then(e=>JSON.parse(e)).then(e => {
        return e
        /* switch(stateName){
            case AUTH :
                return  e
            case TASKS :
                return dispatch(getTaskActionCreator(e))
        } */
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