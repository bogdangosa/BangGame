import React,{ useState , useEffect }from 'react'
import './Login.css'
import Button from '../Button/Button'
import { useHistory } from "react-router-dom";

const Login = (props)=>{
    //Declar variabila nume care va tine valoarea inputului nume
    const [Name,setName] = useState('');
    const [Room,setRoom] = useState('');
    
    let socket = props.socket;

    const history = useHistory();


    //Functie care Transmite la server ca user-ul a intat intr-un meci
    const JoinGame = () =>{
        if(Name== '' || Room == '')return;
        socket.emit('NewUser',{name:Name,room:Room});
        history.push("/Lobby");
    }
    const CreateGame = () =>{
        if(Name=='')return;
        socket.emit('CreateGame',Name);
        history.push("/Lobby");
    }

    //Functie care updateaza valoarea variabiei name
    const ChangeName = e =>{
        setName(e.target.value);
        //console.log(Name);
    }
    const ChangeRoom = e =>{
        setRoom(e.target.value);
        //console.log(Room);
    }


    return (
        <div className="Login">
            <h1 className="LoginTitle">Bang Game</h1>
            <form className="LoginForm">
                <input className="LoginInput" placeholder="Enter your name" value={Name} onChange={ChangeName}/>
                <input className="LoginInput" placeholder="Enter room code" value={Room} onChange={ChangeRoom}/>
                <div className="LoginButtons">
                    <Button Text="Join Game" onClick={()=>JoinGame()} Selected={false}/>
                    <Button Text="Create Game" onClick={()=>CreateGame()} Selected={false}/>
                </div>
            </form>

        </div>
    )
}

export default Login;