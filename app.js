var _dom_ = {
    "gameButtons": document.querySelector(".gameButtons"),
    "reset": document.querySelector("#reset"),
    "scaleSelect": document.querySelector("#scales"),
    "score": document.querySelector("#score")
}
var _scales = {
    "pentatonic": [261.63,
        293.66,
        329.63,
        392.00,
        440.00,
        523.25,
        587.33,
        659.25,
        783.99
    ]
}

class button {
    constructor(id, freq, tick) {
        this.id = id
        this.freq = freq / 1
        this.tick = tick
        this.btnElem = document.querySelector(`#btn${id}`)
        this.lastClick = 0
        this.sound = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: "sawtooth",
                frequency: this.freq,
                volume: 0.2,
                release: tick / 500,
                attack: tick / 10000

            }
        })

    }
    playSound() {
        this.sound.play()
        setTimeout(() => {
            this.sound.stop()
        }, this.tick)
    }
    activate() {
        if (this.btnElem.classList.contains("on")) {
            return
        }
        this.playSound()
        this.btnElem.classList.toggle("on")
        setTimeout(() => {
            this.btnElem.classList.toggle("on")
        }, this.tick)
    }
}

function constructBtns(scale, tick) {
    var buttons = []
    for (let i = 0; i <= 9; i++) {
        buttons.push(new button(i, scale[i - 1], tick))
    }
    return buttons
}
class Game {
    constructor(scale) {
        this.scale = scale
        this.tickrate = 400
        this.break = this.tickrate / 3
        this.buttons = constructBtns(_scales.pentatonic, this.tickrate)
        this.moves = [1, 2, 3, 4]
        this.score = 1
        this.listen = false
        this.flash = true
        this.scale = scale

    }
    playMoves() {
        this.listen = false
        this.moves.forEach((move, i) => {
            setTimeout(() => {
                this.buttons[move].activate()
            }, 2 * i * this.tickrate)
        })
        this.listen = true
    }
    listenMoves() {

    }
    btnFlash() {
        this.listen = false
        let flashMoves = [9, 8, 7, 6, 5, 4, 3, 2, 1]
        flashMoves.forEach((move, i) => {
            setTimeout(() => {
                this.buttons[move].activate()
            }, 2 * i * this.tickrate / 5)
        })
        this.listen = true
    }
}


function resetGame() {
    return new Game(_dom_.scaleSelect.value)

}
var currGame = resetGame()

_dom_.reset.addEventListener('click', () => {
    resetGame()
    _dom_.reset.innerHTML = "Reset"
    currGame.playMoves()
})

_dom_.gameButtons.addEventListener('click', (e) => {
    if (e.target == _dom_.gameButtons || currGame.listen == false) {
        return
    } else {
        let id = e.target.id
        let numID = Number(id.slice(3, 4))
        currGame.buttons[numID].activate()
    }
})