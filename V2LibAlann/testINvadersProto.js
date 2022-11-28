/**
 * Allows to obtain the estimated Hz of the primary monitor in the system.
 * 
 * @param {Function} callback The function triggered after obtaining the estimated Hz of the monitor.
 * @param {Boolean} runIndefinitely If set to true, the callback will be triggered indefinitely (for live counter).
 */
 function getScreenRefreshRate(callback, runIndefinitely){
    let requestId = null;
    let callbackTriggered = false;
    runIndefinitely = runIndefinitely || false;

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
    }
    
    let DOMHighResTimeStampCollection = [];

    let triggerAnimation = function(DOMHighResTimeStamp){
        DOMHighResTimeStampCollection.unshift(DOMHighResTimeStamp);
        
        if (DOMHighResTimeStampCollection.length > 10) {
            let t0 = DOMHighResTimeStampCollection.pop();
            let fps = Math.floor(1000 * 10 / (DOMHighResTimeStamp - t0));

            if(!callbackTriggered){
                callback.call(undefined, fps, DOMHighResTimeStampCollection);
            }

            if(runIndefinitely){
                callbackTriggered = false;
            }else{
                callbackTriggered = true;
            }
        }
    
        requestId = window.requestAnimationFrame(triggerAnimation);
    };
    
    window.requestAnimationFrame(triggerAnimation);

    // Stop after half second if it shouldn't run indefinitely
    if(!runIndefinitely){
        window.setTimeout(function(){
            window.cancelAnimationFrame(requestId);
            requestId = null;
        }, 5000);
    }
}


GameEngine.setPlayGroundObject = new PlayGround('grey', './sprites/SpaceGifBack.gif') 

// After 500ms, will output the estimated Hz of the monitor (frames per second - FPS)
// 239 FPS (in my case)
const fpsCounter = document.createElement('p')
document.body.append(fpsCounter)
getScreenRefreshRate(function(FPS){
    fpsCounter.textContent = FPS+' fps'
});



// USERITERFACE


//HOME MENU
const homeMenu = new UserInterface('./sprites/MenuTest/MenuBackgroond.png', GameEngine.playGround.div)
// homeMenu.div.style = 'transform: scale(0.5)'
homeMenu.x = 300
homeMenu.y = 0

const newGame = new Button ('./sprites/MenuTest/NewGame.png', ()=>{GameEngine.startGame(); homeMenu.hidde()})
newGame.activeSprite = './sprites/MenuTest/NewGameSelected.png'
newGame.x = 200
newGame.y = 150

const credit = new Button ('./sprites/MenuTest/Credit.png', ()=>{})
credit.activeSprite = './sprites/MenuTest/CreditSelected.png'
credit.x = 200
credit.y = 350

const quit = new Button ('./sprites/MenuTest/Quit.png', ()=>{ open(location, '_self').close();})
quit.activeSprite = './sprites/MenuTest/QuitSelected.png'
quit.x = 200
quit.y = 550

homeMenu.matris = [
                    [newGame],
                    [credit],
                    [quit],
                ]
homeMenu.show()


//PAUSE/DEAD/END MENU

const pauseMenu = new UserInterface('./sprites/MenuTest/MenuBackgroond.png', GameEngine.playGround.div)
// pauseMenu.div.style = 'transform: scale(0.5)'
pauseMenu.x = 300
pauseMenu.y = 0

const resume = new Button ('./sprites/MenuTest/Resume.png', ()=>{GameEngine.startGame(); pauseMenu.hidde()})
resume.activeSprite = './sprites/MenuTest/ResumeSelected.png'
resume.x = 200
resume.y = 150

const mainMenu = new Button ('./sprites/MenuTest/MainMenu.png', ()=>{location.reload();})
mainMenu.activeSprite = './sprites/MenuTest/MainMenuSelected.png'
mainMenu.x = 200
mainMenu.y = 350

const quitPause = new Button ('./sprites/MenuTest/Quit.png', ()=>{ })
quitPause.activeSprite = './sprites/MenuTest/QuitSelected.png'
quitPause.x = 200
quitPause.y = 550

pauseMenu.matris = [
                    [resume],
                    [mainMenu],
                    [quitPause],
                ]


const pauseListener = document.addEventListener('keydown', (k)=>{
    if (GameEngine.gameIsRunning) KeyManager.onKeyDown(KeyManager.Escape, ()=>{GameEngine.stopGame(); pauseMenu.show()})
    // if (!GameEngine.gameIsRunning) KeyManager.onKeyDown(KeyManager.Escape, ()=>{GameEngine.startGame(); pauseMenu.hidde()})
})

