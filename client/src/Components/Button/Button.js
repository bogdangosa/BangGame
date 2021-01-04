import React from 'react'
import './Button.css'

const Button = (props) =>{
    return (
        <div className={`Button ${props.className}`}  onClick={props.onClick} >
            {props.Text}
        </div>
    )
}

export default Button;