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
    const [DiceValues,SetDiceValues] = useState([{value:0,selected:false},{value:0,selected:false},{value:0,selected:false},{value:0,selected:false},{value:0,selected:false}]);
    //const [SelectedDices,SetSelectedDices] = useState([false,false,false,false,false]);
    const [RoomId,SetRoomId]= useState('error');
    const [PositionsIndexArray,SetPositionsIndexArray] = useState([]);
    let socket = props.socket;

    socket.on('sendStartingData',data=>{
        SetRoomId(data.room);
        SetCurentPlayerRole(data.role);
        SetCurentPlayerName(data.name);

        let AuxPlayerArray = [];
        let AuxCharactersArray = [];

        let cIndex = data.playersnamearray.findIndex(PlayerName => PlayerName == data.name);
       // console.log(cIndex);
        SetCurentPlayerCharacter(data.playerscharacterarray[cIndex]);
        

        let NextName = data.playersnextarray[cIndex];
        cIndex = data.playersnamearray.findIndex(NextPlayerName=> NextPlayerName == NextName);
        //console.log(cIndex);
        AuxPlayerArray.push(NextName);
        AuxCharactersArray.push(data.playerscharacterarray[cIndex]);

        while(data.playersnextarray[cIndex] != data.name){
            NextName = data.playersnextarray[cIndex];
            cIndex = data.playersnamearray.findIndex(NextPlayerName=> NextPlayerName == NextName);
            console.log(cIndex);
            AuxPlayerArray.push(NextName);
            AuxCharactersArray.push(data.playerscharacterarray[cIndex]);
        }

        /*console.log("----");
        console.log(data.playersnamearray);
        console.log(data.playersnextarray);
        console.log(AuxPlayerArray);*/


        switch(data.playersnamearray.length){
            case 3:
                SetPositionsIndexArray([1,2]);
                break;
            case 4:
                SetPositionsIndexArray([1,3,2]);
                break;
            case 5: 
                SetPositionsIndexArray([4,1,3,2]);
                break;
            case 6:
                SetPositionsIndexArray([4,1,3,2,5]);
                break;

        }


        setPlayersArray(AuxPlayerArray);
        setCharactersArray(AuxCharactersArray);
        setPlayersTurn(data.playersturn);

        socket.removeAllListeners("sendStartingData");
    })

    socket.on('PlayersTurn',PlayersTurnName=>{
        console.log(PlayersTurnName);
        setPlayersTurn(PlayersTurnName);
        SetDiceValues([{value:0,selected:false},{value:0,selected:false},{value:0,selected:false},{value:0,selected:false},{value:0,selected:false}]);
    });
    socket.on('DiceResult',DiceRoll=>{
        console.log(DiceRoll);
        let AuxDiceArray = [];
        DiceRoll.forEach(DiceValue => {
            AuxDiceArray.push({value:DiceValue,selected:false});
        });
        SetDiceValues(AuxDiceArray);
    });

    const RollDice = () =>{

        if(CurentPlayerName != PlayersTurn) return;
        
        let AuxDiceValues = [];
        DiceValues.forEach(DiceValue => {
            AuxDiceValues.push(DiceValue.value);
        });

        socket.emit('RollDice',{room:RoomId,diceArray:AuxDiceValues});

    }

    const NextPlayer = () =>{
        if(CurentPlayerName != PlayersTurn) return;
        socket.emit('NextPlayer',RoomId);
        SetDiceValues([{value:0,selected:false},{value:0,selected:false},{value:0,selected:false},{value:0,selected:false},{value:0,selected:false}]);
        setPlayersTurn(PlayersArray[0]); //To be fixed
        
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

    const LockDice = (DiceIndex) =>{
        //console.log(DiceIndex);
        let AuxSelectedDices = DiceValues;
        AuxSelectedDices[DiceIndex].selected = !AuxSelectedDices[DiceIndex].selected;
        console.log(AuxSelectedDices);
        SetDiceValues(AuxSelectedDices);
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

            <Button Text="Roll Dice" className="RollDiceButton" onClick={ ()=>RollDice() } Selected={CurentPlayerName != PlayersTurn}/>
            <Button Text="Next Player" className="NextPlayerButton" onClick={ ()=>NextPlayer() } Selected={ CurentPlayerName != PlayersTurn}/>
            

            <div className="DicesContainer">
                {
                    DiceValues.map((DiceValue,DiceIndex)=>{
                        return(
                            <Dice value={DiceValue.value} onClick={()=>LockDice(DiceIndex)} Selected={DiceValue.selected} Index={DiceIndex}/>
                        )
                    })
                }
            </div>
            

            <div className="GamePlayersContainer">
               
                {
                    PlayersArray.map((playerName,index)=>{
                        //console.log(CharactersArray[index]);
                        return(
                        <div className={`Player PlayerPosition${PositionsIndexArray[index]}`} key={index}>
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
