/*
    Alien Class
    Alann AS
*/

class Alien {
    /**
     * Creates an instance of Alien.
     * @param imgLink The path of the img.
     * @param alienId The id of the ship.
     */
    constructor(alienName, imgLink) {
        const sprite = document.createElement('img')
        sprite.id = alienName
        sprite.src = imgLink
        this.name = alienName
        this.sprite = sprite
    }
    set setLife(lifeAmount) {
        this.setLife = lifeAmount
    }
    set setPoint(pointAmount) {
        this.point_ = pointAmount
    }
    get point() {
        return this.point_
    }
}
