'use strict'

const NUMBER_OF_CHOICES = 3;

let humanScore = 0, computerScore = 0;

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