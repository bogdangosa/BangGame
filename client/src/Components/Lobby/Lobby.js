import React,{useEffect} from 'react'
import Button from '../Button/Button';
import './Lobby.css'
import CharacterPhoto from './Images/CharacterPhoto.jpg'

const Lobby = (props)=> {
    let playersArray = [];

    let socket = props.socket;

    socket.on('NewPlayer',NewPlayer=>{
        playersArray.push(NewPlayer);
        console.log(playersArray);
    })


    const PlayerReady = ()=> {
        socket.emit('PlayerReady',playersArray[0]);
    }

    return (
        <div className="Lobby">
            <p className="LobbyCode">room code: 23f4-33fg-12ff </p>
            <div className="PlayersContainer">
                <div className="PlayerContainer">
                    <img src={CharacterPhoto}></img>
                    <p className="PlayerName">Un Nume</p>
                </div>
                <div className="PlayerContainer">
                    <img src={CharacterPhoto}></img>
                    <p className="PlayerName">Un Nume</p>
                </div>

                {
                    playersArray.map(player=>{
                        console.log("Got Here");
                        return (
                            <div className="PlayerContainer" >
                                <img src={CharacterPhoto}></img>
                                <p className="PlayerName">{player}</p>
                            </div>
                        );
                    })
                }


            </div>
            <Button Text="Ready" className="ReadyButton" onClick={()=>PlayerReady()}/>
        </div>
    )
}

export default Lobby;
