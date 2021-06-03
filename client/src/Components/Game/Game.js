import React,{ useState, useEffect } from 'react'
import './Game.css'
import Button from '../Button/Button'
import Dice from '../Dice/Dice'

const Game = (props)=>{
    const [ThrowsRemaining,SetThrowsRemaining] = useState('');
    const [CurentPlayerRole,SetCurentPlayerRole] = useState('');
    const [CurentPlayerName,SetCurentPlayerName] = useState('');
    const [CurentPlayerCharacter,SetCurentPlayerCharacter] = useState('');
    const [PlayersTurn,setPlayersTurn] = useState('');
    const [SherifName,setSherifName] = useState('');
    const [CurentPlayerHP,setCurentPlayerHP] =useState(0);
    const [SpectatorMode,setSpectatorMode] = useState(false);
    const [PlayerDied,setPlayerDied] = useState(false);

    const [PlayerDrinker,setPlayerDrinker]=useState('');
    const [Poison,setPoison]=useState();

    const [PlayersArray,setPlayersArray] = useState([]);
    const [CharactersArray,setCharactersArray] = useState([]);
    const [HPArray,setHPArray] = useState([]);
    const [CurentIndex,SetCurentIndex] = useState(0);

    const [DiceValues,SetDiceValues] = useState([0,0,0,0,0]);
    const [DiceMeaning,SetDiceMeaning] = useState([6,6,6,6,6]);
    const [SelectedDices,SetSelectedDices] = useState([false,false,false,false,false]);

    const [RoomId,SetRoomId]= useState('error');

    const[ActionState,setActionState] = useState(false);

    let socket = props.socket;


    //On Mount
    useEffect(()=>{
        socket.on('sendStartingData',data=>{
            SetStartingData(data);
            socket.removeAllListeners("sendStartingData");
        })


        socket.on('PlayersTurn',data=>{
            let PlayersTurnName = data.playersturnname;
            console.log(PlayersTurnName);
            setPlayersTurn(PlayersTurnName);
            SetDiceValues([0,0,0,0,0]);
            SetSelectedDices([false,false,false,false,false]);
            SetThrowsRemaining(data.throwsremaining);
            setActionState(false);
        });

        socket.on('DiceResult',DiceRoll=>{
            console.log(DiceRoll);
            console.log(SelectedDices);
            SetThrowsRemaining(DiceRoll.throwsremaining);

            if(DiceRoll.throwsremaining==0){
                SetDiceMeaning(DiceRoll.meaning);
                setActionState(true);
            }

            let AuxDiceArray = [];

            DiceRoll.result.forEach(DiceValue => {
                AuxDiceArray.push(DiceValue);
            });

            //LockDice(1);

            SetDiceValues(AuxDiceArray);

        });

        socket.on('PlayersUpdatedHp',PlayersHP=>{
            setHPArray(PlayersHP);
            setCurentPlayerHP(PlayersHP[CurentIndex]);

        })

        socket.on('UpdatePlayers', data =>{
            console.log(data.playersnamearray);
            setPlayersArray(data.playersnamearray);
            setCharactersArray(data.playerscharacterarray);
            setHPArray(data.playersHPArray);
            console.log(data.eliminatedplayer);
            if(data.eliminatedplayer == CurentPlayerName)
                setPlayerDied(true);
        });

        socket.on('DrinkOffered',data =>{
            setPlayerDrinker(data.player);
            setPoison(data.poison);
        })
        
    },[]);


    const SetStartingData = (data) =>{
        SetRoomId(data.room);
        SetCurentPlayerRole(data.role);
        SetCurentPlayerName(data.name);
        SetThrowsRemaining(data.throwsremaining);
        setSherifName(data.sherifname);
        console.log(data.sherifname);
        let cIndex = data.playersnamearray.findIndex(PlayerName => PlayerName == data.name);
        SetCurentIndex(cIndex);
        SetCurentPlayerCharacter(data.playerscharacterarray[cIndex]);
        setCurentPlayerHP(data.playersHPArray[cIndex]);
        setPlayersArray(data.playersnamearray);
        setCharactersArray(data.playerscharacterarray);
        setHPArray(data.playersHPArray);
        setPlayersTurn(data.playersturn);
    }



    const RollDice = () =>{

        if(ThrowsRemaining == 0){
            setActionState(true);
            
        }
        
        if(CurentPlayerName != PlayersTurn || ThrowsRemaining == 0) return;

        

        
        let AuxDiceValues = [];
        DiceValues.forEach( (DiceValue,Index) => {
            if(SelectedDices[Index])
                AuxDiceValues.push(DiceValue);
            else
                AuxDiceValues.push(0);
        });

        

        socket.emit('RollDice',{room:RoomId,diceArray:AuxDiceValues});

        if(ThrowsRemaining == 0){
            setActionState(true);

        }

    }


    
    const NextPlayer = () =>{
        if(CurentPlayerName != PlayersTurn) return;
        socket.emit('NextPlayer',RoomId);
        //SetDiceValues([{value:0,selected:false},{value:0,selected:false},{value:0,selected:false},{value:0,selected:false},{value:0,selected:false}]);
        //setPlayersTurn(PlayersArray[0]); //To be fixed
        
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

            case 'Pedro Ramirez':
                return require('../CharacterImages/PedroRamirez.jpg').default
                break;

            case 'Black Jack':
                return require('../CharacterImages/BlackJack.jpg').default
                break;

            case 'Jesse Jones':
                return require('../CharacterImages/JesseJones.jpg').default
                break

            case 'El Gringo':
                return require('../CharacterImages/ElGringo.jpg').default
                break;

            default:
                return require('../CharacterImages/LuckyDuke.jpg').default
                break;
        }
    }

    const LockDice = (DiceIndex) =>{
        if(CurentPlayerName != PlayersTurn)return;
        let AuxSelectedDices = [];
        console.log("Locking dice " + DiceIndex);
        
        SelectedDices.forEach((SelectedDice,index)=>{
            if(index==DiceIndex)
                AuxSelectedDices.push(!SelectedDice);
            else
                AuxSelectedDices.push(SelectedDice);
        })
        
        console.log(AuxSelectedDices);

        SetSelectedDices(AuxSelectedDices);
     }

    const LockAllDices = () =>{
        setActionState(true);
        socket.emit('RollDice',{room:RoomId,diceArray:DiceValues});
    }


    const HealDamage =(PlayerName,Delta)=>{
        
        let AuxDiceMeaning = DiceMeaning;
        switch(Delta)
        {
        case 0:
            AuxDiceMeaning[0]--;
            SetDiceMeaning(AuxDiceMeaning);
            socket.emit("HealDamage",{name:PlayerName,delta:-1,room:RoomId});
            break;
        case 1:
            AuxDiceMeaning[1]--;
            SetDiceMeaning(AuxDiceMeaning);
            socket.emit("HealDamage",{name:PlayerName,delta:-1,room:RoomId});
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:  
            AuxDiceMeaning[4]--;
            SetDiceMeaning(AuxDiceMeaning);
            socket.emit("PoisonPlayer",{name:PlayerName,delta:1,room:RoomId});
            break;
        case -4:
            AuxDiceMeaning[4]--;
            SetDiceMeaning(AuxDiceMeaning);
            socket.emit("PoisonPlayer",{name:PlayerName,delta:-1,room:RoomId});
            break;
        case 5:
            AuxDiceMeaning[5]--;
            SetDiceMeaning(AuxDiceMeaning);
            socket.emit("HealDamage",{name:PlayerName,delta:0.5,room:RoomId});
            break;
        }
        if(JSON.stringify(AuxDiceMeaning)==JSON.stringify([0,0,0,0,0,0]))    //the only way it works to compare 2 array fast
            NextPlayer();
    }

    const BackToLobby =()=>{

    }
    const ContinueSpectating = () =>{

    }

  
    return(
        <div className="Game">
            <div className="CurentPlayerInfo">
                <img src={CharacterPhoto(CurentPlayerCharacter)} className="CurentPlayerImage"></img>
                <div className="CurentPlayerNameRoleContainer">
                    <p className="CurentPlayerName">{CurentPlayerName}</p>
                    <p className="CurentPlayerRole">{CurentPlayerRole}</p>
                </div>
                <p className="CurentPlayerHP">HP: {CurentPlayerHP}</p>
                
            </div>

            <Button Text="Roll Dice" className="RollDiceButton" onClick={ ()=>RollDice() } Selected={CurentPlayerName != PlayersTurn || ThrowsRemaining == 0}/>
            <Button Text="Next Player" className="NextPlayerButton" onClick={ ()=>NextPlayer() } Selected={ CurentPlayerName != PlayersTurn || (ThrowsRemaining!=0)}/>
            

            <p className="ThrowsRemaining">Throws Remaining: {ThrowsRemaining}</p>

            <div className="DicesContainer">
                <Dice value={DiceValues[0]} onClick={()=>LockDice(0)} Selected={SelectedDices[0]} Index={0}/>
                <Dice value={DiceValues[1]} onClick={()=>LockDice(1)} Selected={SelectedDices[1]} Index={1}/>
                <Dice value={DiceValues[2]} onClick={()=>LockDice(2)} Selected={SelectedDices[2]} Index={2}/>
                <Dice value={DiceValues[3]} onClick={()=>LockDice(3)} Selected={SelectedDices[3]} Index={3}/>
                <Dice value={DiceValues[4]} onClick={()=>LockDice(4)} Selected={SelectedDices[4]} Index={4}/>
                
                {/*
                    DiceValues.map((DiceValue,DiceIndex)=>{
                        return(
                            <Dice value={DiceValue.value} onClick={()=>LockDice(DiceIndex)} Selected={DiceValue.selected} Index={DiceIndex}/>
                        )
                    })*/
                }
            </div>

            {CurentPlayerName == PlayersTurn ?  <Button Text="Lock Dices" className="LockDicesButton" onClick={ ()=>LockAllDices() } Selected={false}/>
            : <div></div>}
            

            <div className="GamePlayersContainer">
               
                {
                    PlayersArray.map((playerName,index)=>{
                        return(
                        <div className="Player" key={index}>
                            <img src={CharacterPhoto(CharactersArray[index])}></img>
                            <p className={playerName == PlayersTurn ? "Bold":""}>{playerName == SherifName ? playerName+" <^>" : playerName}</p>
                            <p className="HP">HP:{HPArray[index]}</p> 

                            { (PlayersTurn == CurentPlayerName) && (ActionState && DiceMeaning[5]>0) && (playerName != CurentPlayerName) ? <p className="HealDamageButton" onClick={()=>HealDamage(playerName,5)}>Half</p> : <></> }
                            { (PlayersTurn == CurentPlayerName) && (ActionState && DiceMeaning[4]>0) ?  <p className="HealDamageButton" onClick={()=>{HealDamage(playerName,-4) }}>Poison</p> :<></>}
                            { (PlayersTurn == CurentPlayerName) && (ActionState && DiceMeaning[4]>0) ?  <p className="HealDamageButton" onClick={()=>{HealDamage(playerName,4)}}>Heal</p> :<></>}


                            { (CurentPlayerCharacter != 'Rose Doolan') && (CurentPlayerCharacter != 'Calamity Janet') && (PlayersTurn == CurentPlayerName) && (ActionState && DiceMeaning[0]>0) &&
                            (
                                playerName == PlayersArray[CurentIndex+1] ||
                                playerName == PlayersArray[CurentIndex-1] ||
                                (CurentIndex==0&&playerName==PlayersArray[PlayersArray.length-1]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[0])
                            )? <p className="HealDamageButton" onClick={()=>HealDamage(playerName,0)}>Cutit</p> : <></> }


                            { (CurentPlayerCharacter != 'Rose Doolan') && (CurentPlayerCharacter != 'Calamity Janet') && (PlayersTurn == CurentPlayerName) && (ActionState && DiceMeaning[1]>0) &&
                            (
                                playerName == PlayersArray[CurentIndex+2] ||
                                playerName == PlayersArray[CurentIndex-2] ||
                                (CurentIndex==0&&playerName==PlayersArray[PlayersArray.length-2]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[1])
                            )? <p className="HealDamageButton" onClick={()=>HealDamage(playerName,1)}>Pistol</p> : <></> }
                            
                            

                            {(CurentPlayerCharacter== 'Calamity Janet')&&(PlayersTurn == CurentPlayerName) && (ActionState && DiceMeaning[0]>0) && 
                            (
                                playerName == PlayersArray[CurentIndex+2] || 
                                playerName == PlayersArray[CurentIndex-2] ||
                                (CurentIndex==0&&playerName==PlayersArray[PlayersArray.length-2]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[1]) ||
                                playerName == PlayersArray[CurentIndex+1] || 
                                playerName == PlayersArray[CurentIndex-1] ||
                                (CurentIndex==0 && playerName==PlayersArray[PlayersArray.length-1]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[0])
                            )? <p className="HealDamageButton" onClick={()=>HealDamage(playerName,0)}>Damage</p> : <></> }


                            {(CurentPlayerCharacter== 'Calamity Janet')&&(PlayersTurn == CurentPlayerName) && (ActionState && DiceMeaning[1]>0) && 
                            (
                                playerName == PlayersArray[CurentIndex+2] || 
                                playerName == PlayersArray[CurentIndex-2] ||
                                (CurentIndex==0&&playerName==PlayersArray[PlayersArray.length-2]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[1]) ||
                                playerName == PlayersArray[CurentIndex+1] || 
                                playerName == PlayersArray[CurentIndex-1] ||
                                (CurentIndex==0 && playerName==PlayersArray[PlayersArray.length-1]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[0])
                            )? <p className="HealDamageButton" onClick={()=>HealDamage(playerName,1)}>Damage</p> : <></> }

                            {(CurentPlayerCharacter== 'Rose Doolan')&&(PlayersTurn == CurentPlayerName) && (ActionState && DiceMeaning[0]>0) && 
                            (
                                playerName == PlayersArray[CurentIndex+2] || 
                                playerName == PlayersArray[CurentIndex-2] ||
                                (CurentIndex==0&&playerName==PlayersArray[PlayersArray.length-2]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[1]) ||
                                playerName == PlayersArray[CurentIndex+1] || 
                                playerName == PlayersArray[CurentIndex-1] ||
                                (CurentIndex==0 && playerName==PlayersArray[PlayersArray.length-1]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[0]) ||
                                playerName == PlayersArray[CurentIndex+3] || 
                                playerName == PlayersArray[CurentIndex-3] ||
                                (CurentIndex==0 && playerName==PlayersArray[PlayersArray.length-3]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[2])
                            )? <p className="HealDamageButton" onClick={()=>HealDamage(playerName,0)}>Damage</p> : <></> }


                            {(CurentPlayerCharacter== 'Rose Doolan')&&(PlayersTurn == CurentPlayerName) && (ActionState && DiceMeaning[1]>0) && 
                            (
                                playerName == PlayersArray[CurentIndex+2] || 
                                playerName == PlayersArray[CurentIndex-2] ||
                                (CurentIndex==0&&playerName==PlayersArray[PlayersArray.length-2]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[1]) ||
                                playerName == PlayersArray[CurentIndex+1] || 
                                playerName == PlayersArray[CurentIndex-1] ||
                                (CurentIndex==0 && playerName==PlayersArray[PlayersArray.length-1]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[0]) ||
                                playerName == PlayersArray[CurentIndex+3] || 
                                playerName == PlayersArray[CurentIndex-3] ||
                                (CurentIndex==0 && playerName==PlayersArray[PlayersArray.length-3]) ||
                                (CurentIndex==PlayersArray.length-1&&playerName==PlayersArray[2])
                            )? <p className="HealDamageButton" onClick={()=>HealDamage(playerName,1)}>Damage</p> : <></> }
                            
                            
                        </div>
                        );
                    })
                }

            </div>

            {PlayerDied ?
                <div className="PlayerDiedPopup">
                       <p>You Died</p>
                       <Button Text="Back to Lobby" onClick={ ()=>BackToLobby() } Selected={false}/>
                       <Button Text="Continue Spectating" onClick={ ()=>ContinueSpectating() } Selected={false}/>

                </div>

                :
                
                      
                <div></div> 

            }

            
            
            {(CurentPlayerName == PlayerDrinker) ?
                <div className="PlayerDiedPopup">  
                    <p>Someone ordered you a drink</p> 
                    <Button Text="Accept" className="HealDamageButton" onClick={ ()=> {
                        socket.emit("HealDamage",{name:CurentPlayerName,delta:Poison,room:RoomId});
                        setPoison(0);
                        setPlayerDrinker(''); 
                    }}Selected={false}/>
                    <Button Text="Decline" className="HealDamageButton" onClick={ ()=> {
                        setPoison(0);
                        setPlayerDrinker('');
                    }}Selected={false}/>
                    
                </div>    
            : <div></div>
            }
            
        </div>
    )
}

export default Game;
