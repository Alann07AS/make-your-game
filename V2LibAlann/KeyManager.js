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
    static whileKeyDown(key, func, ...param) {
        if (this.keyMap[key]) func(...param)
    }
    static whileKeyUp(key, func, ...param) {
        if (!this.keyMap[key]) func(...param)
    }
    static onKeyDown(key, func, ...param) {
        if (this.keyMap[key] && !this.keyMapLastState[key]) {func(...param); this.keyMapLastState[key] = true}
    }
    static onKeyUp(key, func, ...param) {
        if (!this.keyMap[key] && this.keyMapLastState[key]) {func(...param); this.keyMapLastState[key] = false}
    }
}
