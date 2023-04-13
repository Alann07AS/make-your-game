
var gamebox = document.querySelector('.gamebox')
var plane = document.querySelector('.plane')
var ball = document.querySelector('.ball')

var g = gamebox.getBoundingClientRect() // gamebox coordinates
plane.style.top = g.bottom - 50 + 'px' // put the plane on the bottom of the gamebox

var ennemybox = document.createElement('div') // creating ennemybox
var pausebox = document.createElement('div') // pause box
var congbox = document.createElement('div') // congratulations box
var gameoverbox = document.createElement('div') // gameover box
var startBox = document.createElement('div') // creating start menu
var llbox = document.createElement('div') // lost a life box
var b // ball coordinates
var lives = 3
var level = 1
var lines = 3
var cols = 4
var vitesse = 10
var bl = false  // ball launched
var isPaused = false // game paused
var req // to start and stop requestAnimationFrame()
var toRight // ennemybox to direction
var gameStarted = false
var game
let launch = false
var right = false// move plane to right
var left = false// move plane to left

var gameinit = function (){
    toRight = true
    ennemybox.className = "ennemybox"
    ennemybox.style.left = g.x + 20 + 'px'
    ennemybox.style.top = g.y + 20 + 'px'
    gamebox.appendChild(ennemybox)
    for (let j=0;j<lines;j++){  // adding the ennemies to ennemybox
        for (let i=0;i<cols;i++){
            let en = document.createElement('div')
            en.className = "ennemy"
            en.setAttribute("pts",50-j*10)
            en.id = j.toString() + i
            en.style.top = 5 + j * 50 + 'px'
            en.style.left = 5 + i * 50 + 'px'
            ennemybox.appendChild(en)
        }
    }
    startBox.className = "startBox"
    startBox.textContent = "Push 's' to start..."
    gamebox.appendChild(startBox)
}

gameinit()

var startgame = function () {
    gameStarted = true
    gamebox.removeChild(startBox)
    launchGame()
    start()
    //ennemyShoot()
}

var score = function(n) {
    let score = parseInt(document.getElementById("score").innerText)
    let nscore = score + parseInt(n) // newscore
    if (nscore<100) document.getElementById("score").innerText = '000' + nscore
    else if (nscore<1000) document.getElementById("score").innerText = '00' + nscore
    else document.getElementById("score").innerText = '0' + nscore
}

var gameover = false

function gameOver(){
    removeEnnemyshots()
    let score = parseInt(document.getElementById("score").innerText)
    let mins = document.getElementById('minute').innerText;
    let secs = document.getElementById('second').innerText;
    gameoverbox.className = "gameoverbox"
    gameoverbox.textContent = "GAME OVER, your score is "+score+", your time is "+mins+":"+secs+", 'r' to restart..."
    gamebox.appendChild(gameoverbox)
    isPaused = true
    gameover = true
    gameStarted = false
    pause()
}