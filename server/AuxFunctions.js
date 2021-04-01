/*const server = require('express')();
const cors = require('cors');
server.use(cors());

const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
*/
function startOfGame(PlayersArray)
{
    Arrows=9;
    let n=PlayersArray.length
    const { Jucator } = require('./JucatorClass');
    const { Room } = require('./RoomClass');

    var PlayerArray1 = [];
    var RoleArray = [];

    switch(n)
    {
        case 3:
            roleArray=["Bandit","Outlaw","Deputee"];
            break;
        case 4:
            roleArray=["Bandit","Outlaw","Sherif","Deputee"];
            break;
        case 5:
            roleArray=["Bandit","Outlaw","Deputee","Bandit","Sherif"];
            break;
        case 6:
            roleArray=["Bandit","Outlaw","Deputee","Bandit","Sherif","Deputee"];
            break;
        case 7:
            roleArray=["Bandit","Outlaw","Deputee","Bandit","Sherif","Deputee","Bandit"];
            break;
        case 8:
            roleArray=["Bandit","Outlaw","Deputee","Bandit","Sherif","Deputee","Bandit","Outlaw"];
            break;
    }
    while(n)
            {
                let p=Math.floor(Math.random()*n);
                PlayerArray1.push(PlayersArray[p]);
                let aux=PlayersArray[p];
                PlayersArray[p]=PlayersArray[n-1];
                PlayersArray[n-1]=aux;
                PlayersArray.pop()
                n--;
            }
            for(let i=0;i<PlayerArray1.length;i++)
            {
                PlayerArray1[i].setRole(roleArray[i]);
            }
            
    for(let i=0;i<PlayerArray1.length-1;i++)
    {
        PlayerArray1[i].setRight(PlayerArray1[i+1]);
    }

    for(let i=PlayerArray1.length-1;i>0;i--)
    {
        PlayerArray1[i].setLeft(PlayerArray1[i-1]);
    }
    PlayerArray1[0].setLeft(PlayerArray1[PlayerArray1.length-1]);
    PlayerArray1[PlayerArray1.length-1].setRight(PlayerArray1[0]);
    return PlayerArray1;


}

function CreateNameArray(PlayersArray){
    const { Jucator } = require('./JucatorClass');
    let NameArray = [];
    PlayersArray.forEach(Player => {
        NameArray.push(Player.getPlayer());
    });
    return NameArray;
}

function CreateRoleArray(PlayersArray){
    const { Jucator } = require('./JucatorClass');
    let RoleArray = [];
    PlayersArray.forEach(Player => {
        NameArray.push(Player.getPlayer());
    });
    return NameArray;
}

function CreateNextPlayerArray(PlayersArray){
    const { Jucator } = require('./JucatorClass');
    let NextPlayerArray = [];
    PlayersArray.forEach(Player => {
        NextPlayerArray.push(Player.getLeft().getPlayer());
    });
    return NextPlayerArray;
}


function CreateCharacterArray(PlayersArray){
    const { Jucator } = require('./JucatorClass');
    let CharacterArray = [];
    PlayersArray.forEach(Player => {
        CharacterArray.push(Player.getCharacter());
    });
    return CharacterArray;
}

function CreateHPArray(PlayersArray){
    const { Jucator } = require('./JucatorClass');
    let HPArray = [];
    PlayersArray.forEach(Player => {
        HPArray.push(Player.getHp());
    });
    return HPArray;
}

function PlayerEliminated(id,playerArray)
{
    let JucatorI,JucatorAux;
    JucatorI=playerArray.findIndex(Jucator=>Jucator.getId()==id);  
    playerArray[JucatorI].getLeft().setRight(playerArray[JucatorI].getRight());                //connection between left and right of the player are beeing made
    playerArray[JucatorI].getRight().setLeft(playerArray[JucatorI].getLeft());
    JucatorAux=playerArray[0];
    playerArray[0]=playerArray[JucatorI];
    playerArray[JucatorI]=JucatorAux;
    playerArray.shift();
    return playerArray;
}

