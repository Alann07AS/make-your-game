const Player = {}
const Enemies = []
const EnemiesGround = document.createElement('div')
const bodyInfos = document.body.getBoundingClientRect()
const enemiesCompt = 5
Player.div = document.createElement('div')
Player.pos = {x:0, y:0}
Player.div.classList.add('player')
Player.shoot = {}
Player.shoot.div = document.createElement('div')
Player.shoot.div 


EnemiesGround.style.width = bodyInfos.width

let pos = bodyInfos.width/enemiesCompt
let pos1 = 0
for (let i = 1; i <= enemiesCompt; i++) {
    console.log(pos1);
    const enemie = document.createElement('div')
    enemie.classList.add('enemies')
    enemie.style.left = pos1+'px'
    pos1 += pos
    enemie.id = 'enemie-'+i
    Enemies.push(enemie)
    EnemiesGround.append(enemie)
}

console.log(Player);
console.log('Player');

document.body.append(Player.div)
document.body.append(EnemiesGround)

Player.speed = 5
Player.actions = {}
Player.actions.right = false
Player.actions.left = false
Player.listenerDown = document.addEventListener('keydown', (k)=> {
    if (k.key == 'ArrowRight') {
        Player.actions.right = true
    }
    if (k.key == 'ArrowLeft') {
        Player.actions.left = true
    }
    if (k.key == 'Space') {
        Player.actions.shoot = true
    }
})
Player.listenerUp = document.addEventListener('keyup', (k)=> {
    if (k.key == 'ArrowRight') {
        Player.actions.right = false
    }
    if (k.key == 'ArrowLeft') {
        Player.actions.left = false
    }
    if (k.key == 'Space') {
        Player.actions.shoot = false
    }
})

function mainLoop() {
    if (Player.actions.right) {
        Player.pos.x += Player.speed
    }
    if (Player.actions.left) {
        Player.pos.x -= Player.speed
    }
    if (Player.actions.shoot) {
        
    }
    Player.div.style.left = Player.pos.x+"px"
}

setInterval(mainLoop, 1/60)