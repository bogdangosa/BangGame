import React,{useState} from 'react'
import Button from '../Button/Button';
import './Lobby.css'
import CharacterPhoto from './Images/CharacterPhoto.jpg'

const Lobby = (props)=> {
    const [playersArray,SetPlayersArray] = useState([]);

    let socket = props.socket;

    socket.on('NewPlayer',NewPlayer=>{
        SetPlayersArray([...playersArray,{
            id:playersArray.length,
            name:NewPlayer
        }]);
        console.log(playersArray);
        console.log(NewPlayer);
    })


    const PlayerReady = ()=> {
        socket.emit('PlayerReady',playersArray[0].name);
    }

    return (
        <div className="Lobby">
            <p className="LobbyCode">room code: 23f4-33fg-12ff </p>
            <div className="PlayersContainer">
                {
                    playersArray.map(player=>{
                        console.log("Got Here");
                        return (
                            <div className="PlayerContainer" key={player.id}>
                                <img src={CharacterPhoto}></img>
                                <p className="PlayerName">{player.name}</p>
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
