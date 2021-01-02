const { Socket } = require('dgram');

const server = require('express')();

const http = require('http').createServer(server);

const PORT = process.env.PORT || 5000;

const io = require('socket.io')(http);

io.on('connection',socket=>{
    console.log("New user");
})

server.listen(PORT,()=>console.log(`Listening on Port ${PORT}`))