//set player
const player = new Ship('unique', './sprites/spaceShip1Reduce.png')
player.score = 0
const scoreComp = document.createElement('p')
scoreComp.textContent = 'Scores: '+player.score
GameEngine.playGround.div.append(scoreComp)
const GOplayer = new GameObject(0, player)
GOplayer.propertys.x = 3
GOplayer.propertys.y = 530
GOplayer.propertys.speed = 6
player.stamina = 100
player.speedBuff = 1.75
player.refieldReady = true
player.life = 3
const lifeDysplayer = document.createElement('p')
lifeDysplayer.style.position = 'absolute'
lifeDysplayer.style.color = 'white'
lifeDysplayer.style.top = '380px'
lifeDysplayer.style.left = '6px'
lifeDysplayer.textContent = player.life
GameEngine.playGround.div.append(lifeDysplayer)
const playerLoseLife = ()=>{
    player.life--
    lifeDysplayer.textContent = player.life
    if (player.life == 0) {
        GameEngine.stopGame()
        const gameover = document.createElement('img')
        gameover.src = './sprites/GameOver.gif'
        gameover.style.position = 'absolute'
        gameover.style.top = '120px'
        gameover.style.left = '350px'
        GameEngine.playGround.div.append(gameover)
    }
}

//win stat

const win = ()=>{
    const win = document.createElement('img')
    win.style.position = 'absolute'
    win.src = './sprites/Win.gif'
    win.style.top = '180px'
    win.style.left = '420px'
    console.log('win');
    GameEngine.stopGame()
    GameEngine.playGround.div.append(win)
}


GameEngine.addGameObject(GOplayer)
const staminaConsum = new CooldDown(100, ()=>{player.stamina-=4; player.refieldReady = false})
const staminaRefild = new CooldDown(10, ()=>{player.stamina+=0.6})
const refieldReadyCooldown = new CooldDown(1000, ()=>{player.refieldReady = true})
const meter = document.createElement('meter')
meter.max = player.stamina
meter.min = 0
meter.low=33
meter.high=66
meter.optimum=80
meter.style.transform = 'rotate(-90deg)'
meter.style.position = 'absolute'
meter.style.left = -30+'px'
meter.style.top = '450px'

function PlayerShoot() {
    KeyManager.onKeyDown(KeyManager.Space , FireBullet)
    if (GObullet.propertys.visibility) {
        if (GObullet.triggerList.length !== 0 && GObullet.triggerList[0].propertys.visibility || GObullet.propertys.y < 0) {
            if (GObullet.propertys.y < 0) {
                GObullet.propertys.visibility = false
                BulletResetPause()
            } else {
                AllEnnemyTable.forEach((v)=>{
                    v.map((k,i)=>{
                        if(k.id == GObullet.triggerList[0].id) {
                            player.score += k.item.point
                            scoreComp.textContent = 'Scores: '+player.score
                            k.destroyGameObject(); v.splice(i, 1);
                            GameEngine.removeGameObjectId(k.id);
                        }
                    })
                })
                BulletResetPause()
                GObullet.propertys.visibility = false
            }
        } else {
            GObullet.move.up()
        }
    }
}

GameEngine.playGround.div.append(meter)
let isSpeedUp = false
const PlayerMouvement = ()=>{
    if (GOplayer.propertys.x+GOplayer.propertys.width < 0) {GOplayer.propertys.x = 1281} else if (GOplayer.propertys.x > 1280) GOplayer.propertys.x = -GOplayer.propertys.width
    KeyManager.onKeyDown('Shift', ()=>{isSpeedUp = true; refieldReadyCooldown.stop()})
    KeyManager.onKeyUp('Shift', ()=>{isSpeedUp = false; refieldReadyCooldown.start()})
    if (isSpeedUp) {staminaConsum.start(); staminaRefild.stop()} else if (player.stamina < 100 && player.refieldReady) {staminaConsum.stop(); staminaRefild.start()} else if (player.stamina > 100) {player.stamina = 100}
    if (player.stamina <= 0) isSpeedUp = false
    meter.value = player.stamina
    KeyManager.whileKeyDown(KeyManager.RightArrow ,()=>{GOplayer.move.right(GOplayer.propertys.speed*(isSpeedUp?player.speedBuff:1))})
    KeyManager.whileKeyDown(KeyManager.LeftArrow ,()=>{GOplayer.move.left(GOplayer.propertys.speed*(isSpeedUp?player.speedBuff:1))})
}


//Set Bullet Player
const bullet = new Bullet('bulletPlayer', './sprites/BulletTest.png')
const GObullet = new GameObject(1, bullet)
GObullet.triggerable = true
GObullet.propertys.visibility = false
GObullet.propertys.speed = 7
GameEngine.addGameObject(GObullet)

const FireBullet = ()=>{
    if (!GObullet.propertys.visibility) {
        BulletResetPause()
        GObullet.propertys.visibility = true
    }
}
const BulletResetPause = ()=>{
    GObullet.propertys.x = GOplayer.propertys.x+46
    GObullet.propertys.y = GOplayer.propertys.y - GObullet.propertys.height    
}
//Set Bullet Ennemies

