var _dom_ = {
    "gameButtons": document.querySelector(".gameButtons"),
    "reset": document.querySelector("#reset"),
    "scaleSelect": document.querySelector("#scales"),
    "waveSelect": document.querySelector("#waves"),
    "score": document.querySelector("#score")
}
var scales = {
    "pentatonic": [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99],
    "ionian": [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33],
    "dorian": [261.63, 293.66, 311.13, 349.23, 392.00, 440.00, 466.16, 523.25, 587.33]
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
    constructor(scale, wave) {
        this.gameState = "ongoing"
        this.scale = scale
        this.tickrate = 400
        this.break = this.tickrate / 3
        this.wave = wave
        this.buttons = constructBtns(scales[this.scale], this.tickrate, this.wave)
        this.moves = [1 + Math.floor(Math.random() * 9)]
        this.currUserMoveID = 1
        this.score = 1
        this.listen = false

    }
    addMove() {
        this.moves.push(1 + Math.floor(Math.random() * 9))
    }
    playMoves() {
        this.listen = false
        this.moves.forEach((move, i) => {
            setTimeout(() => {
                this.buttons[move].activate()
            }, 1200 + 2 * i * this.tickrate)
        })
        this.listen = true
    }
    recordMove(userMove) {
        if (userMove != this.moves[this.currUserMoveID - 1]) {
            this.gameState = "ended"
            return "wrong"
        } else {
            if (this.currUserMoveID == this.moves.length) {
                this.score = this.currUserMoveID
                this.currUserMoveID = 1
                return "lastMove"
            }
            this.currUserMoveID += 1
            return "correct"
        }

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
    return new Game(_dom_.scaleSelect.value, _dom_.waveSelect.value)

}
currGame = resetGame()

_dom_.reset.addEventListener('click', () => {
    currGame = resetGame()
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
        if (currGame.gameState = "ongoing") {
            ret = currGame.recordMove(numID)
            if (ret == "correct") {
                return
            } else if (ret == "lastMove") {
                _dom_.score.innerHTML = `Score: ${currGame.score}`
                currGame.addMove()
                setTimeout(currGame.playMoves(), 2000)

            } else {
                currGame.btnFlash()
            }
        }
    }
})