# SimonSays
WIP

a zen musical version of the classic simon says game, with support for custom scales

- Game class
    - constructor(buttons)
        - buttons
        - tickrate = ?
        - moves = [1,6,3,8,2...]
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