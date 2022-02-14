import React from "react";
import './button.css'

const Button = ({onClickEvent = null, classes = 'butDef', content = ''}) => {
    return(
        <div className="button__wrapper">
            <button className={"button " + classes} onClick={()=>onClickEvent()} >
                <span className="button__content">{content}</span>
            </button>
        </div>
    )
}

export default Button;