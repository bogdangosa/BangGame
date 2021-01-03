const server = require('express')();
const cors = require('cors');

server.use(cors());

const http = require('http').createServer(server);


const PORT = process.env.PORT || 5000;

const io = require('socket.io')(http);


io.listen(PORT,()=>console.log(`Listening on Port ${PORT}`))

io.on('connection',socket=>{
    //console.log("New User");

    socket.on('message',message=>{
        console.log(message)
        socket.broadcast.emit('message',message);
    })

    socket.on('NewUser',Name=>{
        console.log(Name);
    })
})


