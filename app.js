// Globals
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
        this.freq = freq
        this.tick = tick
        this.btnElem = document.querySelector(`#btn${id}`)
    }
    activate() {
        this.btnElem.classlist.toggle("on")
            // todo 
            // flash
            // activate sound
            // wait tick length
    }
    changeFreq(freq) {
        this.freq = freq
    }
}

function constructBtns(scale, tick) {
    var buttons = []
    for (let i = 1; i <= 9; i++) {
        buttons.push(new button(i, scale[i - 1], tick))
    }
    return buttons
}
class Game {
    constructor(scale) {
        this.scale = scale
        this.tickrate = 2
        this.buttons = constructBtns(_scales.pentatonic, this.tickrate)
        this.moves = [5]
        this.score = 1
        this.waiting = false
        this.flash = true
        this.scale = scale
    }
}

var game = new Game(_dom_.scaleSelect.value)

function resetGame() {
    game = new Game(_dom_.scaleSelect.value)
}
window.addEventListener('load', (event) => {
    resetGame()
    console.log('page is fully loaded');
});

_dom_.reset.addEventListener('click', () => {
    resetGame()
})