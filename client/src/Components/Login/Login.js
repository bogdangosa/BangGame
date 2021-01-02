import React from 'react'
import './Login.css'
import Button from '../Button/Button'

const Login = ()=>{
    return (
        <div className="Login">
            <h1 className="LoginTitle">Bang Game</h1>
            <form className="LoginForm">
                <input className="LoginInput" placeholder="Enter your name"/>
                <input className="LoginInput" placeholder="Enter room code"/>
                <div className="LoginButtons">
                    <Button Text="Join Game"/>
                    <Button Text="Create Game"/>
                </div>
            </form>

        </div>
    )
}

export default Login;