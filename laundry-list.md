Tic-Tac-Toe Laundry List

06/10/24 (main)
- Figure out round-playing logic on GameController
- DOM Ideas
    - On each player's card, can have three buttons: P1 O P2
        - You can set and unset various roles. 'O' allows for there to be more
          than two players created.
    - On each player's card, can display their record
    - Change color of winning player's 3 markers upon win-condition
    - Each grid location has a data attribute for row and column
- Player creation
    - If there isn't a player1 in the player array, default it to player1
    - If there's already a player1 and no player2, default it to player2
    - If there's already player1 and player2, default it to nil
- Refactor Cell, Player factories to keep methods on the factory, and let the
  children objects inherit those methods.
    - Is this possible?
- Logic for creating default players if user just clicks 'play game' without
  setting up player profiles
- Logic for ensuring player names are unique. This is on the player module
- Logic for passing row/column/diagonal win information to rendering method
- Logic for win condition and draw condition.
    - COMPLETED

06/06/24 (main)
- Figure out round-playing logic on GameController
- DOM Ideas
    - On each player's card, can have three buttons: P1 O P2
        - You can set and unset various roles. 'O' allows for there to be more
          than two players created.
    - On each player's card, can display their record
    - Change color of winning player's 3 markers upon win-condition
- Player creation
    - If there isn't a player1 in the player array, default it to player1
    - If there's already a player1 and no player2, default it to player2
    - If there's already player1 and player2, default it to nil
- Refactor Cell, Player factories to keep methods on the factory, and let the
  children objects inherit those methods.

06/05/24 (main)
- Create/configure gameController
    - Should it be an IIFE object?
    - Should it be a factory? When and what would instantiate the factory?
- Add logic to allow users to play the game without setting up their players
    - This would mean that you can initiate the game, and player1/player2 will
      be assigned by default

06/04/24 (main)
- Set up main objects for players, gameboard, gamecontroller
- Set up all the files and directories
    - COMPLETE