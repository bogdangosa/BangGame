import React from 'react'
import './Dice.css'

const Dice = (props) =>{
    return (
        <div className={`Dice ${props.className}`}  onClick={props.onClick} >
            {props.Text}
        </div>
    )
}

export default Dice;