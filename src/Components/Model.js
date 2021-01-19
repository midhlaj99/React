import React from 'react';
import "./main.css"
import Back from './Back'
const Model=(props)=>{
    return(
        <>
        <Back show={props.openmode} clicked={props.click}/>
            <div className={props.openmode ? 'showmodel' :''}>
                {props.children}
            </div>
        </>
    )
}
export default Model