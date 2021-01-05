function startOfGame(PlayersArray)
{
    Arrows=9;
    let n=PlayersArray.length
    const { Jucator } = require('./JucatorClass');
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


module.exports={ startOfGame , CreateNameArray };


