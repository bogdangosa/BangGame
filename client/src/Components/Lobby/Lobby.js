import React,{useState} from 'react'
import Button from '../Button/Button';
import './Lobby.css'
import CharacterPhoto from './Images/CharacterPhoto.jpg'

const Lobby = (props)=> {
    const [playersArray,SetplayersArray] = useState([]);
    let socket = props.socket;
    

    socket.on('PlayersArray',PlayersArray=>{
        
        SetplayersArray(PlayersArray);
        /*PlayersArray.forEach(Player => {
            console.log(Player);
        });*/
        console.log(playersArray);
    })

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
                                <p className="PlayerName">Test</p>
                            </div>
                        );
                    })
                }


            </div>
            <Button Text="Ready" className="ReadyButton"/>
        </div>
    )
}

export default Lobby;
