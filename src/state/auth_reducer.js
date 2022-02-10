const AUTH__CHANGE = 'AUTH__CHANGE',
      INITIALIZATION = 'INITIALIZATION'

let initialState = {
    isAuth: false,
    authLogin: '',
    authId: '',
    initApp: false
}

let authReducer = (state = initialState, action) => { 
    switch (action.type) {
        case AUTH__CHANGE :
            return {...state, isAuth : action.swt, authLogin: action.login, authId: action.id}
        case INITIALIZATION :
            return {...state, initApp: action.init}
    }
    return state;
}

export const authChangeActionCreator = (swt, login = '', id = '') => {
    return {
        type: AUTH__CHANGE,
        swt,
        login,
        id
    }
}

export const initializationActionCreator = (init = true) => {
    return {
        type: INITIALIZATION,
       init
    }
}

export default authReducer;

