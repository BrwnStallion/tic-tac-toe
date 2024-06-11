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
        let cell = board[row][column];
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
            board[row][column].addMarker(player);
            return true;
        } else {
            return false;
        };

    };
    const printBoard = function() {
        console.log(
            `${board[0][0].getValue()} | ${board[0][1].getValue()} | ` + 
            `${board[0][2].getValue()}\n${board[1][0].getValue()} | ` +
            `${board[1][1].getValue()} | ${board[1][2].getValue()}\n` +
            `${board[2][0].getValue()} | ${board[2][1].getValue()} | ` +
            `${board[2][2].getValue()}`
        );
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

    // change active player so that turns alternate
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
            
            board.printBoard();

            // checkGameOver() ? incrementRecords() : switchPlayerTurn();
            if (checkGameOver()) {

                if (!winCondition.drawStatus) {
                    console.log(`game over, ${activePlayer.getName()} wins`);
                } else {
                    console.log(`game over, draw`);
                };

                incrementRecords();

            } else {
                switchPlayerTurn();
            };

        } else {
            // wasn't a valid move - do nothing
            console.log('invalid move. try again');
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

        // contains a count of active player's markers in each column
        const markersInCol = [0, 0, 0];
        // contains count of active player's markers in each diagonal
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
                                markersInDiag.forEach( (value, index) => {
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
            winCondition.drawStatus = true;
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
    const getWinCondition = () => winCondition;

    return {
        playRound,
        checkGameOver,
        getWinCondition,
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
            // enforce unique name

            // newPlayer.setName(this.addPlayerInput.value);
            newPlayer.setName(name); // just for console testing
            this.players.push(newPlayer);
            
            let playerIndex = this.players.length - 1;
            this.setDefaultOrder(playerIndex);
        },
        // players created when playGame() executed
        forceSetPlayers: function() {
            switch (this.players.length) {
                case 0:
                    this.addPlayer('Player A');   // auto set to P1
                    this.addPlayer('Player B');   // auto set to P2
                break;
                case 1:
                    this.addPlayer('Player A');   // auto set to available P#
                break;
            };
        },
        // order set when playGame() executed
        forceSetOrder: function() {
            /* 
            Scenario: 2+ players, no order set
                - assign P1 to players[0], P2 to players[1]
            Scenario: 2+ players, one order set
                - don't know which player has their order set
                - don't know which order is set
                - get player index for P1/P2
                - get length of players array
                - set first available order to first available player
            */
            const playersAmount = this.players.length;
            const orderChecking = this.checkIfOrderSet();
            
            if (orderChecking.bothSet) {
                return;     // exit the method and do nothing
            };

            if (playersAmount >= 2) {
                
                let playerSetIndex;
                let setAction;
                
                // scenario 1: 2+ players, and no order is set (P1 nor P2)
                if (orderChecking.noneSet) {
                    this.setPlayerOne(0);
                    this.setPlayerTwo(1);
                    return;     // exit the method; no need to continue
                    
                // scenario 2a: P1 unset (P2 set)
                } else if (orderChecking.p1Unset) {

                    playerSetIndex = this.getPlayerTwo();
                    setAction = this.setPlayerOne.bind(this);
                    
                // scenario 2b: P2 unset (P1 set)
                } else if (orderChecking.p2Unset) {

                    playerSetIndex = this.getPlayerOne();
                    setAction = this.setPlayerTwo.bind(this);
                };
                
                /* only true for values less than 2, and for values that are
                not equal to set player's index */
                for (let playerIndex = 0; playerIndex < 2; playerIndex++) {
                    
                    if (playerIndex !== playerSetIndex) {
                        setAction(playerIndex);
                        return;
                    };
                };
            };
        },
        // user sets player order via DOM
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
        // default order set when player created
        setDefaultOrder: function(playerIndex) {
            // set default player order (for use when player first created)
            const orderChecking = this.checkIfOrderSet();
            // set player order depending on which players are already set
            if (orderChecking.p1Unset) {
                this.setPlayerOne(playerIndex);
            } else if (orderChecking.p2Unset) {
                this.setPlayerTwo(playerIndex);
            } else if (orderChecking.bothSet) {
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
        getPlayerOne: function() {
            // Look in player array for players with marker = 1
            const playerOneSearch = this.players.findIndex( (player) => {
                return player.getMarker() === 1;
            });
            return playerOneSearch;     // index or -1
        },
        getPlayerTwo: function() {
            // Look in player array for players with marker = 2
            const playerTwoSearch = this.players.findIndex( (player) => {
                return player.getMarker() === 2;
            });
            return playerTwoSearch;     // index or -1
        },
        checkIfOrderSet: function() {
            let p1Unset = this.getPlayerOne() < 0;      // no P1 set
            let p2Unset = !p1Unset && this.getPlayerTwo() < 0;  // no P2 set
            let bothSet = !p1Unset && this.getPlayerTwo() >= 0; // both set
            let noneSet = p1Unset && this.getPlayerTwo() < 0; // none set
            return {
                p1Unset,
                p2Unset,
                bothSet,
                noneSet
            };
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
        errors: {},
        cacheDom: function() {
            this.playBtn = document.querySelector('');
            this.playAgainBtn = document.querySelector('');
            this.returnHomeBtn = document.querySelector('');
            this.cellArea = document.querySelector('');
        },
        bindEvents: function() {
            this.playBtn
                .addEventListener('click', this.playGame.bind(this));
            this.playAgainBtn
                .addEventListener('click', this.playGame.bind(this));
            this.cellArea
                .addEventListener('click', this.makeMove.bind(this));
            this.returnHomeBtn
                .addEventListener('click', this.returnHome.bind(this));
        },
        render: function() {
            
        },
        playGame: function() {
            /*
            - if players aren't set, create the needed amt of default players
            - this will set at least player two order
            - if order isn't set, set it according to what's unset
            - i need to know what's unset
            - set it according to sequence in players object
            */
           playerModule.forceSetPlayers();
           playerModule.forceSetOrder();

           this.game = GameController(
                playerModule.players[playerModule.getPlayerOne()],
                playerModule.players[playerModule.getPlayerTwo()]);
        },
        makeMove: function(row, col) {   // change to (event) when linked to DOM
            /* this is for when it's linked to the DOM.  */
            // const row = event.target.dataset.row;
            // const col = event.target.dataset.col;
            this.game.playRound(row, col);
        },
        returnHome: function() {
            this.game = '';
        },
    }
// })();