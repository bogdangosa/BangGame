import React,{useState} from 'react'
import './Game.css'
import Button from '../Button/Button'
import Dice from '../Dice/Dice'

const Game = (props)=>{
    const [CurentPlayerRole,SetCurentPlayerRole] = useState('');
    const [CurentPlayerName,SetCurentPlayerName] = useState('');
    const [CurentPlayerCharacter,SetCurentPlayerCharacter] = useState('');
    const [PlayersTurn,setPlayersTurn] = useState('');
    const [PlayersArray,setPlayersArray] = useState([]);
    const [CharactersArray,setCharactersArray] = useState([]);
    const [DiceValues,SetDiceValues] = useState([0,0,0,0,0]);
    const [RoomId,SetRoomId]= useState('error');
    let socket = props.socket;

    socket.on('sendStartingData',data=>{
        SetRoomId(data.room);
        SetCurentPlayerRole(data.role);
        SetCurentPlayerName(data.name);

        let AuxPlayerArray = [];
        let AuxCharactersArray = [];

        data.playersnamearray.forEach(PlayerName => {
            if(data.name == PlayerName) return;
            AuxPlayerArray.push(PlayerName);
        });

        let cIndex = data.playersnamearray.findIndex(PlayerName => PlayerName == data.name);
        SetCurentPlayerCharacter(data.playerscharacterarray[cIndex]);
        
        for(let i=0;i < data.playerscharacterarray.length;i++){
            if(i==cIndex) continue;
            AuxCharactersArray.push(data.playerscharacterarray[i]);
        }

        setPlayersArray(AuxPlayerArray);
        setCharactersArray(AuxCharactersArray);
        setPlayersTurn(data.playersturn);

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


    const CharacterPhoto =(characterName) =>{
        
        switch (characterName) {
            case 'Lucky Duke':
                return require('../CharacterImages/LuckyDuke.jpg').default
                break;

            case 'Willy The Kid':
                return require('../CharacterImages/WillyTheKid.jpg').default
                break;

            case 'Slab The Killer':
                return require('../CharacterImages/SlabTheKiller.jpg').default
                break;

            case 'Sid Ketchum':
                return require('../CharacterImages/SidKetchum.jpg').default
                break;

            case 'Vulture Sam':
                return require('../CharacterImages/VultureSam.jpg').default
                break;

            case 'Jourdonnais':
                return require('../CharacterImages/Jourdonnais.jpg').default
                break; 

            case 'Jourdonnais':
                return require('../CharacterImages/Jourdonnais.jpg').default
                break;

            case 'Paul Regret':
                return require('../CharacterImages/PaulRegret.jpg').default
                break;
        
            case 'Kit Carlson':
                return require('../CharacterImages/KitCarlson.jpg').default
                break;
        
            case 'Bart Cassidy':
                return require('../CharacterImages/BartCassidy.jpg').default
                break;

            case 'Suzy Lafayette':
                return require('../CharacterImages/SuzyLafayette.jpg').default
                break;

            case 'Rose Doolan':
                return require('../CharacterImages/RoseDoolan.jpg').default
                break;

            default:
                return require('../CharacterImages/LuckyDuke.jpg').default
                break;
        }
    }

    /*()=>CharacterPhoto(CurentPlayerCharacter)*/ 

    return(
        <div className="Game">
            <div className="CurentPlayerInfo">
                <img src={CharacterPhoto(CurentPlayerCharacter)} className="CurentPlayerImage"></img>
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
                        //console.log(CharactersArray[index]);
                        return(
                        <div className={`Player PlayerPosition${index+1}`}>
                            <img src={CharacterPhoto(CharactersArray[index])}></img>
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
