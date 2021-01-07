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
                //let j=PlayersArray[i];
                //j.setRole(roleArray[i]);
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

function PlayerEliminated(id,playerArray)
{
    let Jucator,JucatorAux;
    Jucator=playerArray.find(Jucator=>Jucator.getId()==id);            
    Jucator.getLeft().setRight(Jucator.getRight());                //connection between left and right of the player are beeing made
    Jucator.getRight().setLeft(Jucator.getLeft());
    JucatorAux=playerArray[0];
    playerArray[0]=Jucator;
    Jucator=JucatorAux;
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
            let Dice=(Math.floor(Math.random()*6)+1);
            DiceArray[i]=Dice;
            if(Dice==4)
            {
                (room.playerArray.find(Player =>Player.getId()==PlayerID)).takeDamage();
            }
            else if(Dice==3)
            {
                (room.playerArray.find(Player =>Player.getId()==PlayerID)).takeArrow();
                room.nrOfArrows--;
                if(room.nrOfArrows==0)
                {
                    room.playerArray.forEach(PlayerWithArrows)
                        let hp=PlayerWithArrows.takeDamageFromArrows();
                    room.nrOfArrows=9;
                }
            }
        }
        else
            DiceArray[i]=diceStates[i];
       
    }
    return DiceArray;
    

}
module.exports={ startOfGame , CreateNameArray, PlayerEliminated,RollDice};


