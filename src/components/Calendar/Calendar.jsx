import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPopupActionCreator, removePopupActionCreator } from "../../state/popup_reducer";
import PopupContainer from "../General/PopUp/popup";
import './calendar.css'

const Calendar = (props) => {
    let dispatch = useDispatch();

    const popupAdd = () => {
        dispatch(addPopupActionCreator('hello world', 'static'))
    }  
    return(
        <main>
            <button onClick={popupAdd} className="but_1">ADD POPUP</button>
        </main>
    )
}



export default Calendar;