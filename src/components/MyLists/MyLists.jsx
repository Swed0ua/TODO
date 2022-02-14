import React, { useEffect, useReducer, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import{ changeInputActionCreator, deleteTaskActionCreator, getTaskActionCreator } from "../../state/list_reducer";
import { addPopupActionCreator } from "../../state/popup_reducer";
import { addTaskThunk, changeCheckedThunk, changeLocalDataThunk, deleteTaskThunk, getLocalDataThunk, ToDoListsEventTunk } from "../../state/thunk";
import Button from "../General/Button/Button";
import ListItem from "./ListItem/ListItem";
import "./MyLists.css"

const MyLists = (props) => {
    let list = useSelector(store => store.listReducer.tasks);
    let getInputText = useSelector(store => store.listReducer.inputAdd)
    let dispatch = useDispatch();
    let inputText = React.createRef()

    const addTask = () => {
       if (getInputText.trim() != ''){
            dispatch(addTaskThunk(list, getInputText))
            popupAdd(('add task with text: ' + getInputText.toString()), 'succes')
       }
    }

    const changeInput = () => {
        dispatch(changeInputActionCreator(inputText.current.value))
    }

    const removeTask = (id) => {
        dispatch(deleteTaskThunk(list, id))
        popupAdd('remove task', 'warning')
    }

    const getTaskList = () => {
        console.log(`authID + ${props.authId}`)
        dispatch(ToDoListsEventTunk('GET', props.authId))
    }

    const changeCheckedInput = (id) => {
        dispatch( changeCheckedThunk(list, id) )
    }

    const popupAdd = (text, stage) => {
        dispatch(addPopupActionCreator(text, stage))
    }

    const listDisplay = (element) => {
        if (element.length){
            return (
                element.map(e=><ListItem key={e.id} text={e.text} id={e.id} remove={removeTask} isChacked = {e.checked}  changeCheckedInput={changeCheckedInput}/>)
            )
        } else {
            return <p>'list is empty'</p>
        }
    }

    useEffect(()=>{
        getTaskList()
    }, [])


    let listDone = listDisplay(list);


    return (
        <main>  
          <h1>
            MY TASKS
          </h1>
          <div className="list__wrapper eclipse__wrapper">
            <div className="list__inputs input__wrapper">
                <Button onClickEvent={addTask} classes='but1' content="add tasks" />
                {<input placeholder="write text" value={getInputText } ref={inputText} onChange={() => changeInput()} type="text" name="text" />}
            </div>
            {listDone}
          </div>
        </main>
    )
}

export default MyLists