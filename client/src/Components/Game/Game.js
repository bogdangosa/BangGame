import React,{useState} from 'react'
import './Game.css'
import CharacterPhoto from '../CharacterImages/LuckyDuke.jpg'
import Button from '../Button/Button'
import Dice from '../Dice/Dice'

const Game = (props)=>{
    const [CurentPlayerRole,SetCurentPlayerRole] = useState('');
    const [CurentPlayerName,SetCurentPlayerName] = useState('');
    const [PlayersTurn,setPlayersTurn] = useState('');
    const [PlayersArray,setPlayersArray] = useState([]);
    const [DiceValues,SetDiceValues] = useState([0,0,0,0,0]);
    const [RoomId,SetRoomId]= useState('error');
    let socket = props.socket;

    socket.on('sendStartingData',data=>{
        SetRoomId(data.room);
        SetCurentPlayerRole(data.role);
        SetCurentPlayerName(data.name);

        let AuxPlayerArray = [];

        data.playersnamearray.forEach(PlayerName => {
            if(data.name == PlayerName) return;
            AuxPlayerArray.push(PlayerName);
        });

        setPlayersArray(AuxPlayerArray);
        setPlayersTurn(data.playersturn);

        console.log(data.playersturn);

        socket.removeAllListeners("sendStartingData");
    })

    socket.on('PlayersTurn',PlayersTurnName=>{
        console.log(PlayersTurnName);
        setPlayersTurn(PlayersTurnName);
    })

    const RollDice = () =>{
        console.log("dice rolled");
        let DiceRoll = [];
        for(let i=0;i<5;i++)
            DiceRoll[i]=(Math.floor(Math.random()*6)+1);
        SetDiceValues(DiceRoll);
        
    }

    const NextPlayer = () =>{
        if(CurentPlayerName != PlayersTurn) return;
        socket.emit('NextPlayer',RoomId);
        setPlayersTurn(''); //To be fixed
    }

    return(
        <div className="Game">
            <div className="CurentPlayerInfo">
                <img src={CharacterPhoto} className="CurentPlayerImage"></img>
                <div className="CurentPlayerNameRoleContainer">
                    <p className="CurentPlayerName">{CurentPlayerName}</p>
                    <p className="CurentPlayerRole">{CurentPlayerRole}</p>
                </div>
                {CurentPlayerName == PlayersTurn ? <p className="CurentPlayersTurn">*</p>: <p></p>}  
                
            </div>

            <Button Text="Roll Dice" className="RollDiceButton" onClick={ ()=>RollDice() } Selected={false}/>
            <Button Text="Next Player" className="NextPlayerButton" onClick={ ()=>NextPlayer() } Selected={ CurentPlayerName != PlayersTurn}/>
            

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
                            {playerName == PlayersTurn ? <p className="PlayersTurn">*</p>: <p></p>}              
                        </div>
                        );
                    })
                }

            </div>

        </div>
    )
}

export default Game;
