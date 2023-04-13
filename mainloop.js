//var gamebox = document.querySelector('.gamebox')
var movec = 135 // move counter, to stop movement
let nens = 0 // nbr of ennemy shots (maximum 3)
let touch = false
var tab = []
var pass = false
var ensp = 1 // ennemyspeed
var pauseen = 45 // pause time for ennemy movement
// function startAnim(){
//     req = window.requestAnimationFrame(launchGame)
// }

function stopAnim() {
    window.cancelAnimationFrame(req)
    req = undefined
}
var lastright = g.left // to find the last ennemy to right, g is gamebox coordinates
var lastleft = g.right // to find the last ennemy to left
var lastbottom = g.top// to find the last ennemy to bottom
var ennemies
var p //plane coordinates
var e //ennemybox coordinates
var nesmax = 3 // number max of ennemy shots
var nes // random number of ennemy shots

function launchGame(){
    g = gamebox.getBoundingClientRect() // gamebox coordinates
    console.log('loop');
    p = plane.getBoundingClientRect()
    e = ennemybox.getBoundingClientRect()
    ennemies = document.getElementsByClassName('ennemy')
    
    nes=Math.round(Math.random()*nesmax)
    len = ennemies.length
    let i = 0
    while(i<nes){ // choosing random ennemies for shoot
        tab[i]= Math.round(Math.random()*len)
        i++
    }
    lastright = g.left // to find the last ennemy to right
    lastleft = g.right // to find the last ennemy to left
    lastbottom = g.top// to find the last ennemy to bottom
    ennemyshot() // ennemy shots
    if (movec == 0) movec = 135 // used for move/stop.
    ennemyboxm() // ennemy box movement
    planemove() // plane movement
    launchball() // ball launching
    moveBall()

    if (bl && b.y <= e.bottom && b.x>=e.x && b.x<=lastright) { // gestion des collisions
        for (let en of ennemies){
            let enc = en.getBoundingClientRect() // get ennemy coordinates
            if (b.top<=enc.top+40 && (b.x+10)>=enc.x && b.x<=enc.x+40){
                bl = false
                gamebox.removeChild(ball)
                //window.cancelAnimationFrame(req)<
                score(en.getAttribute("pts"));
                ennemybox.removeChild(en)
                if (len==1) passed()
                break
            }
        }
    }
    if (!isPaused) req = window.requestAnimationFrame(launchGame)
}

function ennemyboxm() {
    if (!isPaused){ // ennemybox movement
        if (toRight && movec >pauseen){
            ennemybox.style.left = e.x + ensp + 'px'
        }else if (!toRight && movec >pauseen){
            ennemybox.style.left = e.x - ensp + 'px'
        }
        if ((toRight && lastright >= (g.right -5)) || (!toRight && lastleft <= g.left + 5)){
            toRight = !toRight
            ennemybox.style.top = e.top + 20 + 'px'
        }
        movec--
    }
}

function planemove() {
    let distLeft = p.left
    KeyManager.whileKeyDown(KeyManager.LeftArrow, ()=>{
        if (p.left>=g.left+10) { // plane movement
            // plane.style.right = p.right - vitesse + 'px'
            plane.style.left = distLeft - vitesse + 'px'
            distLeft -= vitesse
        }
    })
    KeyManager.whileKeyDown(KeyManager.RightArrow, ()=>{
        if (p.right<=g.right-10){ // plane movement
            // plane.style.right = p.right + vitesse + 'px'
            plane.style.left = distLeft + vitesse + 'px'
        } 
    })

}

function launchball(){
    if (!bl && launch){  // condition to launch the ball
        ball = document.createElement('div') // adding the ball
        ball.className = 'ball'
        gamebox.appendChild(ball)
        launch = false 
        bl = true
        ball.style.left = (p.right-30) + 'px'
        ball.style.top = p.top - 20 + 'px'
        t = p.top - 20
    }
}

function moveBall(){
    if (!isPaused && bl) { // to move the ball and make it disappear if out of gamescreen
        b = ball.getBoundingClientRect()
        t -= vitesse
        if (t < 80) {
            bl = false
            gamebox.removeChild(ball)
        }
        else {
            stopAnim()
            ball.style.top = t + "px"
        }
    }
}

function ennemyshot(){ // to detect last ennemy to right, to left and to bottom, to launch ennemy shots, detect collisions with plane
    let period = 0
    while (period<pauseen){
        period = Math.round(Math.random()*90)
    }
    for (let i=0;i<len;i++){ 
        let enc = ennemies[i].getBoundingClientRect()
        if (enc.x > lastright) lastright = enc.x + 40
        if (enc.x < lastleft) lastleft = enc.x
        if (enc.y > lastbottom) lastbottom = enc.y
        if (movec == period && nens <= nes && tab.includes(i)){
            let ens = document.createElement('div') // ennemy shot
            ens.className = "ennemyshot"
            ens.style.top = enc.top + 40 + 'px'
            ens.style.left = enc.left + 15 + 'px'
            gamebox.appendChild(ens)
            nens++
        }
    }
    let ennemyshots = document.getElementsByClassName("ennemyshot")
    for (let ens of ennemyshots){ // ennemyshots movement + impact detection
        let enc = ens.getBoundingClientRect()
        ens.style.top = enc.top + vitesse + 'px'
        if (enc.top >= p.top && enc.left+10>=p.left && enc.left<=p.left+50) { // impact between ennemyshot and plane
            isPaused = true
            touch=true
            gamebox.removeChild(ens)
            removeEnnemyshots()
            touched()
            return  
        }
        if (enc.top>=p.top+50){
            gamebox.removeChild(ens)
            nens--
        }
    }
}

function removeEnnemyshots(){
    let ennemyshots = document.getElementsByClassName("ennemyshot")
    for (let en of ennemyshots){
        gamebox.removeChild(en)
    }
}

function touched(){ // when plane touched by ennemy shot
    removeEnnemyshots()
    pause()
    lives--
    document.getElementById("lives").innerText = '0' + lives
    nens = 0
    if (lives == 0) gameOver()
    else {
        llbox.className = "llbox"
        llbox.textContent = "You lost a life. Press 'c' to continue..."
        gamebox.appendChild(llbox)
        
    }
}

function passed() { // when all ennemies are killed, stop the loop + congratulations msg.
    removeEnnemyshots()
    let score = parseInt(document.getElementById("score").innerText)
    let mins = document.getElementById('minute').innerText;
    let secs = document.getElementById('second').innerText;
    congbox.className = "congbox"
    congbox.textContent = "Congratulations, you passed level "+level+", your score is "+score+", your time is "+mins+":"+secs+", 'echap' to continue..."
    //gamebox.removeChild(ennemybox)
    gamebox.appendChild(congbox)
    isPaused = true
    pass = true
    gameStarted = false
    if (nesmax<5) nesmax++
    ensp += 0.2
    vitesse += 2
    nens = 0
    pause()
    stopAnim()
    removeEnnemyshots()
}

function nextLevel(){
    level++
    document.getElementById("level").innerText = '0' + level
    if (lines<5) lines++
    if (cols<10) cols++
}
