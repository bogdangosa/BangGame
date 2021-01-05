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
const lib = require("./AuxFunctions");
let PlayersArray = [];
let FinalPlayerArray=[];
let PlayersReady = 0;

io.on('connection',socket=>{
    //console.log("New User");

    socket.on('message',message=>{
        console.log(message)
        socket.broadcast.emit('message',message);
    })

    socket.on('NewUser',Name=>{
        //console.log(Name);
        let NewPlayer = new Jucator(Name);
        PlayersArray.push(NewPlayer);
        
        socket.broadcast.emit('NewPlayer',Name);
        socket.emit('CurentPlayers',lib.CreateNameArray(PlayersArray));
        
    })

    socket.on('PlayerReady',PlayerName=>{
      PlayersReady++;
      console.log(PlayersArray.length);
      if(PlayersReady == PlayersArray.length && PlayersReady>=3){
        FinalPlayerArray=lib.startOfGame(PlayersArray);
        FinalPlayerArray.forEach(Player=>{
        
          console.log(Player.getPlayer());
          console.log(Player.getLeft().getPlayer());
          console.log(Player.getRight().getPlayer());
        })
        console.log(FinalPlayerArray);
        io.emit('GameStarted');

      }
      console.log(`${PlayerName} is Ready from ${PlayersReady}`);
      
    })

    socket.on('PlayerNotReady',PlayerName=>{
      PlayersReady--;      
    })

    socket.on('GetRole',PlayerName=>{
      FinalPlayerArray.forEach(FinalPlayer=>{
        if(FinalPlayer.getPlayer()==PlayerName){
          socket.emit('sendRole',FinalPlayer.getRole());
        }
      })
    })

    socket.on('disconnect',reason=>{
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


