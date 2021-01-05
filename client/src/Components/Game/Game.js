import React,{useState} from 'react'
import './Game.css'
import CharacterPhoto from '../CharacterImages/LuckyDuke.jpg'

const Game = (props)=>{
    const [CurentPlayerRole,SetCurentPlayerRole] = useState('');
    const [CurentPlayerName,SetCurentPlayerName] = useState('');
    let socket = props.socket;

    socket.on('sendStartingData',data=>{
        //console.log(Role);
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

        </div>
    )
}

export default Game;
