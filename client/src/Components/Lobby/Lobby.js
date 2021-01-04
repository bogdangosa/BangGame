import React from 'react'
import Button from '../Button/Button';
import './Lobby.css'
import CharacterPhoto from './Images/CharacterPhoto.jpg'

const Lobby = (props)=> {
    let socket = props.socket;



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

                <div className="PlayerContainer">
                    <img src={CharacterPhoto}></img>
                    <p className="PlayerName">Un Nume</p>
                </div>

                <div className="PlayerContainer">
                    <img src={CharacterPhoto}></img>
                    <p className="PlayerName">Un Nume</p>
                </div>

                <div className="PlayerContainer">
                    <img src={CharacterPhoto}></img>
                    <p className="PlayerName">Un Nume</p>
                </div>


            </div>
            <Button Text="Ready" className="ReadyButton"/>
        </div>
    )
}

export default Lobby;
