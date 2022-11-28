/*
    Game Object
    Alann AS
*/


/**
 * @argument objectType is the class of yours elements games
 */
class GameObject {
    constructor(id, objectType) {
        objectType.sprite.style.position = 'absolute'
        this.id = id
        this.item = objectType
        //propertys
        this.x = this.item.sprite.clientTop
        this.y = this.item.sprite.clientLeft
        this.visible = true
        this.rigidBody = false
        this.triggerable = false
        this.triggerList = []
        this.speed = 1
        this.moveLiberty = [{lib: true, dist: this.speed},{lib: true, dist: this.speed},{lib: true, dist: this.speed},{lib: true, dist: this.speed}] // right, left, down, up
        this.vecteur = {x: this.speed, y: 0, angle: 0}
    }

    //collision event
    get collision() {
        const th = this
        return class {

        }
    }

    //propertys
    get propertys() {
        const th = this
        return class {
            static set x (x) {  // set/get position x/y
                th.x = x
                th.item.sprite.style.left = x+"px"
            }
            static get x () {  // set/get position x/y
                return th.x
            }
            static set y (y) {  // set/get position x/y
                th.y = y
                th.item.sprite.style.top = y+"px"
            }
            static get y () {  // set/get position x/y
                return th.y
            }
            static set width(width) {   // set/get width/height
                th.item.sprite.width = width
            }
            static get width() {   // set/get width/height
                return th.item.sprite.width
            }
            static set height(height) {   // set/get width/height
                th.item.sprite.height = height
            }
            static get height() {   // set/get width/height
                return th.item.sprite.height
            }
            static set speed (speed) {   // set/get speed
                th.speed = speed
                this.vecteurAngle = th.vecteur.angle
            }
            static get speed () {   // set/get speed
                return th.speed
            }
            static set vecteurAngle (angle) {   // set/get vecteurAngle
                th.vecteur.angle = angle
                th.vecteur.y = th.speed * Math.sin(angle*(0.01745329252)) //PI/180
                th.vecteur.x = th.speed * Math.cos(angle*(0.01745329252)) //PI/180
            }
            static get vecteurAngle () {   // set/get vecteurAngle
                return th.vecteur.angle
            }
            static set visibility (bool) {   // set/get visibility
                th.visible = bool
                th.item.sprite.style.visibility = bool ? 'visible' : 'hidden'
                // console.log(th.item.sprite.style.visibility );
            }
            static get visibility () {   // set/get visibility
                return th.visible
            }
        }
    }


    // mouvement
    get move () {
        const th = this
        this.isMoving = true
        return class {
            static left (speed = th.speed) {
                if (!th.moveLiberty[1].lib) {th.moveLiberty[1].lib = true; speed = -th.moveLiberty[1].dist}
                th.x += -speed
                th.item.sprite.style.left = th.x+"px"
            }
            static right (speed = th.speed) {
                if (!th.moveLiberty[0].lib) {th.moveLiberty[0].lib = true; speed = th.moveLiberty[0].dist}
                th.x += speed
                th.item.sprite.style.left = th.x+"px"
            }
            static up (speed = th.speed) {
                if (!th.moveLiberty[3].lib) {th.moveLiberty[3].lib = true; speed = -th.moveLiberty[3].dist}
                th.y += -speed
                th.item.sprite.style.top = th.y+"px"
            }
            static down (speed = th.speed) {
                if (!th.moveLiberty[2].lib) {th.moveLiberty[2].lib = true; speed = th.moveLiberty[2].dist}
                th.y += speed
                th.item.sprite.style.top = th.y+"px"
            }
            static vecteur () {
                let speedx = th.vecteur.x
                let speedy = th.vecteur.y
                if (speedx < 0) {if (!th.moveLiberty[1].lib) {th.moveLiberty[1].lib = true; speedx = th.moveLiberty[1].dist}} else  {if (!th.moveLiberty[0].lib) {th.moveLiberty[0].lib = true; speedx = th.moveLiberty[0].dist}}
                if (speedy < 0) {if (!th.moveLiberty[3].lib) {th.moveLiberty[3].lib = true; speedy = th.moveLiberty[3].dist}} else { if (!th.moveLiberty[2].lib) {th.moveLiberty[2].lib = true; speedy = th.moveLiberty[2].dist}}
                // console.log(speedx, speedy);
                th.x += speedx
                th.y += speedy
                th.item.sprite.style.top = th.y+"px"
                th.item.sprite.style.left = th.x+"px"
            }
            
        }
    }

    static getGameObjectByIdInASlice(table, id) {
        return table.map(obj => {
            if (obj.id == id) {return obj}
        });
    }
    destroyGameObject() {
        this.item.sprite.remove()
        delete this
    }
    
}
