import { assignId } from "./thunk"

const POPUP__ADD = 'POPUP__ADD',
      REMOVE__ADD = 'REMOVE__ADD'

let initialState = {
    popupList: [
        {id: 0, text: 'ou yep', stage: 'warning'},
        {id: 2, text: 'oh no', stage: 'error'}
    ]
}

let popupReducer = (state = initialState, action) => { 
    switch (action.type) {
        case POPUP__ADD :
            return {...state, popupList: [...state.popupList, {id: assignId(state.popupList), text: action.text, stage: action.stage}]}
            case REMOVE__ADD:
                let newState = state.popupList.filter(e=>{
                    if (e.id != action.id) return e
                })
                return {...state, popupList: newState}

    }
    return state;
}

export const addPopupActionCreator = (text ,stage = 'static') => {
    return {
        type: POPUP__ADD,
        text,
        stage
    }
}

export const removePopupActionCreator = (id) => {
    return {
        type: REMOVE__ADD,
        id
    }
}

export default popupReducer;

