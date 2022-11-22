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
// After 500ms, will output the estimated Hz of the monitor (frames per second - FPS)
// 239 FPS (in my case)
getScreenRefreshRate(function(FPS){
    console.log(`${FPS} FPS`);
});





const testPlayGround = new PlayGround('testPlayGround','./sprites/GreyBackGround.png')

const oneEnemy = new Alien('testAlien', './sprites/GreenAlien.png')
const testEnemy = new Alien('pop', './sprites/GreenAlien.png')
const GOoneEnemy = new GameObject(0, oneEnemy)
const GOtestEnemy = new GameObject(2, testEnemy)

GOoneEnemy.propertys.speed = 5
GOoneEnemy.propertys.y = 200
GOoneEnemy.propertys.x = 207
GOoneEnemy.rigidBody = false



// GOoneEnemy.triggerable = trueGOplayer.isTrigger
// console.log(GOoneEnemy.height)

const player = new Ship('testShip', './sprites/spaceShip1Reduce.png')
const GOplayer = new GameObject(1, player)
GOplayer.triggerable = true
GOplayer.rigidBody = false
GOplayer.propertys.y = 600
console.log(GOplayer.y, GOplayer.x, GOplayer.propertys.width, GOplayer.propertys.height);
GOplayer.propertys.speed = 6
GOplayer.triggerable = true 
// testPlayGround.AddGameObjectToPlayGround(GOoneEnemy, GOplayer) //Obselette
GOtestEnemy.propertys.x = 250
GOtestEnemy.propertys.y = 180
GameEngine.setPlayGroundObject = testPlayGround
GameEngine.addGameObject(GOoneEnemy, GOtestEnemy, GOplayer)


console.log(GOplayer.vecteur);
GameEngine.setGameLoop = ()=>{
    // KeyManager.whileKeyDown(KeyManager.UpArrow,()=>{GOoneEnemy.UpDateVecteurAngle(GOoneEnemy.vecteur.angle+4)})
    // KeyManager.whileKeyDown(KeyManager.DownArrow,()=>{GOoneEnemy.UpDateVecteurAngle(GOoneEnemy.vecteur.angle-4)})
    // GOoneEnemy.UseVecteur()
    // console.log(GOplayer.item.sprite.clientTop);
    // KeyManager.whileKeyUp(' ', ()=>{console.log('alwaysUp');})
    // KeyManager.whileKeyDown(' ', ()=>{console.log('alwaysDown');})
    // KeyManager.onKeyDown(' ', ()=>{console.log('oneDownEvent');})
    // KeyManager.onKeyUp(' ', ()=>{console.log('oneUpEvent');})
    // console.log(testPlayGround.div.clientWidth, 'width');
    // console.log(testPlayGround.div.clientHeight , 'height');
    // KeyManager.whileKeyDown(KeyManager.UpArrow, ()=>{GOplayer.propertys.vecteurAngle = 270})
    // KeyManager.whileKeyDown(KeyManager.DownArrow, ()=>{GOplayer.propertys.vecteurAngle = 90})
    // KeyManager.whileKeyDown(KeyManager.RightArrow, ()=>{GOplayer.propertys.vecteurAngle = 0})
    // KeyManager.whileKeyDown(KeyManager.LeftArrow, ()=>{GOplayer.propertys.vecteurAngle = 180})
    // GOplayer.move.vecteur()
    // console.log(GOplayer.triggerList, 'd');
    // if (GOplayer.triggerList.length != 0) {GOplayer.propertys.visibility = false} else {GOplayer.propertys.visibility = true}
    // KeyManager.whileKeyDown(' ', ()=>{console.log('alwaysDown');})
// KeyManager.whileKeyUp(' ', ()=>{console.log('alwaysUp');})
KeyManager.onKeyDown(' ', ()=>{console.log('oneDownEvent');})
KeyManager.onKeyUp(' ', ()=>{console.log('oneUpEvent');})
}
GameEngine.startGame()