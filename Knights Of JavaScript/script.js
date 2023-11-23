// these values are set at the beginning
// and then used throughout the game
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}


// function that considers which player's turn it is and then
// changes the UI accordingly
function changePlayer() {
    // if the current player is player 1 at the end of a move
    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // conversts the innerHTML from string to a number and stores it in a variable
        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        // reduces by 10
        playerTwoHealthNum -= 10;
        // resets the HTML to the new value
        playerTwoHealth.innerHTML = playerTwoHealthNum;

        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerTwoHealthNum = 0;
            // ends the game
            gameOver();
        }
        else {
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 2;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }

    //see if its player 2's turn
    else if(gameState.whoseTurn === 2){
        //get player1 html element with dom getelementbyid
        let playerOneHealth = document.getElementById("playerOneHealth");
        //get the innerHTML  and change it to a number type and save to the variable playerOneHealthNum
        let playerOneHealthNum = Number(playerOneHealth.innerHTML);
        //generate a random number with Math.random save to a variable called randomDamage
        const randomDamage = Math.floor(Math.random() * 20 + 1);
        //subtract randomDamage from playerOneHealthNum
        playerOneHealthNum -= randomDamage;
        //set playerOneHealth innerHTML  to playerOneHealthNum
        playerOneHealth.innerHTML = playerOneHealthNum;

        //check if playerOneHealth num is 0 or less than 0
        if (playerOneHealthNum <= 0){
            //if it is: then the game is over -> call gameOver()
            playerOneHealthNum = 0;
            gameOver();
        }
        else {
            //if playerOneHealthNum is not 0 or less: it's back to player one's turn 
            gameState.whoseTurn = 1;
        //select playerOne's name html element   
        let playerName = document.getElementById("playerName");
        //update the text value of the playerName html element using innerHTML to declare whos turn it is
        playerName.innerHTML = `Player ${gameState.whoseTurn}`;
     }
        
    }
}

// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
    let title = document.getElementById("title");
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: none;";

    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`

    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";
}

// function that allows the player two attack button to reduce the player two's
// health
function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    // this also DISABLES the button, meaning they are not interactable
    function changeButtonStatus() {
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        playerTwoAttackButton.disabled = true;
        playerTwoAttackButton.classList.add("inactive");
        playerTwoAttackButton.classList.remove("active");

        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = false;
        playerOneAttackButton.classList.add("active");
        playerOneAttackButton.classList.remove("inactive");
    }

    // commpartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        // an array containing the images using in player one's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerOneSprite");
        // function we will call in setTimeout, before the frames change back
        // the idle stance
        // in other words, we set to the attack sprite, wait 3 seconds,
        // then set it back to the idle sprite
        playerSprite.src = playerOneFrames[1];
        
        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage
        enemyDamage.play();

        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }

    // for easy reading,
    // we do not include ALL of the above code within this condition
    // instead, we create higher-order functions to keep the code neat and readable
    if (gameState.whoseTurn === 1) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}
// function that allows player one's health to be reduced
function attackPlayerOne() {
// changes the status of whos turn it is when a player is attacked
    function changeButtonStatus() {
        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = true;
        playerOneAttackButton.classList.add("inactive");
        playerOneAttackButton.classList.remove("active");

        let playerTwoAttackButton = document.getElementById("playerTwoAttack")
        playerTwoAttackButton.disabled = false;
        playerTwoAttackButton.classList.add("active");
        playerTwoAttackButton.classList.remove("inactive");
    }
    // animates the players images one screen 
    function animatePlayer() {
        let playerTwoFrames = [
            "./images/L_Idle.png",
            "./images/L_Attack.png"
        ];
        // changes the images when attacked 
        let playerSprite=document.getElementById("playerTwoSprite");
        playerSprite.src = playerTwoFrames[1];
        playerSprite.classList.remove("idle");
        playerSprite.classList.add("attack");

        let enemySprite = document.getElementById("playerOneSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        enemySprite.classList.remove("idle");
        enemySprite.classList.add("damage");
        enemyDamage.play();
        // changes the images when in idle taking damage
        function changePlayerTwoSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerTwoFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }
        setTimeout(changePlayerTwoSprite, 350);
        // sets a 350 millisecond timer to switch between images
    }

    if (gameState.whoseTurn === 2) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}