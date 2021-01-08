import React,{ useState , useEffect } from 'react'
import Button from '../Button/Button';
import './Lobby.css'
import CharacterPhoto from '../CharacterImages/BlackJack.jpg'
import { useHistory } from "react-router-dom";

const Lobby = (props)=> {
    const [playersArray,SetPlayersArray] = useState([]);
    const [ReadyState,SetReadyState] = useState(false);
    const [CurentPlayersName,setCurentPlayersName]= useState('');
    const [RoomId,SetRoomId]= useState('error');

    let socket = props.socket;

    const history = useHistory();


    socket.on('NewPlayer',NewPlayer=>{
        //console.log(playersArray);
        SetPlayersArray([...playersArray,NewPlayer]);    
        //console.log(NewPlayer);
    })

    socket.on('StartingLobbyData',StartingLobbyData=>{
       SetRoomId(StartingLobbyData.room);
       let CurentPlayersArray = StartingLobbyData.curentPlayersArray;

        setCurentPlayersName(CurentPlayersArray[CurentPlayersArray.length-1]);
        
        SetPlayersArray(CurentPlayersArray);
        //console.log(CurentPlayersArray);
        //console.log(CurentPlayersName);
        
    })
    

    socket.on('GameStarted',()=>{
        console.log("Game Started");
        //socket.emit('GetRole',CurentPlayersName);
        socket.removeAllListeners("GameStarted");
        history.push("/Game");
    })

    socket.on('UserLeft', rPlayersArray=>{
        SetPlayersArray(rPlayersArray);
    })

        
    const PlayerReady = ()=> {
        if(!ReadyState){
            console.log(CurentPlayersName);
            socket.emit('PlayerReady',RoomId);
            SetReadyState(true);
        }
        else {
            socket.emit('PlayerNotReady',RoomId);
            SetReadyState(false);
        }

    }

    return (
        <div className="Lobby">
            <p className="LobbyCode">room code:{RoomId}</p>
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
