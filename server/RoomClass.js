const { Jucator } = require('./JucatorClass');

class Room {
    host 
    PlayersArray 
    RoomId
    PlayersReady
    nrOfArrows
    

    constructor(Host){
        this.host = Host;
        this.RoomId = (Math.floor(Math.random() *8999)+1000).toString();
        this.PlayersReady = 0;
        this.PlayersArray = [];
        this.nrOfArrows=9;
        
    }

    AddPlayer(Name,Id){
        let Player = new Jucator(Name,Id);
        this.PlayersArray.push(Player);
    }

    


}


module.exports = {Room}