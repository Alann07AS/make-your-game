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
    set setLife(lifeAmount) {
        this.setLife = lifeAmount
    }
}
