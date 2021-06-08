import React,{ useState , useEffect } from 'react'
import Button from '../Button/Button';
import './Lobby.css'
import CharacterPhoto from '../CharacterImages/BlackJack.jpg'
import { useHistory } from "react-router-dom";

const Lobby = (props)=> {
    const [playersArray,SetPlayersArray] = useState([]);
    const [ReadyState,SetReadyState] = useState(false);
    const [CurentPlayersName,setCurentPlayersName]= useState('');
    const [AdminPlayerName,setAdminPlayersName]= useState('');
    const [RoomId,SetRoomId]= useState('');
    const [IsError,SetIsError] = useState(false);

    let socket = props.socket;

    const history = useHistory();


    socket.on('NewPlayer',NewPlayer=>{
        //console.log(playersArray);
        SetPlayersArray([...playersArray,NewPlayer]);    
        //console.log(NewPlayer);
    })

    socket.on('StartingLobbyData',StartingLobbyData=>{
        if(StartingLobbyData.room == "error"){
            SetIsError(true);
        }
        else{
            SetRoomId(StartingLobbyData.room);
            let CurentPlayersArray = StartingLobbyData.curentPlayersArray;

            setCurentPlayersName(CurentPlayersArray[CurentPlayersArray.length-1]);
            setAdminPlayersName(StartingLobbyData.adminplayername);
            console.log(StartingLobbyData.adminplayername);
            SetPlayersArray(CurentPlayersArray);
        }
    });
    

    socket.on('GameStarted',()=>{
        console.log("Game Started");
        //socket.emit('GetRole',CurentPlayersName);
        socket.removeAllListeners("GameStarted");
        history.push("/Game");
    })

    socket.on('UserLeft', rPlayersArray=>{
        SetPlayersArray(rPlayersArray);
    })

    socket.on('updateAdmin',newAdmin=>{
        setAdminPlayersName(newAdmin);
    })

        
    const PlayerReady = ()=> {
        if(!ReadyState){
            console.log(CurentPlayersName);
            socket.emit('PlayerReady',RoomId);
            SetReadyState(true);
        }
        else {
            socket.emit('PlayerNotReady',RoomId);
            SetReadyState(false);
        }

    }

    const GoBack = ()=>{
        history.push("/");
    }

    const LeaveRoom =() =>{
        socket.emit('LeaveRoom',RoomId);
        history.push("/");
    }

    const makeAdmin = (newadminname) => {
        socket.emit('makeAdmin',{room:RoomId,newAdminName:newadminname})
    }

    const kickPlayer = (playerKicked) => {
        socket.emit('kickPlayer',{room:RoomId,playerKicked:playerKicked})
    }



    return (
        <div className="Lobby">
            {
            IsError?        
            <div className="ErrorContainer">
                <p>Sorry, the lobby you are trying to join doesn't exist</p>
                <Button Text="Back" Selected={ReadyState} onClick={()=>GoBack()}/>
            </div>
            :
            <>
                <p className="LobbyCode">room code:{RoomId}</p>
                <div className="PlayersContainer">
                    {
                        playersArray.map((player,index)=>{
                            return (
                                <div className={player==AdminPlayerName ? "PlayerContainer PlayerContainerAdmin": "PlayerContainer"} key={index}>
                                    <img src={CharacterPhoto}></img>
                                    <p className="PlayerName">{player}</p>
                                    {(CurentPlayersName==AdminPlayerName && player!=AdminPlayerName) ?
                                    <div className="LobbyPlayerButtonContainer">
                                       <Button Text="make Admin" Selected={false} onClick={()=>makeAdmin(player)}></Button>
                                       <Button Text="kick Player" Selected={false} onClick={()=>kickPlayer(player)}></Button>
                                    </div>
                                    :<div></div>}
                                </div>
                            );
                        })
                    }

                </div>
                <div className="LobbyButons">
                    <Button Text="Leave" className={"LeaveButton"} onClick={()=>LeaveRoom()} Selected={false} />   
                    <Button Text="Ready" className={"ReadyButton"} onClick={()=>PlayerReady()} Selected={ReadyState} />
                </div>
            </>


        }
        </div>
    )
}

export default Lobby;