function RollDice(diceStates,room,PlayerID)
{
    //diceState=0 =>free
    //diceState=number =>blocked

    /*
    1=Cutit
    2=Pistol
    3=Sageata
    4=Dinamita
    5=Bere
    6=gatling
    */
    const { Jucator } = require('./JucatorClass');
    const { Room } = require('./RoomClass');
    let DiceArray=[];
    for (let i=0;i<diceStates.length;i++)
    {
        if(diceStates[i]==0)
        {
            if(room.DiceResult[i]==0)
            {
                let Dice=(Math.floor(Math.random()*6)+1);
                DiceArray[i]=Dice;
                if(Dice==4)
                {
                    room.PlayersArray[room.PlayersArray.findIndex(Player =>Player.getId()==PlayerID)].ChangeHP(-1);
                    room.DiceResult[i]=4;
                    //let PlayersHP=CreateHPArray(room.PlayersArray);
                    //io.to(room.RoomId).emit('PlayersUpdatedHp',PlayersHP);
                }
                else if(Dice==3)
                {
                    /*room.PlayersArray[room.PlayersArray.findIndex(Player =>Player.getId()==PlayerID)].takeArrow();
                    room.nrOfArrows--;
                    if(room.nrOfArrows==0)
                    {
                        room.PlayersArray.forEach(PlayerWithArrows=>{
                            let hp=PlayerWithArrows.takeDamageFromArrows();
                        })
                        room.nrOfArrows=9; 
                    }*/
                }
            }
            else
            {
                DiceArray[i]=room.DiceResult[i];
            }
        }
        else
        {
            if(room.DiceResult[i]==0)
            {
                room.DiceResult[i]=diceStates[i];
                DiceArray[i]=diceStates[i];
            }
            else
            {
                DiceArray[i]=room.DiceResult[i];
            }
        }
       
    }
    if(room.NrOfThrows==0)
    {
        room.DiceResult=DiceArray;
    }
    return DiceArray;
    

}

/*
this function takes a dice array of 5 and returns an result array of 4:
ResultArray[0]=amount of shots the player needs to take next to him
ResultArray[1]=amount of shots the player needs to take 2 seats away from him
ResultArray[2]=amount of heal the player needs to give
ResultArray[4]=amount of damage each player takes due gatling
*/
function DiceMeaning(Room)
{
    let ResultArray=[0,0,0,0,0,0];
    let NrOfGatling;
    for(let i=0;i<Room.DiceResult.length;i++)
    {
        switch(Room.DiceResult[i])
        {
            case 1:
                ResultArray[0]++;
            break;
            case 2:
                ResultArray[1]++;
            break;
            case 3:
                ResultArray[2]++;
            break;
            case 4:
                ResultArray[3]++;
            break;
            case 5:
                ResultArray[4]++;
            break;
            case 6:
                NrOfGatling++;
                if(NrOfGatling==3)
                    ResultArray[5]++;
            break;
        }
    }
    return ResultArray;
}

function IsGameOver(Room)
{
    //checks how many players of each role are alive
    //if one of the win condition is fullfilled, an array of winning players ID is returned
    
    let SherifAlive=0;
    let BanditAlive=0;
    let DeputeeAlive=0;
    let OutlawAlive=0;
    let SherifArray;
    let BanditArray;
    let OutlawArray;
    for(let i=0;i<=Room.PlayersArray.length;i++)
    {
        if(Room.PlayersArray[i].getRole()=="Sherif")
        {
            SherifAlive++;
            SherifArray.push(Room.PlayersArray[i].getId());
        }
        if(AuxPlayerArray[i].getRole()=="Outlaw")
        {
            OutlawAlive++;
            OutlawArray.push(Room.PlayersArray[i].getId());
        }
        if(AuxPlayerArray[i].getRole()=="Bandit")
        {
            BanditAlive++;
            BanditArray.push(Room.PlayersArray[i].getId());
        }
        if(AuxPlayerArray[i].getRole()=="Deputee")
        {
            DeputeeAlive++;
            DeputeeArray.push(Room.PlayersArray[i].getId());
        }
    }
    if(SherifAlive==0)
        return BanditArray;
    else if(BanditAlive==0&&OutlawAlive==0)
    {
        return SherifArray;
    }
    else if(OutlawAlive==1&&BanditAlive==0&&DeputeeAlive==0&&SherifAlive==0)
    {
        return OutlawArray;
    }
    else
        return [];
}
module.exports={ startOfGame , CreateNameArray, PlayerEliminated,RollDice,DiceMeaning , CreateNextPlayerArray , CreateCharacterArray , CreateHPArray,IsGameOver};


