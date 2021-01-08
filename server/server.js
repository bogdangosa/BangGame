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

      socket.broadcast.to(NewRoom.RoomId).emit('NewPlayer',Name);
      socket.emit('StartingLobbyData',{room:NewRoom.RoomId,curentPlayersArray:lib.CreateNameArray(NewRoom.PlayersArray)});
    })


    socket.on('NewUser',(UserData)=>{
      let cRoom = RoomArray.find(sRoom=> sRoom.RoomId == UserData.room); 
    
      cRoom.AddPlayer(UserData.name,socket.id);
      socket.join(cRoom.RoomId);


      socket.broadcast.to(cRoom.RoomId).emit('NewPlayer',UserData.name);
      socket.emit('StartingLobbyData',{room:cRoom.RoomId,curentPlayersArray:lib.CreateNameArray(cRoom.PlayersArray)});
        
    })

    socket.on('PlayerReady',RoomName=>{
      let cRoom = RoomArray.find(sRoom => sRoom.RoomId == RoomName); 
      cRoom.PlayersReady++;

      if(cRoom.PlayersReady == cRoom.PlayersArray.length && cRoom.PlayersReady>=3){
        cRoom.PlayersArray = lib.startOfGame(cRoom.PlayersArray);
        
        io.to(cRoom.RoomId).emit('GameStarted');
        cRoom.PlayersArray.forEach(Player=>{
          io.to(Player.getId()).emit('sendStartingData',{role:Player.getRole(),name:Player.getPlayer()});
        })


      }
      //console.log(`${UserData.name} is Ready from ${cRoom.PlayersReady} in room ${cRoom.RoomId}`); 
    })

    socket.on('PlayerNotReady',RoomName=>{
      let cRoom = RoomArray.find(sRoom=> sRoom.RoomId == RoomName); 
      cRoom.PlayersReady--;      
    })


    //receives the PlayerRole of the player to be eliminated, deletes him from array and emits to the rest of players his role
    socket.on('PlayerEliminated',PlayerRole=>
    {
      FinalPlayerArray = PlayerEliminated(socket.id,FinalPlayerArray);
      io.emit('RoleOfDead',PlayerRole);
    })


    socket.on('disconnecting',reason=>{

      socket.rooms.forEach(RoomName=>{
        if(RoomName == socket.id) return;
        
        let cRoom = RoomArray.find(sRoom=> sRoom.RoomId == RoomName); 
        cRoom.PlayersArray = lib.PlayerEliminated(socket.id , cRoom.PlayersArray);

        socket.leave(RoomName);
        socket.to(RoomName).emit( 'UserLeft' , lib.CreateNameArray(cRoom.PlayersArray) );
      })

      console.log("User Disconnected");
      //PlayersArray.pop();
      //io.emit('PlayersArray',PlayersArray);
    })


})





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


