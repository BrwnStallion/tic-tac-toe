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

// Factory function for player objects
function Player() {
    let name = '';

    const setName = function(string) {
        // ensure name is unique
        
        
        // set name
        name = string;
    };
    const getName = () => name;
        
    let marker = '';
    const setMarker = function(value) {
        // value corresponds to player1/player2
        marker = value;
    };
    const getMarker = () => marker;

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
    const getRecord = () => `(${record.wins}, ${record.losses},`
        + `${record.draws})`;
    const clearRecord = function() {
        Object.keys(record).forEach((key) => {
            record[key] = 0;
        });
    };

    return {
        setName,
        getName,
        setMarker,
        getMarker,
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

    const getBoard = () => board;
    const checkVacant = function(row, column) {
        let cell = board[row-1][column-1];
        if (cell.getValue() === 0) {
            return true;
        } else {
            return false;
        };
    };
    const placeMarker = function(player, row, column) {
        
        // check for empty cell at given reference
        if (checkVacant(row, column)) {
            
            // use addMarker method on Cell
            board[row-1][column-1].addMarker(player);
            return true;
        } else {
            return false;
        };

    };
    const printBoard = function() {
        
    };
    const checkFull = function() {
        
        let result = true;

        getBoard().forEach( (row) => {
            let anyEmptyInRow = row.filter( (cell) => {
                return cell.getValue() === 0;
            });

            if (anyEmptyInRow.length > 0) {
                result = false;
                return;
            };
        });

        return result;
    };

    return {
        getBoard,
        placeMarker,
        printBoard,
        checkFull,
    };
}

// Factory function for each cell on the game board
function Cell() {
    let value = 0;
    const addMarker = (playerMarker) => {
        value = playerMarker;
    };
    const getValue = () => value;
    
    return {
        addMarker,
        getValue,
    };
}

function GameController(
    playerOneObj,
    playerTwoObj
) {
    // create a board
    const board = Gameboard();

    let activePlayer = playerOneObj;
    let inactivePlayer = playerTwoObj;
    const winCondition = {
        row: '',
        column: '',
        diagonal: '',
        drawStatus: false,
    };

    // change player order upon rematch
    const switchPlayerTurn = function() {
        if (activePlayer === playerOneObj) {
            activePlayer = playerTwoObj;
            inactivePlayer = playerOneObj;
        } else {
            activePlayer = playerOneObj;
            inactivePlayer = playerTwoObj;
        };
    };
    const playRound = function(row, column) {
        // verify that the selected location is open
        /*
        placeMarker() includes logic to check for valid/invalid move. When
        executed, it places marker if valid. Always returns a boolean for
        valid/invalid move
        */
        if (board.placeMarker(activePlayer.getMarker(), row, column)) {
            checkGameOver();
            switchPlayerTurn();
        } else {
            return;
        };
    };
    const checkGameOver = function() {
        const playerMarker = activePlayer.getMarker();
        let gameOverStatus;

        // check if any row has cells which contain the same marker
        board.getBoard().forEach( (row, index) => {
            
            // check within the cells of a given row
            let markersInRow = row.filter( (cell) => {
                return cell.getValue() === playerMarker;
                // returns array with the player's markers in each row
            });

            // check if any row has 3 of the player's marker
            if (markersInRow.length === 3) {
                winCondition.row = index;
            };
        });


        // check if any column/diagonal has three markers

        // contains a count of markers in each column
        const markersInCol = [0, 0, 0];
        // contains count of markers in each diagonal
        const markersInDiag = [0, 0];

        // loops through each row
        board.getBoard().forEach( (row, rowIndex) => {
            
            // check in each column of current row for player's marker
            row.forEach( (cell, colIndex) => {
                

                if (cell.getValue() === playerMarker) {
                    
                    // increase count in column tracking array
                    markersInCol[colIndex]++;

                    // increase count in diagonal tracking array
                    switch (rowIndex) {
                        case 0:     // top row
                            if (colIndex === 0) {
                                // top-left is part of diagonal #1
                                markersInDiag[0]++;
                            } else if (colIndex === 2) {
                                // top-right is part of diagonal #2
                                markersInDiag[1]++;
                            };

                        break;
                        case 1:     // middle row
                            if (colIndex === 1) {
                                // middle-middle is part of both diagonals
                                markersInDiag.forEach( (index) => {
                                    markersInDiag[index]++;
                                });
                            };
                        break;
                        case 2:     // bottom row
                            if (colIndex === 0) {
                                // bottom-left is part of diagonal #2
                                markersInDiag[1]++;
                            } else if (colIndex === 2) {
                                // bottom-right is part of diagonal #1
                                markersInDiag[0]++;
                            };
                        break;
                    };

                };
            });
        });

        // check for column win condition in the marker tracking array
        const winCol = markersInCol.findIndex( (column) => {
            return column === 3;
        });

        // if tracking array showed a win, then put that in winCondition object
        if (winCol !== -1) {
            winCondition.column = winCol;
        };

        // check for diagonal win condition in the marker tracking array
        const winDiag = markersInDiag.findIndex( (diagonal) => {
            return diagonal === 3;
        });

        // if tracking array showed a win, then put that in winCondition object
        if (winDiag !== -1) {
            winCondition.diagonal = winDiag;
        };

        // check if winCondition has numbers for any of its values
        let playerWon = false;

        if ( Number.isInteger(winCondition.row)
            || Number.isInteger(winCondition.column)
            || Number.isInteger(winCondition.diagonal) ) {

            playerWon = true;
        };

        
        // check if all cells full and no win condition
        let allCellsFull = board.checkFull();
        if (allCellsFull && !playerWon) {
            winCondition[drawStatus] = true;
        };

        if (playerWon || winCondition.drawStatus) {
            gameOverStatus = true;
        } else {
            gameOverStatus = false;
        };
        
        return gameOverStatus;
    };
    const incrementRecords = function() {
        if ( winCondition.drawStatus === false ) {
            activePlayer.addWin();
            inactivePlayer.addLoss();
        } else {
            activePlayer.addDraw();
            inactivePlayer.addDraw();
        };
    };

    return {
        playRound,
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
            this.playerOneBtn = document.querySelector('');
            this.playerTwoBtn = document.querySelector('');
            this.playerNilBtn = document.querySelector('');
            // this will allow for player order listeners to be on one selector
            this.playerCard = document.querySelector('');
        },
        bindEvents: function() {
            this.addPlayerBtn
                .addEventListener('click', this.addPlayer.bind(this));
            // Player order listeners can be combined into one
            this.playerOneBtn
                .addEventListener('click', this.setPlayerOne.bind(this));
            this.playerTwoBtn
                .addEventListener('click', this.setPlayerTwo.bind(this));
            this.playerNilBtn
                .addEventListener('click', this.unsetOrder.bind(this));
        },
        render: function() {

        },
        addPlayer: function(name) {
            const newPlayer = Player();
            // newPlayer.setName(this.addPlayerInput.value);
            newPlayer.setName(name); // just for console testing
            this.players.push(newPlayer);
            
            let playerIndex = this.players.length - 1;
            this.setDefaultOrder(playerIndex);
        },
        getPlayerOne: function() {
            // Look in player array for players with marker = 1
            const playerOneSearch = this.players.findIndex( (player) => {
                return player.getMarker() === 1;
            });
            return playerOneSearch;
        },
        getPlayerTwo: function() {
            // Look in player array for players with marker = 2
            const playerTwoSearch = this.players.findIndex( (player) => {
                return player.getMarker() === 2;
            });
            return playerTwoSearch;
        },
        setPlayerOrder: function(event) {
            // get dataset value on the player card
            let playerIndex = event.target.parentElement.parentElement
                .dataset.playerIndex;
            // get the button ID to know which player order is being set
            let playerOrder = event.target.classList;
            switch (playerOrder) {
                case 'player-one':
                    this.setPlayerOne(playerIndex);
                break;
                case 'player-two':
                    this.setPlayerTwo(playerIndex);
                break;
                case 'nil':
                    this.setPlayerNil(playerIndex);
                break;
            };
        },
        setDefaultOrder: function(playerIndex) {
            // set default player order (for use when player first created)
            let p1Unset = this.getPlayerOne() < 0;
            let p2Unset = !p1Unset && this.getPlayerTwo() < 0;
            let bothSet = !p1Unset && this.getPlayerTwo() >= 0;
            // set player order depending on which players are already set
            if (p1Unset) {
                this.setPlayerOne(playerIndex);
            } else if (p2Unset) {
                this.setPlayerTwo(playerIndex);
            } else if (bothSet) {
                this.setPlayerNil(playerIndex);
            };
        },
        setPlayerOne: function(playerIndex) {
            this.players[playerIndex].setMarker(1);
        },
        setPlayerTwo: function(playerIndex) {
            this.players[playerIndex].setMarker(2);
        },
        setPlayerNil: function(playerIndex) {
            this.players[playerIndex].setMarker('');
        },
        switchPlayerOrder: function(playerOneIndex, playerTwoIndex) {
            this.players[playerOneIndex].setMarker(2);
            this.players[playerTwoIndex].setMarker(1);
        },
        unsetOrder: function(playerIndex) {
            this.players[playerIndex].setMarker('');
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
        render: function() {
            
        },
        playGame: function() {
            const game = GameController();
        },
        returnHome: function() {

        },
    }
// })();