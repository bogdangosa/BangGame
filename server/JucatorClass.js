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
    #nrOfArrows;
    #character;
    #left;
    #right;
    

    constructor(player,id)
    {
        this.#id=id;
        this.#player=player;
        this.#hp=8;
        this.#hpMax=8;
        this.#nrOfArrows=0;
    }
    

    //the player takes damage equal to damageAmount
    ChangeHP(Amount)
    {
        if(Amount<1 && Amount>0)
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
    getArrows()
    {
        return this.#nrOfArrows;
    }

    setRole(role)
    {
        this.#role=role;
    }
    takeArrow()
    {
        this.#nrOfArrows++;
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
    }

    getCharacter()
    {
        return this.#character;
    }
    //function to be called when that arrow stack is empty
    takeDamageFromArrows()
    {
        this.#hp=this.#hp-this.#nrOfArrows;
        this.#nrOfArrows=0;
        return this.#hp;
    }

    
}
module.exports={Jucator}