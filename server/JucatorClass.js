class Jucator
{

    /*

    player-name of the player that control the character
    hp-hitpoints/health
    role-role of the player:sherif/bandit/outlaw
    nrOfArrows- number of arrows the player has taken
    */

    //declaration of "private" variables 
    #player;
    #role;
    #hp;
    #nrOfArrows;

    constructor(player,role)
    {
        this.#player=player;
        this.#role=role;
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

    takeArrow()
    {
        this.#nrOfArrows++;
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