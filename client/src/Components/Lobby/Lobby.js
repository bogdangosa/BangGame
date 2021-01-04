import React,{ useState , useEffect } from 'react'
import Button from '../Button/Button';
import './Lobby.css'
import CharacterPhoto from './Images/CharacterPhoto.jpg'

const Lobby = (props)=> {
    const [playersArray,SetPlayersArray] = useState([]);
    const [ReadyState,SetReadyState] = useState(false);

    let socket = props.socket;

    socket.on('CurentPlayers',CurentPlayersArray=>{
        SetPlayersArray(CurentPlayersArray);
        console.log(CurentPlayersArray);
    })
    
    
    socket.on('NewPlayer',NewPlayer=>{
        SetPlayersArray([...playersArray,NewPlayer]);
        //console.log(playersArray);
        //console.log(NewPlayer);
    })

    socket.on('GameStarted',()=>{
        console.log("Game Started");
        socket.emit('GetRole',playersArray[0]);

    })

    socket.on('sendRole',Role=>{
        console.log(Role);
    })

    


    const PlayerReady = ()=> {
        if(!ReadyState){
            socket.emit('PlayerReady',playersArray[0]);
            SetReadyState(true);
        }
        else {
            socket.emit('PlayerNotReady',playersArray[0]);
            SetReadyState(false);
        }

        
    }

    return (
        <div className="Lobby">
            <p className="LobbyCode">room code: 23f4-33fg-12ff </p>
            <div className="PlayersContainer">
                {
                    playersArray.map((player,index)=>{
                        console.log("Got Here");
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
