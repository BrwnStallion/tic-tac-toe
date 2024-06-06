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

    return {
        getBoard,
        placeMarker,
        printBoard,
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
        let playerMarker = activePlayer.getMarker();
        const winCondition = {
            row: '',
            column: '',
            diagonal: ''
        };

        // check if any row has cells which contain the same marker
        board.getBoard().forEach( (row, index) => {
            // check within the cells of a given row
            let markersInRow = row.filter( (cell) => {
                return cell.getValue() === playerMarker;
            });
            if (markersInRow.length === 3) {
                winCondition.row = index;
            };
        });
        // check if any column has cells which contain the same marker

        // check if the two diagonals have cells which contain the same marker

        
        let playerWon = true;
        activePlayer.addWin();
        inactivePlayer.addLoss();
        
        // check if all cells full and no win condition
        if (/* all cells full logic && */ !playerWon) {
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