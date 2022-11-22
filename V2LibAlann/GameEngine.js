/**
 * Alann AS
 * GameEngine manager
 */

class GameEngine {
    static gameIsRunning  = false
    static gameObjectList = []
    // static rigidBodyList = []
    // static triggerableList = []
    static playGround = undefined // PlayGround Class
    static gameLoop = ()=>{}
    /**Set the main function wich be call each frame game
     * @func a function.
     */
    static set setGameLoop (func) {
        const th = this
        this.gameLoop = function () {
            th.gameObjectList.map((obj,i)=>{
                if (obj.isMoving && (obj.triggerable || obj.rigidBody)) {
                    const newTriherList = []
                    th.gameObjectList.map((obj2,i2)=>{
                        if (obj2 != obj) {
                            const distanceTable = []
                            distanceTable.push(-((obj.propertys.x + obj.propertys.width) - obj2.propertys.x))  // xleft 0
                            distanceTable.push(obj.propertys.x - (obj2.propertys.x + obj2.propertys.width))  // xright 1
                            distanceTable.push(-((obj.propertys.y + obj.propertys.height) - obj2.propertys.y))  // yup 2
                            distanceTable.push(obj.propertys.y - (obj2.propertys.y + obj2.propertys.height))  // ydown 3
                            // if is Triger
                            const max = Math.max(...distanceTable)
                            if (max < 0 ) {
                                if (obj.triggerable ) newTriherList.push(obj2) //.id
                            }
                            // bloque if colision
                            if (obj.rigidBody && obj2.rigidBody && max < obj.propertys.speed) {
                                const iMax = distanceTable.indexOf(max)
                                obj.moveLiberty[iMax] = {lib: false, dist: iMax===1||iMax===3? -(max):(max)}
                            }
                        }
                    })
                    obj.triggerList = newTriherList
                    obj.isMoving = false
                }
            })
            func()
            if (th.gameIsRunning) requestAnimationFrame(th.gameLoop)
        }
    }

    static startGame () {
        this.gameIsRunning = true;
        requestAnimationFrame(this.gameLoop)
    }
    static stopGame () {
        this.gameIsRunning = false
    }

    // SET GAME ENGINE OBJECT //
    /**
     * Add Game Object to GameEngine.
     * @param GO One GameObject or many.
     */
    static addGameObject(...GO) {
        GO.forEach((obj)=>{
            this.gameObjectList.push(obj)
            if(this.playGround) this.playGround.div.appendChild(obj.item.sprite)
        })
    }

    /**
     * Add Play Ground to GameEngine.
     */
    static set  setPlayGroundObject(PG) {
        this.playGround = PG
        this.gameObjectList.forEach((obj)=>{
            this.playGround.div.appendChild(obj.item.sprite)
        })
        this.playGround.div.appendChild(this.playGround.sprite)
        document.body.append(this.playGround.div)
    }

    /**
     * Remove the playground to body html struct and unload Game Object
     */
    static UnLoadAndShowPlayGround() {
        for (const obj of this.gameObjectList) {
            this.div.removeChild(obj.item.sprite)
        }
        this.gameObjectList = []
        document.body.removeChild(this.div)
    }

}




/* // CLASS TEST
const gameEngine = new GameEngine('./GreyBackGround.png')


const obj = document.createElement("div")
obj.style.background = "black"
obj.style.height = "200px"
obj.style.width = "200px"
obj.style.position = "absolute"
document.body.append(obj)

gameEngine.SetGameLoop = ()=>{
    const info = obj.getBoundingClientRect()
    obj.style.left = info.x+10+"px"
}


document.addEventListener('keydown', (e) => {
    gameEngine.gameIsRunning ? gameEngine.stopGame() : gameEngine.startGame();
})
console.log(Object)
*/

// class PlayGround {
//     /**
//      * Creates an instance of PlayGround.
//      * @param imgLink The path of the img.
//      * @param playGroundName The id of the ship.
//      */
//     constructor(playGroundName, imgLink) {
//         const sprite = document.createElement('img')
//         sprite.style.position =  'absolute'
//         sprite.style.top =  '50%'
//         sprite.style.left =  '50%'
//         sprite.style.transform =  'translate(-50%, -50%)'
//         sprite.src = imgLink
//         this.name = playGroundName
//         this.sprite = sprite
//         this.width = sprite.width
//         this.height = sprite.height
//     }
//     ShowPlayGround(bool) {
//         bool ? document.body.append(this.sprite) : document.body.removeChild(this.sprite)
//     }
// }

// const gameEngine2 = new GameEngine()
// const basiqueGround = new PlayGround('basiqueGround','GreyBackGround.png')
// gameEngine2.AddPlayGroundObject(basiqueGround)

// basiqueGround.ShowPlayGround(true)

