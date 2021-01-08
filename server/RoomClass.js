const { Jucator } = require('./JucatorClass');

class Room {
    host 
    PlayersArray 
    RoomId
    PlayersReady
    nrOfArrows
    Characters=["Lucky Duke","Willy The Kid","Slab The Killer","Sid Ketchum","Vulture Sam","Jourdonnais","Paul Regret","Kit Carlson","Bart Cassidy","Calamity Janet",
"Suzy Lafayette","Rose Doolan","Pedro Ramirez","Black Jack","Jesse Jones","El Gringo"]
    DiceResult
    PlayerToRollID
    

    constructor(Host){
        this.host = Host;
        this.RoomId = (Math.floor(Math.random() *8999)+1000).toString();
        this.PlayersReady = 0;
        this.PlayersArray = [];
        this.nrOfArrows = 9;
        this.PlayerToRollID = this.PlayersArray[0].getId();
        
    }

    AddPlayer(Name,Id){
        let Player = new Jucator(Name,Id);
        let ch=Math.floor(Math.random() *15);
        Player.setCharacter(this.Characters[ch]);
        let chAux=this.Characters[ch];
        this.Characters[ch]=this.Characters[0];
        this.Characters[0]=chAux;
        this.Characters.shift();
        this.PlayersArray.push(Player);
    }

    Turn()
    {
        this.PlayerToRollID=PlayerArray[this.PlayersArray.findIndex(Player=>Player.getId()==PlayerToRollID)].getLeft().getId();
    }
    


}


module.exports = {Room}