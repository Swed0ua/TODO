import React from "react";
import './loader.css'
import loaderPattern from '../../../loader_pattern.gif'
import { useEffect } from "react";
import { useState } from "react";


const Loader = (props) => {

    let [load, setLoad] = useState(false)

    useEffect(()=>{
        setLoad(!load)
    }, [props.loading])

    return (
        <div className={`loader loader__pattern ${props.loading ? ' _active' : ''}`}>
            <img src={loaderPattern} alt="loader" />
         </div>
    )
}

export default Loader