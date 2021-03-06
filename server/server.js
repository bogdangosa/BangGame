const server = require('express')();
const cors = require('cors');
server.use(cors());

const http = require('http').createServer(server);


const PORT = process.env.PORT || 5000;

const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });


  io.listen(PORT,()=>console.log(`Listening on Port ${PORT}`))


const { Jucator } = require('./JucatorClass');
const { Room } = require('./RoomClass');
const lib = require("./AuxFunctions");
/*let PlayersArray = [];
let FinalPlayerArray=[];*/

let RoomArray = [];


io.on('connection',socket=>{
    //console.log("New User");

    socket.on('message',message=>{
        console.log(message)
        socket.broadcast.emit('message',message);
    })


    socket.on('CreateGame',Name=>{
      //let NewPlayer = new Jucator(Name,socket.id);
      let NewRoom = new Room(socket.id);
      RoomArray.push(NewRoom);

      socket.join(NewRoom.RoomId);
      console.log(socket.id + " now in rooms ", socket.rooms);

      NewRoom.AddPlayer(Name,socket.id);

      let AdminPlayer = NewRoom.PlayersArray.find(Player => Player.getId()==NewRoom.AdminPlayer);
      socket.broadcast.to(NewRoom.RoomId).emit('NewPlayer',Name);
      socket.emit('StartingLobbyData',{room:NewRoom.RoomId,curentPlayersArray:lib.CreateNameArray(NewRoom.PlayersArray),adminplayername:AdminPlayer.getPlayer()});
    })


    socket.on('NewUser',(UserData)=>{
      let cRoom = RoomArray.find(sRoom=> sRoom.RoomId == UserData.room); 
      if(cRoom == null || cRoom.GameInProgress){
        socket.emit('StartingLobbyData',{room:"error",curentPlayersArray:0,adminplayername:"none"});
      }
      else{ 
    
        cRoom.AddPlayer(UserData.name,socket.id);
        socket.join(cRoom.RoomId);


        let AdminPlayer = cRoom.PlayersArray.find(Player => Player.getId()==cRoom.AdminPlayer);

        socket.broadcast.to(cRoom.RoomId).emit('NewPlayer',UserData.name);
        socket.emit('StartingLobbyData',{room:cRoom.RoomId,curentPlayersArray:lib.CreateNameArray(cRoom.PlayersArray),adminplayername:AdminPlayer.getPlayer()});  
      }

    })

    socket.on('PlayerReady',RoomName=>{
      let cRoom = RoomArray.find(sRoom => sRoom.RoomId == RoomName); 
      cRoom.PlayersReady++;


      if(cRoom.PlayersReady == cRoom.PlayersArray.length && cRoom.PlayersReady>=3){

        cRoom.PlayersArray = lib.startOfGame(cRoom.PlayersArray);
        if(cRoom.PlayersArray.length >3){
          let SherifIndex =  cRoom.PlayersArray.findIndex(Player => Player.getRole() == "Sherif")
          cRoom.SherifName = cRoom.PlayersArray[SherifIndex].getPlayer();
        }
        cRoom.PlayerToRollID = cRoom.PlayersArray[0].getId();
        cRoom.GameInProgress = true;
        
        io.to(cRoom.RoomId).emit('GameStarted');
        cRoom.PlayersArray.forEach(Player=>{
          io.to(Player.getId()).emit('sendStartingData',{
            role:Player.getRole(),
            name:Player.getPlayer(),
            playersnamearray: lib.CreateNameArray(cRoom.PlayersArray),
            playerscharacterarray:lib.CreateCharacterArray(cRoom.PlayersArray),
            playersnextarray:lib.CreateNextPlayerArray(cRoom.PlayersArray),
            playersturn: cRoom.PlayersArray[0].getPlayer(),
            room:cRoom.RoomId,
            playersHPArray: lib.CreateHPArray(cRoom.PlayersArray),
            throwsremaining: cRoom.NrOfThrows,
            sherifname: cRoom.SherifName});
          
        })


      }
      //console.log(`${UserData.name} is Ready from ${cRoom.PlayersReady} in room ${cRoom.RoomId}`); 
    })

    socket.on('PlayerNotReady',RoomName=>{
      let cRoom = RoomArray.find(sRoom=> sRoom.RoomId == RoomName); 
      cRoom.PlayersReady--;      
    })

    socket.on('makeAdmin',Data=>{
      let cRoom = RoomArray[RoomArray.findIndex(sRoom => sRoom.RoomId == Data.room)];
      let NewAdminPlayer = cRoom.PlayersArray.find(Player => Player.getPlayer()==Data.newAdminName);
      cRoom.AdminPlayer = NewAdminPlayer.getId();
      io.to(Data.room).emit('updateAdmin',NewAdminPlayer.getPlayer());
    })

    socket.on('kickPlayer',Data=>{
      let cRoom = RoomArray[RoomArray.findIndex(sRoom => sRoom.RoomId == Data.room)];
      let KickedPlayer = cRoom.PlayersArray.find(Player => Player.getPlayer()==Data.playerKicked);
    })

    //receives the PlayerRole of the player to be eliminated, deletes him from array and emits to the rest of players his role
    socket.on('PlayerEliminated',PlayerRole=>
    {
      FinalPlayerArray = PlayerEliminated(socket.id,FinalPlayerArray);
      io.emit('RoleOfDead',PlayerRole);
    })

    socket.on('NextPlayer',RoomName=>{
      let cRoom = RoomArray[RoomArray.findIndex(sRoom=> sRoom.RoomId == RoomName)]; 

      NextTurn(cRoom);
    })


    socket.on('RollDice',Data=>{
      let cRoom = RoomArray[RoomArray.findIndex(sRoom => sRoom.RoomId == Data.room)];
      let DiceArray = Data.diceArray;
      let DiceMeaning=[6,6,6,6,6,6];
      cRoom.NrOfThrows--;
      console.log(cRoom.NrOfThrows);
      if(cRoom.NrOfThrows == 0){
        DiceArray=lib.RollDice(DiceArray,cRoom,socket.id);
        DiceMeaning=lib.DiceMeaning(cRoom);
        console.log(cRoom.DiceResult);//
        console.log(DiceMeaning);
        io.to(Data.room).emit('DiceResult',{result:DiceArray,meaning:DiceMeaning,throwsremaining:cRoom.NrOfThrows});
      }
      else
      {
        console.log(cRoom.DiceResult);//
        DiceArray=lib.RollDice(DiceArray,cRoom,socket.id);
        io.to(Data.room).emit('DiceResult',{result:DiceArray,meaning:DiceMeaning,throwsremaining:cRoom.NrOfThrows});
      }

      let PlayersHP=lib.CreateHPArray(cRoom.PlayersArray);
      PlayersHP.forEach((playerHp,index)=>{
          if(playerHp<=0)
            EliminatePlayer(cRoom,index);
      })
      io.to(cRoom.RoomId).emit('PlayersUpdatedHp',PlayersHP);
      
    })

    socket.on('LeaveRoom',RoomName=>{
      let cRoom = RoomArray[RoomArray.findIndex(sRoom=> sRoom.RoomId == RoomName)]; 

      cRoom.PlayersArray = lib.PlayerEliminated(socket.id , cRoom.PlayersArray,cRoom.GameInProgress);

      socket.leave(RoomName);
      socket.to(RoomName).emit( 'UserLeft' , lib.CreateNameArray(cRoom.PlayersArray) );

    })


    socket.on('HealDamage',data=>{
      let cRoom = RoomArray[RoomArray.findIndex(sRoom=> sRoom.RoomId == data.room)]; 
      let PlayerChangedHP = cRoom.PlayersArray[cRoom.PlayersArray.findIndex(Player=>Player.getPlayer()== data.name)];
      PlayerChangedHP.ChangeHP(data.delta);
      let PlayersHP=lib.CreateHPArray(cRoom.PlayersArray);
      PlayersHP.forEach((HP,index)=>{
        if(HP==0)
          EliminatePlayer(cRoom,index);
      })
      io.to(data.room).emit('PlayersUpdatedHp',PlayersHP);
      //ia damage sau da heal;
      //returneaza hp la toti
    })

    socket.on('PoisonPlayer',data=>{
      io.to(data.room).emit('DrinkOffered',{poison:data.delta,player:data.name});  
    })

    


    socket.on('disconnecting',reason=>{

      socket.rooms.forEach(RoomName=>{

        if(RoomName == socket.id) return;
        
        let cRoom = RoomArray.find(sRoom=> sRoom.RoomId == RoomName); 
        cRoom.PlayersArray = lib.PlayerEliminated(socket.id , cRoom.PlayersArray,cRoom.GameInProgress);
        console.log(cRoom.PlayersArray);

        io.to(cRoom.RoomId).emit('UpdatePlayers',{
          playersnamearray: lib.CreateNameArray(cRoom.PlayersArray),
          playerscharacterarray:lib.CreateCharacterArray(cRoom.PlayersArray),
          playersHPArray: lib.CreateHPArray(cRoom.PlayersArray),
          eliminatedplayer:"to be done"
        });


        socket.leave(RoomName);
        socket.to(RoomName).emit( 'UserLeft' , lib.CreateNameArray(cRoom.PlayersArray) );
      })

      //console.log("User Disconnected");
    })


})



