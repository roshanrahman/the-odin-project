let statusText = null;
let recordContainer = null;
let computerText = null;
let playerScore = 0;
let computerScore = 0;
let round = 0;
let buttonPanel = null;
const MAX_ROUNDS = 10;

window.onload = function () {
    statusText = document.querySelector("#statusText");
    computerText = document.querySelector(".computer");
    recordContainer = document.querySelector(".record");
    buttonPanel = document.querySelector(".btn-panel");
    statusText.innerHTML = "Game not yet started";
}


let endGame = function() {
    console.log("Endgame fired");
    buttonPanel.setAttribute("style", "display: none;");
    document.querySelector(".reset").setAttribute("style", "display: block;");
    document.querySelector(".computer").setAttribute("style", "display: block;");
    document.querySelector(".status").setAttribute("style", "display: block;");
    if(playerScore > computerScore) {
        statusText.innerHTML = ("<b>You are the WINNER! Congratulations!</b>");
    } else if(playerScore < computerScore) {
        statusText.innerHTML = ("<b>Sorry, you lost to Computer. Try again :)</b>");
    } else {
        statusText.innerHTML = "<b>It was a draw! You and Computer have the same score!</b>";
    }

}

let resetGame = function () {
    window.location.reload();
}

let getUserSelection = function (userSelection) {
    if(round >= MAX_ROUNDS) {
        endGame();
        return;
    }
    let result = playRound(userSelection, computerPlay());

    if (result === 1) {
        playerScore += 1;
        round += 1;
        let pe = document.createElement("p");
        let text = "Round: " + round.toString() + " won by Player. Player's Score: " + playerScore.toString() + " Computer's Score: " + computerScore.toString();
        text = document.createTextNode(text);
        pe.appendChild(text);
        recordContainer.appendChild(pe);
        return;
    } else if (result === -1) {
        computerScore += 1;
        round += 1;
        let pe = document.createElement("p");
        let text = "Round: " + round.toString() + " won by Computer. Player's Score: " + playerScore.toString() + " Computer's Score: " + computerScore.toString();
        text = document.createTextNode(text);
        pe.appendChild(text);
        recordContainer.appendChild(pe);
        console.log(pe);
        return;
    }
}

let computerPlay = function () {
    let choice = Math.floor(Math.random() * 3);
    let computerSelected = ['rock', 'paper', 'scissor'][choice];
    computerText.innerHTML = "Computer selected: " + (computerSelected.toString()).toUpperCase();
    return computerSelected;
}

let playRound = function (playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if (playerSelection === "rock" && computerSelection === "scissor") {
        statusText.innerHTML = ("You win this round! Rock beats Scissor");
        return 1;
    }
    else if (playerSelection === "rock" && computerSelection === "paper") {
        statusText.innerHTML = ("You lose this round! Paper beats Rock");
        return -1;
    }
    else if (playerSelection === "scissor" && computerSelection === "rock") {
        statusText.innerHTML = ("You lose this round! Rock beats Scissor");
        return -1;
    }
    else if (playerSelection === "scissor" && computerSelection === "paper") {
        statusText.innerHTML = ("You win this round! Scissor beats Paper");
        return 1;
    }
    else if (playerSelection === "paper" && computerSelection === "scissor") {
        statusText.innerHTML = ("You lose this round! Scissor beats Paper");
        return -1;
    }
    else if (playerSelection === "paper" && computerSelection === "rock") {
        statusText.innerHTML = ("You win this round! Paper beats Rock");
        return 1;
    } else {
        statusText.innerHTML = ("Draw!");
        return 0;
    }
}

