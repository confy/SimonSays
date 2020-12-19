# SimonSays
WIP

a zen musical version of the classic simon says game, with support for custom scales

// TODO
- Allow to display in all browsers
    - buttons are too high and hide footer
    -
- fix buttons somehow.. more 3d
- cleaner gradients, maybe an image
- Button class
    - constructor(id, freq, color)
        - id 1-9
        - frequency = x hz
        - color

    - activate() // called on press or duringplayMoves()
        - this.playSound()
    - playSound()
    - 


- Game class
    - constructor(buttons)
        - buttons = []
        - tickrate = ?
        - moves = [1,6,3,8,2...]  - lodash random
        - score = 1++
        - clickable = T/F
        - flashing = T/F
        - scale = "pentatonic" 
    - startGame()
        - clickable = F
        - this.addMove()
        - playMoves() 
    - playMoves()
        - for i in moves
            - time delay of 1 tick
            - button#i color on
            - button.playSound()
            - time delay of 1 tick
            - button#i color off
            
    - addMove()
        - append random num 1-9 to moves

- Button Class
    - constructor(id, frequency, color)