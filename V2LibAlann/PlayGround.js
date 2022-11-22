/*
    PlayGround Class
    Alann AS
*/

class PlayGround {
    /**
     * Creates an instance of PlayGround.
     * @param imgLink The path of the img.
     * @param playGroundName The id of the ship.
     */
    constructor(playGroundName, imgLink) {
        const sprite = document.createElement('img')
        sprite.src = imgLink
        const div = document.createElement('div')
        div.style.position =  'absolute'
        sprite.style.display =  'block'
        div.style.top =  '50%'
        div.style.left =  '50%'
        div.style.transform =  'translate(-50%, -50%)'
        div.style.overflow =  'hidden'
        div.id = playGroundName
        this.name = playGroundName
        this.imgLink = imgLink
        this.sprite = sprite
        this.div = div
        this.gameObjectList = []
    }
}
