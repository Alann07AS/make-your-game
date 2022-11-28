/*
    Cool DOwn Class
    Alann AS
*/

class Button {
    constructor (sprite, func) {
        this.sprite = document.createElement('img')
        this.sprite.src = sprite
        this.normalSprite = sprite
        this.sprite.style.position = 'absolute'
        this.func = func
        this.sprite.style.top = '0px'
        this.sprite.style.left = '0px'
        this.isSelected = false
    }
    set x (x) {
        this._x = x
        this.sprite.style.left = x+'px'
    }
    set y (y) {
        this._y = y
        this.sprite.style.top = y+'px'
    }
    // set func (func) {
    //     this.func =_ func
    // }
    set activeSprite (sprite) {
        this._activeSprite = sprite
    }
    get activeSprite () {
        return this._activeSprite
    }
}

class UserInterface {
    constructor (background, content = document.body) {  
        const defaultClass = document.createElement('style')
        defaultClass.textContent = '.selected {transform: scale(1.2);}'
        document.body.append(defaultClass)
        this.defaultClass = defaultClass
        this.div = document.createElement('div')
        this.background = document.createElement('img')
        this.div.style.position = 'absolute'
        // this.div.style.transform = 'scale(0.5)'
        this.div.style.zIndex = 1000
        this.background.src = background
        this.content = content
        this.div.append(this.background)
        this.row = 0
        this.column = 0
    }

    set SetdefaultClass (classContent) {
        this.defaultClass.textContent = '.selected {'+classContent+';}'
    }

    set x (x) {
        this._x = x
        this.div.style.left = x+'px'
    }
    set y (y) {
        this._y = y
        this.div.style.top = y+'px'
    }
    /**
     * @param matris is a 2d array of Button Object
     */
    set matris(matris = []) {
        matris.flat().forEach(element => {
            this.div.append(element.sprite)
        });
        this.matris_ = matris
        const def = this.matris_[0][0].sprite
        def.classList.toggle('selected')
    }
    get matris() {
        return this.matris_
    }
    show () {
        const zero = this.matris_[0][0]
        if(zero.activeSprite) zero.sprite.src = zero.activeSprite
        this.content.append(this.div)
        this.nav = ()=>{
            const bt = this.matris[this.row][this.column]
            bt.sprite.classList.toggle('selected')
            bt.sprite.src = bt.normalSprite
            KeyManager.whileKeyDown(KeyManager.LeftArrow, ()=>{
                if(this.matris[this.row][this.column-1] != undefined) this.column--
            })
            KeyManager.whileKeyDown(KeyManager.RightArrow, ()=>{
                if(this.matris[this.row][this.column+1] != undefined) this.column++
            })
            KeyManager.whileKeyDown(KeyManager.UpArrow, ()=>{
                if(this.matris[this.row-1] != undefined) {
                    if (this.matris[this.row-1][this.column] === undefined) {
                        this.column = (this.matris[this.row-1].length)-1
                    }
                    this.row--
                }
            })
            KeyManager.whileKeyDown(KeyManager.DownArrow, ()=>{
                if(this.matris[this.row+1] != undefined) {
                    if (this.matris[this.row+1][this.column] === undefined) {
                        this.column = (this.matris[this.row+1].length)-1
                    }
                    this.row++
                }
            })
            const active = this.matris[this.row][this.column]
            active.sprite.classList.toggle('selected')
            if (active.activeSprite) active.sprite.src = active.activeSprite
            KeyManager.onKeyDown(KeyManager.Space, ()=>{
                active.func()
            })
        }
        document.addEventListener('keydown', this.nav)
    }
    hidde () {
        this.content.removeChild(this.div)
        document.removeEventListener('keydown', this.nav)
    }
}
