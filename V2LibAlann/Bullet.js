/*
    Bullet Class
    Alann AS
*/

class Bullet {
    /**
     * Creates an instance of Bullet.
     * @param imgLink The path of the img.
     * @param bulletName The id of the Bullet.
     */
    constructor(bulletName, imgLink) {
        const sprite = document.createElement('img')
        sprite.src = imgLink
        this.name = bulletName
        this.sprite = sprite
    }
    set domage (domageAmount) {
        this.domage = domageAmount
    }
    set velocity (velocity) {
        this.velocity = velocity
    }
}
