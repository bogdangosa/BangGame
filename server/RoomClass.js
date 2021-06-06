const { Jucator } = require('./JucatorClass');

class Room {
    host 
    PlayersArray 
    RoomId
    PlayersReady
    Characters=["Jesse Jones","Jourdonnais","Willy The Kid","Black Jack","Slab The Killer","Sid Ketchum","Lucky Duke","Vulture Sam","Paul Regret","Kit Carlson","Bart Cassidy","Calamity Janet",
"Suzy Lafayette","Rose Doolan","Pedro Ramirez","El Gringo"]
    DiceResult
    NrOfThrows
    PlayerToRollID
    SherifName
    GameInProgress
    rivalClans
    
    

    constructor(Host){
        this.host = Host;
        this.RoomId = (Math.floor(Math.random() *8999)+1000).toString();
        this.PlayersReady = 0;
        this.PlayersArray = [];
        this.nrOfArrows = 9;
        //this.PlayerToRollID = this.PlayersArray[0].getId();
        this.NrOfThrows=3;
        this.GameInProgress=false;
        this.DiceResult=[0,0,0,0,0]
        this.rivalClans=[0,0,0,0,0]
        
    }

    
    AddPlayer(Name,Id){
        let Player = new Jucator(Name,Id);
        /*
        let ch=Math.floor(Math.random() *15);
        Player.setCharacter(this.Characters[ch]);
        let chAux=this.Characters[ch];
        this.Characters[ch]=this.Characters[0];
        this.Characters[0]=chAux;*/
        Player.setCharacter(this.Characters[0]);   //for testing
        this.Characters.shift();
        this.PlayersArray.push(Player);
    }

    Turn()
    {
        if(this.PlayersArray[this.PlayersArray.findIndex(Player=>Player.getId()==this.PlayerToRollID)].getLeft().getCharacter()=="Lucky Duke")
            this.NrOfThrows=4
        else
            this.NrOfThrows=3;
        this.PlayerToRollID = this.PlayersArray[this.PlayersArray.findIndex(Player=>Player.getId()==this.PlayerToRollID)].getLeft().getId();
        this.DiceResult=[0,0,0,0,0]    
    }
    


}


module.exports = {Room}