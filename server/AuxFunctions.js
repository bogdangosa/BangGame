function startOfGame(PlayersArray)
{
    Arrows=9;
    let n=PlayersArray.length
    var PlayerArray1=[];
    var RoleArray=[]
    const { Jucator } = require('./JucatorClass');
    switch(n)
    {
        case 3:
            roleArray=["Bandit","Outlaw","Deputee"];
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
            return PlayerArray1;
            break;
    }

}

module.exports={startOfGame};