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

// Player factory function
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
    
    const record = {
        wins: 0,
        losses: 0,
        draws: 0
    };
    const addWin = function() {
        record.wins++;
    };
    const addLoss = function() {
        record.losses++;
    };
    const addDraw = function() {
        record.draws++;
    };
    const getRecord = function() {
        return `(${record.wins}, ${record.losses}, ${record.draws})`;
    };
    const clearRecord = function() {
        Object.keys(record).forEach((key) => {
            record[key] = 0;
        });
    };

    return {
        setName,
        getName,
        addWin,
        addLoss,
        addDraw,
        getRecord,
        clearRecord,
    };
};

// Factory function for the game board
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    for (let i = 0; i < rows; i++) {
        // create each row within the board container array
        board[i] = [];

        for (let j = 0; j < columns; j++) {
            // push cell objects into each board row, for each column
            board[i].push(Cell());
        };
    };

    const getBoard = function() {
        return board;
    };
    const placeMarker = function(player, row, column) {
        
        // store object of the given reference
        let cell = board[row-1][column-1];
        
        // check for empty cell at given reference
        if (cell.getValue() === 0) {
            
            // use addMarker method on Cell
            cell.addMarker(player);
        } else {
            return;
        };

    };
    const printBoard = function() {
        
    };

    return {
        getBoard,
        placeMarker,
        printBoard,
    };
}

function GameController() {
    const board = Gameboard();

        
    const switchPlayerTurn = function() {
        
    };
    const playRound = function() {
        
    };

    return {
        makeBoard,
        playRound,
    };
}

// Factory function for each cell on the game board
function Cell() {
    let value = 0;
    const addMarker = (player) => {
        value = player;
    };
    const getValue = () => value;
    
    return {
        addMarker,
        getValue,
    };
}

// Execution IIFE
// (function() {

    // player storage object
    // listener for starting a game
    // listener for continuing play
    // method for instantiating players
    const playerModule = {
        players: [],
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        cacheDom: function() {
            // for managing players
            this.addPlayerBtn = document.querySelector('');
            this.addPlayerInput = document.querySelector('');
            this.resetPlayerStatsBtn = document.querySelector('');
            this.removePlayerBtn = document.querySelector('');
            // for playing the game
            this.startGameBtn = document.querySelector('');
        },
        bindEvents: function() {
            this.addPlayerBtn
                .addEventListener('click', this.addPlayer.bind(this));
        },
        render: function() {

        },
        addPlayer: function(name) {
            const newPlayer = Player();
            // newPlayer.setName(this.addPlayerInput.value);
            newPlayer.setName(name); // just for console testing
            this.players.push(newPlayer);
        },
        resetPlayer: function(index) {
            this.players[index].clearRecord();
        },
        removePlayer: function(index) {
            this.players.shift(index, 1);
        },
    };

    const gameModule = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        cacheDom: function() {
            this.playBtn = document.querySelector('');
            this.playAgainBtn = document.querySelector('');
            this.returnHomeBtn = document.querySelector('');
        },
        bindEvents: function() {
            this.playBtn
                .addEventListener('click', this.playGame.bind(this));
            this.playAgainBtn
                .addEventListener('click', this.playGame.bind(this));
            this.returnHomeBtn
                .addEventListener('click', this.returnHome.bind(this));
        },
        playGame: function() {
            
        },
        returnHome: function() {

        },
    }
// })();