const EliminatePlayer = (cRoom,index)=>{
  let PlayerEliminatedName = cRoom.PlayersArray[index].getPlayer();
  if(cRoom.PlayerToRollID == cRoom.PlayersArray[index].getId())
    NextTurn(cRoom);
  cRoom.PlayersArray = lib.PlayerEliminated(cRoom.PlayersArray[index].getId() , cRoom.PlayersArray,cRoom.GameInProgress);
  PlayersHP = lib.CreateHPArray(cRoom.PlayersArray);
  io.to(cRoom.RoomId).emit('UpdatePlayers',{
    playersnamearray: lib.CreateNameArray(cRoom.PlayersArray),
    playerscharacterarray:lib.CreateCharacterArray(cRoom.PlayersArray),
    playersHPArray: PlayersHP,
    eliminatedplayer:PlayerEliminatedName
  });
  
}

const NextTurn=(cRoom)=>{
        
  cRoom.Turn();
  let PlayersTurnName = cRoom.PlayersArray.find(Player => Player.getId() == cRoom.PlayerToRollID).getPlayer();

  io.to(cRoom.RoomId).emit('PlayersTurn', {playersturnname:PlayersTurnName,throwsremaining:cRoom.NrOfThrows} );
}



//Function testing  

/*
let j=new Jucator("Nugga","Serif");
console.log(j.getPlayer());
console.log(j.getHp());
console.log(j.takeDamage());
console.log(j.takeDamage(4));
console.log(j.heal());
console.log(j.heal(2));
j.takeArrow();
console.log(j.takeDamageFromArrows());*/


