var _dom_ = {
    "gameButtons": document.querySelector(".gameButtons"),
    "reset": document.querySelector("#reset"),
    "scaleSelect": document.querySelector("#scales"),
    "waveSelect": document.querySelector("#waves"),
    "score": document.querySelector("#score")

}
var scales = {
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

var waveforms = ["sine", "square", "triangle", "sawtooth"]


class button {
    constructor(id, freq, tick, wave) {
        this.id = id
        this.freq = freq / 1
        this.tick = tick
        this.btnElem = document.querySelector(`#btn${id}`)
        this.lastClick = 0
        this.sound = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: wave,
                frequency: this.freq,
                volume: 0.2,
                release: tick / 5000,
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


function constructBtns(scale, tick, wave) {
    let buttons = []
    for (let i = 0; i <= 9; i++) {
        let btnWave = ""
        if (wave == "rand") {
            var randWave = waveforms[Math.floor(Math.random() * waveforms.length)]
            btnWave = randWave
        } else {
            btnWave = wave
        }
        buttons.push(new button(i, scale[i - 1], tick, btnWave))
    }
    return buttons
}
class Game {
    constructor(scale) {
        this.gameState = "ongoing"
        this.scale = scale
        this.tickrate = 400
        this.break = this.tickrate / 3
        this.wave = _dom_.waveSelect.value
        this.buttons = constructBtns(scales.pentatonic, this.tickrate, this.wave)
        this.moves = [Number(1 + Math.floor(Math.random() * 9))]
        this.score = 1
        this.listen = false
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
        let flashMoves = [9, 8, 7, 8, 7, 6, 7, 6, 5, 6, 5, 4, 5, 4, 3, 4, 3, 2, 3, 2, 1]
        flashMoves.forEach((move, i) => {
            setTimeout(() => {
                this.buttons[move].activate()
            }, 2 * i * this.tickrate / 3)
        })
        this.listen = true
    }
}


function resetGame() {
    return new Game(_dom_.scaleSelect.value)

}
currGame = resetGame()

_dom_.reset.addEventListener('click', () => {
    currGame = resetGame()
    _dom_.reset.innerHTML = "Reset"
    currGame.btnFlash()
})

_dom_.gameButtons.addEventListener('click', (e) => {
    if (e.target == _dom_.gameButtons || currGame.listen == false) {
        return
    } else {
        if (currGame.gameState = "ongoing") {
            let id = e.target.id
            let numID = Number(id.slice(3, 4))
            currGame.buttons[numID].activate()
        }
    }
})