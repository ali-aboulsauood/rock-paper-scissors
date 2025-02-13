'use strict'

const NUMBER_OF_CHOICES = 3;

// TODO: Use arrays to improve the program.

function getComputerChoice() {
    // refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values for more information about how the following statement works.

    let computerChoice = parseInt(Math.random() * NUMBER_OF_CHOICES + 1);

    return computerChoice;
}

function getHumanChoice() {
    const message = "Please enter your choice in the textbox below:"
    const hint = "Enter '1' or 'Rock' for Rock, '2' or 'Paper' for Paper, '3' or 'Scissors' for Scissors. Inputs are case-insensitive."

    // TODO: Add an option to fill the textbox with a random choice chosen by the computer for the player.

    let humanChoice = prompt(message + '\n\n' + hint + '\n');

    let humanChoice_ = String(humanChoice).toLowerCase();

    switch (humanChoice_) {
        case '1':
        case "rock":
            return 1;

        case '2':
        case "paper":
            return 2;

        case '3':
        case "scissors":
            return 3;

        default:
            alert("You have entered an invalid choice. Please try again.");

            // TODO: Use a safer implementation than recursion.
            return getHumanChoice();
    }
}

function playGame() {
    let humanScore = 0, computerScore = 0;
    
    function playRound(humanChoice = getHumanChoice(), computerChoice = getComputerChoice()) {
        function nameOf(choice) {
            switch (choice) {
                case 1:
                    return "Rock";
                case 2:
                    return "Paper";
                case 3:
                    return "Scissors"
    
                default:
                    throw Error("Argument does not represent a valid choice.");
            }
        }
    
        const nameOfHumanChoice = nameOf(humanChoice), nameOfComputerChoice = nameOf(computerChoice);
    
        function roundResult(humanChoice, computerChoice) {
            if (humanChoice === computerChoice) {
                return 2;
            }
    
            if (humanChoice < computerChoice) {
                return (humanChoice === 1 && computerChoice === 3) ? 1 : 0;
            } else {
                return (humanChoice === 3 && computerChoice === 1) ? 0 : 1;
            }
        }
    
        const roundResult_ = roundResult(humanChoice, computerChoice);
    
        if (roundResult_ !== 2) {
            roundResult_ ? humanScore++ : computerScore++;
        }
    
        let winningChoice = null, losingChoice = null;
        assignChoices();
    
        function assignChoices() {
            if (roundResult_ === 2) {
                return;
            }
    
            if (roundResult_) {
                winningChoice = nameOfHumanChoice;
                losingChoice = nameOfComputerChoice;
            } else {
                winningChoice = nameOfComputerChoice;
                losingChoice = nameOfHumanChoice;
            }
        }
    
        function humanStatus() {
            if (roundResult_ === 2) {
                return "are at a draw with the computer...";
            }
    
            return roundResult_ ? "win!" : "lose!";
        }
    
        let result = 
        `
        You have chosen ${nameOfHumanChoice}.
        The computer has chosen ${nameOfComputerChoice}.
    
        You ${humanStatus()}`;
    
        if (roundResult_ !== 2) {
            result += ' ' + `${winningChoice} beats ${losingChoice}!`
        }
    
        result += 
        `
    
        Your Score: ${humanScore} points.
        Computer Score: ${computerScore} points.
        `
    
        alert(result);
    }
}