const aliveBullet = []
const idBull = []
for (let i = 0; i < 200; i++) {
    idBull.push(i+'AlienBullet')
}
let idSelect = 0

const EnnemiesShoot = ()=> {
    if (Math.random() <= 0.90) { 
        const alienShoot = []
        const flatALlEnemies = AllEnnemyTable.flat()
        const nb = Math.trunc(Math.random() * 4 + 1)
        while ( flatALlEnemies.length >= nb && alienShoot.length != nb ) {
            const selectAlien = Math.trunc(Math.random() * flatALlEnemies.length)
            if (!alienShoot.includes(selectAlien)) alienShoot.push(selectAlien)
        }
        alienShoot.forEach((v,i)=>{
            const alienBullet = new Bullet('bulletAlien', './sprites/BulletTestAlien.png')
            const GOalienBullet = new GameObject(idBull[idSelect], alienBullet)
            idSelect++ ; if (idSelect >= 200) idSelect = 0
            GOalienBullet.propertys.speed = 7
            GOalienBullet.triggerable = true
            GOalienBullet.propertys.x = flatALlEnemies[v].propertys.x + flatALlEnemies[v].propertys.width/2 + 4
            GOalienBullet.propertys.y = flatALlEnemies[v].propertys.y + flatALlEnemies[v].propertys.height
            aliveBullet.push(GOalienBullet)
            GameEngine.addGameObject(GOalienBullet)
        })
    }
}

const EnnemiesShootMove = ()=> {
    if (aliveBullet.length != 0) {
        aliveBullet.forEach((obj, i)=>{
            obj.move.down()
            if (obj.triggerList.length != 0 && obj.triggerList[0].id === 0) {
                console.log('BOOM');
                playerLoseLife()
                GameEngine.removeGameObjectId(obj.id)
                obj.destroyGameObject()
                aliveBullet.splice(i,1)
            }
            if (obj.propertys.y >= 640) {
                GameEngine.removeGameObjectId(obj.id)
                obj.destroyGameObject()
                aliveBullet.splice(i,1)
            }
        })
    }
}

const CoolDownEnnemieShoot = new CooldDown(1500, EnnemiesShoot)


//AllEnnemyTable
const AllEnnemyTable = []

//Set All Ennemy Orange
let s = 100
const OrangeEnnemiTable = []
const GreenEnnemiTable = []
AllEnnemyTable.push(OrangeEnnemiTable, GreenEnnemiTable)
for (let i = 0; i < 6   ; i++) {
    const ennemy = new Alien('OrangeAlien', './sprites/OrangeAlien.png')
    ennemy.setPoint = 10
    const GOennemy = new GameObject('1-'+i, ennemy)
    GOennemy.propertys.speed = 1
    GameEngine.addGameObject(GOennemy)
    GOennemy.propertys.x = s
    GOennemy.propertys.y = 12
    OrangeEnnemiTable.push(GOennemy)
    s+= 200
}
//Set All Ennemy Green
s = 190
for (let i = 0; i < 6   ; i++) {
    const ennemy = new Alien('GreenAlien', './sprites/GreenAlien.png')
    ennemy.setPoint = 5
    const GOennemy = new GameObject('2-'+i, ennemy)
    GOennemy.propertys.speed = 1
    GameEngine.addGameObject(GOennemy) 
    GOennemy.propertys.x = s
    GOennemy.propertys.y = 130
    GreenEnnemiTable.push(GOennemy)
    s+= 200
}

let ennemyDirection = 'left'
const EnnemyMouvement = ()=>{
    if (OrangeEnnemiTable.length != 0) {const rightOrangeEnemy = OrangeEnnemiTable[OrangeEnnemiTable.length-1]
    if (rightOrangeEnemy.propertys.x+rightOrangeEnemy.propertys.width >= 1280)  ennemyDirection = 'left'
    if (OrangeEnnemiTable[0].propertys.x < 0) ennemyDirection = 'right'}
    if (GreenEnnemiTable.length != 0) {const rightgreenEnemy = GreenEnnemiTable[GreenEnnemiTable.length-1]
    if (rightgreenEnemy.propertys.x+rightgreenEnemy.propertys.width >= 1280) ennemyDirection = 'left'
    if (GreenEnnemiTable[0].propertys.x < 0) ennemyDirection = 'right'}
    AllEnnemyTable.forEach((table)=>{table.forEach((obj)=>{obj.move[ennemyDirection]()})})
}

GameEngine.setGameLoop = ()=> {
    if (AllEnnemyTable[0].length == 0 && AllEnnemyTable[1].length == 0) win()
    EnnemyMouvement()
    PlayerMouvement()
    PlayerShoot()
    // EnnemiesShoot()
    CoolDownEnnemieShoot.start()
    EnnemiesShootMove()
    getScreenRefreshRate(function(FPS){
        fpsCounter.textContent = FPS+' fps'
    });
}


// GameEngine.startGame()