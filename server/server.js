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
const lib=require("./AuxFunctions");
let PlayersArray = [];
let FinalPlayerArray=[];

io.on('connection',socket=>{
    //console.log("New User");

    socket.on('message',message=>{
        console.log(message)
        socket.broadcast.emit('message',message);
    })

    socket.on('NewUser',Name=>{
        let NewPlayer = new Jucator(Name);
        PlayersArray.push(NewPlayer);
        
        socket.broadcast.emit('NewPlayer',Name);
        socket.emit('NewPlayer',Name);
        
    })

    socket.on('PlayerReady',PlayerName=>{
      console.log(`${PlayerName} is Ready`);
      FinalPlayerArray=lib.startOfGame(PlayersArray);
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


