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
    #nrOfArrows;
    #character;
    #left;
    #right;
    

    constructor(player,id)
    {
        this.#id=id;
        this.#player=player;
        this.#hp=8;
        this.#nrOfArrows=0;
    }
    

    //the player takes damage equal to damageAmount
    takeDamage(damageAmount)
    {
        if(damageAmount)
            this.#hp=this.#hp-damageAmount;    
        else
            this.#hp--;
        return this.#hp;
    }


    //the player heals healAmount points of health
    heal(healAmount)
    {
        if(healAmount)
            this.#hp=this.#hp+healAmount;    
        else
            this.#hp++;
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