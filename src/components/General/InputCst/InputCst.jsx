import React from "react";
import './input.css'
    
const Input = ({input,meta,...props}) => {
    let err = meta.error && meta.touched
    return(
        <div>
            <input {...input} {...props} />
            {err && <span className="input__err">warning: {meta.error}</span>}
        </div>
    )
}

export default Input;