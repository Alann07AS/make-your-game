/*
    Ship Class
    Alann AS
*/

class Ship {
    /**
     * Creates an instance of Ship.
     * @param imgLink The path of the img.
     * @param shipName The id of the ship.
     */
    constructor(shipName, imgLink) {
        const sprite = document.createElement('img')
        sprite.src = imgLink
        this.name = shipName
        this.sprite = sprite
        
    }
    set life(lifeAmount) {
        this._life = lifeAmount
    }
    set score(lifeAmount) {
        this._score = lifeAmount
    }
    set stamina (a) {
        this._stamina = a
    }
    set speedBuff (a) {
        this._speedBuff = a
    }
    set refieldReady(a) {
        this._refieldReady = a
    }
    get life() {
        return this._life
    }
    get score() {
        return this._score
    }
    get stamina () {
        return this._stamina
    }
    get speedBuff () {
        return this._speedBuff
    }
    get refieldReady() {
        return this._refieldReady
    }

}
