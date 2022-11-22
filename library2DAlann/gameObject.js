/*
    Alann, Schnebelen
    2d library for web game
*/

// Game engine


// GameObjectBUilder

class GameObject {
    constructor(id) {
        const newOb = {
        //Game Object ID
        id: id,
        //setHtml Object
        webObject: document.createElement('div'),
        
        //set propertys
        propertys: {
            visible: true,
            color: 'white',
            sprite: 'noSprite',
        },
        getPropertys: function (params) {
            return this.propertys
        },
        setVisible: function (param) {
            this.propertys.visible = param
            let state
            param ?   state = '' : state =  'hidden'
            this.webObject.style.visibility =  state
        },
        setColor: function (color) {
            this.propertys.color = color
            this.webObject.style.background = color
        },
        setSprite: function (sprite) {
            this.propertys.sprite = sprite
            const spriteWeb =  document.createElement('img')
            spriteWeb.src = sprite
            this.webObject.append(spriteWeb)
        },
        //size
        h: 0, w: 0,
        setSize: function (h, w) {
            this.h = h, this.w = w
            this.webObject.style.width = w+"px"
            this.webObject.style.height = h+"px"
        },
        getHeight: function () {
            return this.h
        },
        getwidth: function () {
            return this.w
        },

        //potision handler     0,0 is top left
        x: 0, y: 0,
        setPosition: function (x, y) {
            this.x = x, this.y = y
            this.webObject.style.left = x+"px"
            this.webObject.style.top = y+"px"
        },
        getPosition: function () {
            return [this.x, this.y]
        },

        //looking for colision
        listenColision: function () {
            
        },

        //Animation actions
        speed: 1,
        doMoveAction: function (action) {
            switch (action) {
                case 'up':
                    this.setPosition(this.x, this.y-this.speed)
                    break;
                case 'down':
                    this.setPosition(this.x, this.y+this.speed)
                    break;
                case 'left':
                    this.setPosition(this.x-this.speed, this.y)
                    break;
                case 'right':
                    this.setPosition(this.x+this.speed, this.y)
                    break;
                default:

                    break;
            }
        },

        isOut: function () {
            const doc = document.body.getBoundingClientRect()
            return !(this.x >= 0 && this.y >= 0 && this.x+this.w <= doc.width && this.y+this.h <= doc.height)
        },


        doAction: 0,

        //key/action
        keysAction: {},

        addActionKey: function (key, action) {
            this.keysAction[key] = {}
            this.keysAction[key].state = false
            this.keysAction[key].listener = [
                document.addEventListener('keydown', (k) => { if (k.key == key) {this.keysAction[key].state = true}}),
                document.addEventListener('keyup', (k) => {if (k.key == key) {this.keysAction[key].state   = false}}),
            ]
            this.keysAction[key].checkForAction = function () {
                if (this.state) {
                    action()
                }
            }
        }
    }
    newOb.webObject.style.position = "absolute",
    newOb.webObject.id = newOb.id 
    document.body.append(newOb.webObject)
    return newOb
    }
}




//TEST

const viewport = document.body.getBoundingClientRect()

//Menu creation
const gameMenue = new GameObject(400)

gameMenue.setSprite('./menu.png')
gameMenue.setSize(400,400)
gameMenue.setPosition((viewport.width/2)- gameMenue.w/2,viewport.height/2- gameMenue.h/2)
gameMenue.pause = document.addEventListener('keyup', (e) => {
    if (e.key == 'Escape') gameMenue.propertys.visible ? gameMenue.setVisible(false) : gameMenue.setVisible(true)
})

//player creation
const joueur = new GameObject(0)

joueur.setColor('green')
joueur.setSize(50,50)
joueur.setPosition((viewport.width/2)-(joueur.getwidth()/2), 800)

let enemeiesTable = []
const enemieCOmp = 12
const enmieWidt = 100
let space = ((viewport.width-enemieCOmp*enmieWidt)/(enemieCOmp+1))
let x = space
space += enmieWidt

joueur.addActionKey('ArrowRight', () => {if (!joueur.isOut()) {joueur.doMoveAction('right')} else {joueur.setPosition(viewport.width- joueur.w, joueur.y)}})
joueur.addActionKey('ArrowLeft', () => {if (!joueur.isOut()) {joueur.doMoveAction('left')} else {joueur.setPosition(0, joueur.y)}})

joueur.speed= 8


//shoot action

const bullet = new GameObject(500)
bullet.setSize(40, 4)
bullet.setColor('blue')
bullet.speed = 20
bullet.setVisible(false)

bullet.addActionKey(' ', () =>{
    if (!bullet.getPropertys().visible) {
        bullet.setPosition(joueur.x+joueur.w/2, joueur.y-joueur.h/2)
        bullet.setVisible(true)
    }
})

//ennemies creation
for (let i = 1; i <= enemieCOmp; i++) {
    const enemie = new GameObject(i);
    enemie.setColor('red')
enemie.setSize(50, enmieWidt)
    enemie.setPosition(x, 100)
    enemeiesTable.push(enemie)
    x += space
}

function mainLoop() {
    if (!gameMenue.getPropertys().visible) {
        joueur.keysAction.ArrowRight.checkForAction()
        joueur.keysAction.ArrowLeft.checkForAction()
        bullet.keysAction[' '].checkForAction()
        if(bullet.getPropertys().visible) {
            bullet.doMoveAction('up')
            console.log(bullet.isOut());
            if (bullet.isOut()) {
                bullet.setVisible(false)
            }
        }
    }
    requestAnimationFrame(mainLoop)
}
mainLoop()