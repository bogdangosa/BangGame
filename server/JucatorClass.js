class Jucator
{

    /*

    player-name of the player that control the character
    hp-hitpoints/health
    role-role of the player:sherif/bandit/outlaw
    nrOfArrows- number of arrows the player has taken
    #right and #left are the players sitting to the right or left to the player
    */

    //declaration of "private" variables 
    #id;
    #player;
    #role;
    #hp;
    #hpMax;
    #character;
    #left;
    #right;
    

    constructor(player,id)
    {
        this.#id=id;
        this.#player=player;
        this.#hp=8;
        this.#hpMax=8;
    }
    

    //the player takes damage equal to damageAmount
    ChangeHP(Amount)
    {
        if(Amount<1 && Amount>0 &&this.#character=='Paul Regret')
            this.#hp=Math.trunc(this.#hp*0.7);
        else if(Amount<1 && Amount>0 )
            this.#hp=Math.trunc(this.#hp*Amount);
        else if(this.#hp < this.#hpMax || Amount < 0) 
            this.#hp=this.#hp+Amount;    
        return this.#hp;
    }

    getId()
    {
        return this.#id;
    }

    //returns the hp of the player
    getHp()
    {
        return this.#hp;
    }

    //returns the name of the player
    getPlayer()
    {
        return this.#player;
    }

    //returns role of the player
    getRole()
    {
        return this.#role;
    }

    //returns number of arrows

    setRole(role)
    {
        this.#role=role;
        if(role=="Sherif")
        {
            this.#hpMax=this.#hpMax+2;
            this.#hp=this.#hp + 2;
        }
    }

    getRight()
    {
        return this.#right;
    }

    setRight(right)
    {
        this.#right=right;
    }

    getLeft()
    {
        return this.#left;
    }

    setLeft(left)
    {
        this.#left=left;
    }

    setCharacter(c)
    {
        this.#character=c;
        switch(c)
        {
            case "Paul Regret":
                this.#hpMax=this.#hpMax + 1;
                this.#hp=this.#hp + 1;
                break;
            case "Jourdonnais":
                this.#hpMax=this.#hpMax - 1;
                this.#hp=this.#hp - 1;
                break;
            case "Rose Doolan":
                this.#hpMax=this.#hpMax + 1;
                this.#hp=this.#hp + 1;
                break; 
            case "Kit Carlson":
                this.#hpMax=this.#hpMax - 1;
                this.#hp=this.#hp - 1;
                break;
            case "Vulture Sam":
                this.#hpMax=this.#hpMax + 1;
                this.#hp=this.#hp + 1;
                break;
            case "Jessie Jones":
                this.#hpMax=this.#hpMax + 1;
                this.#hp=this.#hp + 1;
                break;
            case "El Gringo":
                this.#hpMax=this.#hpMax - 1;
                this.#hp=this.#hp - 1;
                break;
        }
    }

    getCharacter()
    {
        return this.#character;
    }
    //function to be called when that arrow stack is empty
    
    
}
module.exports={Jucator}