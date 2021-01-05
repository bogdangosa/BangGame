import React,{ useState , useEffect } from 'react'
import Button from '../Button/Button';
import './Lobby.css'
import CharacterPhoto from './Images/CharacterPhoto.jpg'

const Lobby = (props)=> {
    const [playersArray,SetPlayersArray] = useState([]);
    const [ReadyState,SetReadyState] = useState(false);
    const [CurentPlayersName,setCurentPlayersName]= useState('');

    let socket = props.socket;


    socket.on('NewPlayer',NewPlayer=>{
        //console.log(playersArray);
        SetPlayersArray([...playersArray,NewPlayer]);    
        //console.log(NewPlayer);
    })

    socket.on('CurentPlayers',CurentPlayersArray=>{
        setCurentPlayersName(CurentPlayersArray[CurentPlayersArray.length-1]);
        
        SetPlayersArray(CurentPlayersArray);
        //console.log(CurentPlayersArray);
        console.log(CurentPlayersName);
        
    })
    

    socket.on('GameStarted',()=>{
        console.log("Game Started");
        socket.emit('GetRole',CurentPlayersName);

    })

    socket.on('sendRole',Role=>{
        console.log(Role);
    })
        

    const PlayerReady = ()=> {
        if(!ReadyState){
            console.log(CurentPlayersName);
            socket.emit('PlayerReady',CurentPlayersName);
            SetReadyState(true);
        }
        else {
            socket.emit('PlayerNotReady',CurentPlayersName);
            SetReadyState(false);
        }

        
    }

    return (
        <div className="Lobby">
            <p className="LobbyCode">room code: 23f4-33fg-12ff </p>
            <div className="PlayersContainer">
                {
                    playersArray.map((player,index)=>{
                        return (
                            <div className="PlayerContainer" key={index}>
                                <img src={CharacterPhoto}></img>
                                <p className="PlayerName">{player}</p>
                            </div>
                        );
                    })
                }

            </div>
            <Button Text="Ready" className={ReadyState ? "ReadyButton  ReadyButtonSelected": "ReadyButton"} onClick={()=>PlayerReady()}/>
        </div>
    )
}

export default Lobby;
