const testUI = new UserInterface('./sprites/MenuTest/MenuBackgroond.png')

const newGame = new Button ('./sprites/MenuTest/NewGame.png', ()=>{console.log('newGame');})
newGame.activeSprite = './sprites/MenuTest/NewGameSelected.png'
newGame.x = 200
newGame.y = 150

const credit = new Button ('./sprites/MenuTest/Credit.png', ()=>{console.log('credit');})
credit.activeSprite = './sprites/MenuTest/CreditSelected.png'
credit.x = 200
credit.y = 350

const quit = new Button ('./sprites/MenuTest/Quit.png', ()=>{console.log('quit');})
quit.activeSprite = './sprites/MenuTest/QuitSelected.png'
console.log(quit.activeSprite);
quit.x = 200
quit.y = 550

testUI.matris = [
                    [newGame],
                    [credit],
                    [quit],
                ]
testUI.show()

// setTimeout(()=>{testUI.hidde()}, 2000)

