/*
    Keys Manager Class
    Alann AS
*/
class KeyManager {
    //Const ->
    static get RightArrow (){ return  'ArrowRight'}
    static get LeftArrow (){ return  'ArrowLeft'}
    static get UpArrow (){ return  'ArrowUp'}
    static get DownArrow (){ return  'ArrowDown'}
    static get Space (){ return  ' '}
    static get Escape (){ return  'Escape'}
    //Key Listener and map save
    static keyMap = new Map
    static keyMapLastState = new Map
    static listenerUp = document.addEventListener('keydown', (k)=>{
        if (this.keyMap[k.key] != true) this.keyMapLastState[k.key] = false
        this.keyMap[k.key] = true
    })
    static listenerDown = document.addEventListener('keyup', (k)=>{
        if (this.keyMap[k.key] != false) this.keyMapLastState[k.key] = true
        this.keyMap[k.key] = false
    })
    // KeyManager Methode
    static whileKeyDown(key, func) {
        if (this.keyMap[key]) func()
    }
    static whileKeyUp(key, func) {
        if (!this.keyMap[key]) func()
    }
    static onKeyDown(key, func) {
        if (this.keyMap[key] && !this.keyMapLastState[key]) {func(); this.keyMapLastState[key] = true}
    }
    static onKeyUp(key, func) {
        if (!this.keyMap[key] && this.keyMapLastState[key]) {func(); this.keyMapLastState[key] = false}
    }
}


// KeyManager.whileKeyDown(' ',function () {console.log('coucou');})
/*
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
*/