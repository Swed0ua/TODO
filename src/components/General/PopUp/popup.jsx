import React, { useEffect } from "react";
import './popup.css'
import { useDispatch } from "react-redux";
import { removePopupActionCreator } from "../../../state/popup_reducer";

const PopupContainer = (props) => {
    return (
        <div className="popup__container">
            <div className="popup__content">
                {props.state.map(e=>{
                    return <Popup {...e}/>
                })}
            </div>
        </div>
    )
}


const Popup = ({text, id, stage}) => {
    let dispatch = useDispatch();
    let removeItem = (id) => {
        dispatch(removePopupActionCreator(id))
    }

    function lifeRemove (){
        setTimeout(()=>{
            console.log('warning')
            removeItem(id)
        }, 5000)
    }

    useEffect(()=>{
       lifeRemove()
    }, [])

    return (
        <div className={"popup " + "_" + stage.toString()}> 
            <span className="popup__text">{text}</span>
            <span className="closer popup__closer" onClick={()=>removeItem(id)}></span>
            <div className="popup__backDecor"></div>
        </div>
    )
}


export default PopupContainer
