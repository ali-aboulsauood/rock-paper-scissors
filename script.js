'use strict'

const NUMBER_OF_CHOICES = 3;

function getComputerChoice() {
    // refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values for more information about how the following statement works.

    let computerChoice = parseInt(Math.random() * NUMBER_OF_CHOICES + 1);

    // TODO: Use an array or a map to replace the following `switch` statement.

    switch (computerChoice) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";

        // Execution can never reach the default case. Added for completeness.
        default:
            return "";
    }
}