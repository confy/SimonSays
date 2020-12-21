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
                type: "sine",
                frequency: this.freq,
                volume: 0.5,
                release: tick / 700,
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
        this.tickrate = 1000
        this.break = this.tickrate / 3
        this.buttons = constructBtns(_scales.pentatonic, this.tickrate)
        this.btnSounds = []

        this.reverb = new Pizzicato.Effects.Reverb({
            time: 2,
            decay: 1,
            reverse: false,
            mix: 1
        });
        // this.btnSounds.addEffect(this.reverb);
        this.moves = [5]
        this.score = 1
        this.listen = false
        this.flash = true
        this.scale = scale

    }
    playMoves() {
        // run one set of moves - block input
        this.moves.forEach((move) => {
            buttons[move].activate()
        })
        return
    }
}

var game = new Game(_dom_.scaleSelect.value)

function resetGame() {
    game = new Game(_dom_.scaleSelect.value)
}

_dom_.reset.addEventListener('click', () => {
    resetGame()
})

_dom_.gameButtons.addEventListener('click', (e) => {
    if (e.target == _dom_.gameButtons) {
        return
    } else {
        let id = e.target.id
        let numID = Number(id.slice(3, 4))
        game.buttons[numID].activate()
    }
})