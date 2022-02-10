import React from "react";

const ListItem = (props) => {
    let isCheck = props.isChacked
    let listItemClass = isCheck ? '_checked' : '';
    return (
        <div className={listItemClass + ' ' + 'list__item'}>
            <div className='item__chackbox castom__chackbox'>
                {props.isChacked ? <input checked type="checkbox" onClick={()=>props.changeCheckedInput(props.id)} /> : <input  type="checkbox" onClick={()=>props.changeCheckedInput(props.id)} />}
            </div>
            <span className="item__name">{props.text}</span>
            <span className="item__date">
                {props.dateTo ? <span>to {props.dateTo}</span> : ''}
            </span>
            <div onClick={()=>props.remove(props.id)} className="item__closer closer"></div>
        </div>
    )
}

export default ListItem