// ----------------------- Tic-Tac-Toe JavaScript ------------------------------

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Pseudocode ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* 
Players
- Each player can have an object that stores relevant information, actions
    - Properties: Name, win-loss record, player number?
    - Methods: Make a move
- Players can be stored in a larger player object

Game Flow
- Game Rules
    - Play alternates between player1 and player2
    - Each player has a unique selector icon (X and O)
    - A player must only select unselected cells
- Game End Condition:
    - Win or Draw
    - Win Condition:
        - A player has 3 selectors in at least one row/column/diagonal
    - Draw Condition:
        - The gameboard is filled with no win condition

Gameboard
- Need some object to store the locations/decisions in the gameboard grid
*/


'use strict';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Testing ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Player() {
    let name = '';

    const setName = function(string) {
        // ensure name is unique
        
        
        // set name
        name = string;
    };
    const getName = function() {
        return name;
    }
    
    let winCount = 0;
    let lossCount = 0;
    let drawCount = 0;
    const addWin = function() {
        winCount++;
    };
    const addLoss = function() {
        lossCount++;
    };
    const addDraw = function() {
        drawCount++;
    };
    const getRecord = function() {
        return `(${winCount}, ${lossCount}, ${drawCount})`;
    };

    return {
        setName,
        getName,
        addWin,
        addLoss,
        addDraw,
        getRecord,
    };
};