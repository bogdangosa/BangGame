import React,{useState} from 'react'
import './Game.css'
import CharacterPhoto from '../CharacterImages/LuckyDuke.jpg'
import Button from '../Button/Button'
import Dice from '../Dice/Dice'

const Game = (props)=>{
    const [CurentPlayerRole,SetCurentPlayerRole] = useState('');
    const [CurentPlayerName,SetCurentPlayerName] = useState('');
    const [PlayersArray,setPlayersArray] = useState([]);
    const [DiceValues,SetDiceValues] = useState([0,0,0,0,0]);
    let socket = props.socket;
    let RoomId;

    socket.on('sendStartingData',data=>{
        //console.log(Role);
        RoomId = data.room;
        SetCurentPlayerRole(data.role);
        SetCurentPlayerName(data.name);


        setPlayersArray(data.playersnamearray);

        console.log(data.playersnamearray);

        socket.removeAllListeners("sendStartingData");
    })

    socket.on('PlayersTurn',PlayersTurnId=>{
        console.log(PlayersTurnId);
    })

    const RollDice = () =>{
        console.log("dice rolled");
        let DiceRoll = [];
        for(let i=0;i<5;i++)
            DiceRoll[i]=(Math.floor(Math.random()*6)+1);
        SetDiceValues(DiceRoll);
        
    }

    const NextPlayer = () =>{
        socket.emit('NextPlayer',RoomId);
    }

    return(
        <div className="Game">
            <div className="CurentPlayerInfo">
                <img src={CharacterPhoto} className="CurentPlayerImage"></img>
                <p className="CurentPlayerName">{CurentPlayerName}</p>
                <p className="CurentPlayerRole">{CurentPlayerRole}</p>
            </div>

            <Button Text="Roll Dice" className="RollDiceButton" onClick={ ()=>RollDice() }/>
            <Button Text="Next Player" className="NextPlayerButton" onClick={ ()=>NextPlayer() }/>
            

            <div className="DicesContainer">
                {
                    DiceValues.map(DiceValue=>{
                        return(
                            <Dice value={DiceValue}/>
                        )
                    })
                }
            </div>
            

            <div className="GamePlayersContainer">
               
                {
                    PlayersArray.map((playerName,index)=>{
                        return(
                        <div className={`Player PlayerPosition${index+1}`}>
                            <img src={CharacterPhoto}></img>
                            <p>{playerName}</p>                    
                        </div>
                        );
                    })
                }

            </div>

        </div>
    )
}

export default Game;
