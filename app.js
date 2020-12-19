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
    constructor(id, freq) {
        this.id = id
        this.freq = freq
        this.btnElem = document.querySelector(`#btn${id}`)
    }
    activate() {
        this.btnElem.classlist.toggle("on")
    }
}
class Game {
    constructor(scale) {
        this.scale = scale
        this.buttons = constructButtons(scale)
        this.tickrate = 20
        this.moves = [5]
        this.score = 1
        this.waiting = false
        this.flash = true
        this.scale = scale


    }
}
var game = new Game("pentatonic")

function constructButtons(scale) {
    var buttons = {}
    for (let i = 0; i < 9; i++) {
        buttons[`btn${i}`] = new button(i, scale[i])
    }
}
_dom_.gameButtons.addEventListener("click", (e) => {
    var id = e.target.id
    game.buttons[`${id}`].classlist.toggle("on")


})

window.addEventListener("load", function() {
    let str = JSON.stringify(game.buttons, null, 4); // (Optional) beautiful indented output.
    console.log(str);
});

function main() {
    console.log("HELP")




}

main()