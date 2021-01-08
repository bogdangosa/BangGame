import React from 'react'
import './Dice.css'

const Dice = (props) =>{
    return (
        <div className={`Dice ${props.className}`}  onClick={props.onClick} >
            {props.value}
        </div>
    )
}

export default Dice;