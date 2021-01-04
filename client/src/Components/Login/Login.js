import React,{ useState , useEffect }from 'react'
import './Login.css'
import Button from '../Button/Button'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'

const Login = (props)=>{
    //Declar variabila nume care va tine valoarea inputului nume
    const [Name,setName] = useState('');
    
    let socket = props.socket;


    //Functie care Transmite la server ca user-ul a intat intr-un meci
    const JoinGame = () =>{
        socket.emit('NewUser',Name);
    }

    //Functie care updateaza valoarea variabiei name
    const ChangeName = e =>{
        setName(e.target.value);
        //console.log(Name);
    }

    return (
        <div className="Login">
            <h1 className="LoginTitle">Bang Game</h1>
            <form className="LoginForm">
                <input className="LoginInput" placeholder="Enter your name" value={Name} onChange={ChangeName}/>
                <input className="LoginInput" placeholder="Enter room code"/>
                <div className="LoginButtons">
                    <Link to='/Lobby' onClick={()=>JoinGame()} className="LoginButton"><Button Text="Join Game"/></Link>
                    <Button Text="Create Game"/>
                </div>
            </form>

        </div>
    )
}

export default Login;