GameEngine.setPlayGroundObject = new PlayGround('grey', './sprites/GreyBackGround.png') 

//set player
const player = new Ship('unique', './sprites/spaceShip1Reduce.png')
const GOplayer = new GameObject(0, player)
GOplayer.propertys.x = 3
GOplayer.propertys.y = 600
GOplayer.propertys.speed = 4
GameEngine.addGameObject(GOplayer)

const PlayerMouvement = ()=>{
    KeyManager.whileKeyDown(KeyManager.RightArrow ,()=>{GOplayer.move.right()})
    KeyManager.whileKeyDown(KeyManager.LeftArrow ,()=>{GOplayer.move.left()})
}


//Set Bullet
const bullet = new Bullet('bullet', './sprites/BulletTest.png')
const GObullet = new GameObject(1, bullet)
GObullet.triggerable = true
GObullet.propertys.visibility = false
GObullet.propertys.speed = 7
GameEngine.addGameObject(GObullet)

const FireBullet = ()=>{
    if (!GObullet.propertys.visibility) {
        GObullet.propertys.x = GOplayer.propertys.x+46
        GObullet.propertys.y = GOplayer.propertys.y - GObullet.propertys.height    
        GObullet.propertys.visibility = true
    }
}

//Set All Ennemy
let s = 100
for (let i = 0; i < 3   ; i++) {
    const ennemy = new Bullet('OrangeAlien', './sprites/OrangeAlien.png')
    const GOennemy = new GameObject(i+2, ennemy)
    GOennemy.propertys.speed = 0.4
    GameEngine.addGameObject(GOennemy) 
    GOennemy.propertys.x = s
    GOennemy.propertys.y = 12
    s+= 200
}
let ennemyDirection = 'left'
let ennemyComp = 3    
const EnnemyMouvement = ()=>{
    if (GameEngine.gameObjectList[GameEngine.gameObjectList.length-1].propertys.x+GameEngine.gameObjectList[GameEngine.gameObjectList.length-1].propertys.width > 700) ennemyDirection = 'left'
    if (GameEngine.gameObjectList.slice(2)[0].propertys.x < 0) ennemyDirection = 'right'
    GameEngine.gameObjectList.slice(2).forEach((obj)=>{obj.move[ennemyDirection]();})
}


GameEngine.setGameLoop = ()=> {
    EnnemyMouvement()
    PlayerMouvement()
    KeyManager.onKeyDown(KeyManager.Space ,()=>{FireBullet()})
    if (GObullet.propertys.visibility) {
        if (GObullet.isTrigger !== undefined || GObullet.propertys.y < 0) {
            if (GObullet.propertys.y < 0) {
                GObullet.propertys.visibility = false
            } else {
                GObullet.isTrigger.propertys.visibility = false
                // GObullet.isTrigger = undefined
            }
        } else {
            GObullet.move.up()
        }
    }
}


GameEngine.startGame()