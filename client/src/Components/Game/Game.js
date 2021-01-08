import React,{useState} from 'react'
import './Game.css'
import CharacterPhoto from '../CharacterImages/LuckyDuke.jpg'
import Button from '../Button/Button';
import Dice from '../Dice/Dice';

const Game = (props)=>{
    const [CurentPlayerRole,SetCurentPlayerRole] = useState('');
    const [CurentPlayerName,SetCurentPlayerName] = useState('');
    let socket = props.socket;
    let RoomId;

    socket.on('sendStartingData',data=>{
        //console.log(Role);
        RoomId = data.room;
        SetCurentPlayerRole(data.role);
        SetCurentPlayerName(data.name);
        socket.removeAllListeners("sendStartingData");
    })


    return(
        <div className="Game">
            <div className="CurentPlayerInfo">
                <img src={CharacterPhoto} className="CurentPlayerImage"></img>
                <p className="CurentPlayerName">{CurentPlayerName}</p>
                <p className="CurentPlayerRole">{CurentPlayerRole}</p>
            </div>

            <Button Text="Roll Dice" className="RollDiceButton"/>

            <div className="DicesContainer">
                <Dice/>
                <Dice/>
                <Dice/>
                <Dice/>
                <Dice/>
            </div>
            

        </div>
    )
}

export default Game;
