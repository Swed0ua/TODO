const ADD_TASK = 'ADD_TASK',
CHANGE_TASK = 'CHANGE_TASK',
DELLETE_TASK = 'DELLETE_TASK',
GET_TASKS = 'GET_TASKS',
CHANGE_INPUTADD = 'CHANGE_INPUTADD',
CHANGE_CHACKED = 'CHANGE_CHACKED'

let initialState = {
    tasks: [
       
    ], 
    inputAdd : ''
}

let listReducer = (state = initialState, action) => { 
    

    switch (action.type) {
        case GET_TASKS :
            return {...state, tasks: [...action.state]}
        case DELLETE_TASK:
            let newTaskList = state.tasks.filter(e=>{
                let compresion = e.id == action.id
                if (compresion) return;
                return e
            })
            return {...state, tasks: [...newTaskList]}
        case CHANGE_TASK :
            return 'dasd'
        case CHANGE_INPUTADD : 
            return {...state, inputAdd: action.text}
    }
    return state;
}

export default listReducer;

export let getTaskActionCreator = (state) => {
    return {
        type : GET_TASKS , state
    }
  };

export let deleteTaskActionCreator = (id) => {
    return {
        type : DELLETE_TASK, id
    }
};

export let changeTaskActionCreator = () => {
    return {
        type : CHANGE_TASK
    }
};

export let changeInputActionCreator = (text) => {
    return {
        type : CHANGE_INPUTADD, text
    }
};