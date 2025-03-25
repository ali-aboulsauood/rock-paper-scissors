'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const NUMBER_OF_CHOICES = 3;

    let humanScore = 0, computerScore = 0;
    let roundNumber = 1;

    const DEFAULT_WINNING_SCORE = 5;
    function playRound(humanChoice) {
        function getComputerChoice() {
            let computerChoice = parseInt(Math.random() * NUMBER_OF_CHOICES + 1);

            return computerChoice;
        }

        let computerChoice = getComputerChoice();
        
        function nameOf(choice) {
            switch (choice) {
                case 1: return 'rock';
                case 2: return 'paper';
                case 3: return 'scissors';
                
                default: return null;
            }
        }

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

        function setScores() {
            if (roundResult_ !== 2) {
                roundResult_ ? humanScore++ : computerScore++;
            }
        }

        setScores();

        function displayRoundStats() {
            function displaySelectedChoices() {
                const humanChoiceDiv = document.querySelector('.human-stats .choice');
                const computerChoiceDiv = document.querySelector('.computer-stats .choice');

                const selectedHumanChoice = document.querySelector(`.button.choice.${nameOf(humanChoice)}`).cloneNode(true);
                const selectedComputerChoice = document.querySelector(`.button.choice.${nameOf(computerChoice)}`).cloneNode(true);

                selectedHumanChoice.setAttribute("disabled", "");
                selectedHumanChoice.setAttribute("disabled", "");

                humanChoiceDiv.replaceWith(selectedHumanChoice);
                computerChoiceDiv.replaceWith(selectedComputerChoice);
            }

            function displayRoundResults() {
                const humanScoreDiv = document.querySelector('.human-score');
                const computerScoreDiv = document.querySelector('.computer-score');

                humanScoreDiv.textContent = humanScore;
                computerScoreDiv.textContent = computerScore;
            }


            function displayHumanStatus() {
                const winColor = "rgb(0, 255, 0)", loseColor = "rgb(255, 0, 0)", drawColor = "rgb(255, 255, 255)";
                const colors = [loseColor, winColor, drawColor];

                function setColors() {
                    const bodyDiv = document.querySelector('.body');
                    const gameStatsDiv = document.querySelector('.stats');
    
                    const color = colors.at(roundResult_);
    
                    bodyDiv.style.borderColor = gameStatsDiv.style.borderColor = color;
                }

                const roundPossibilities = ["Round lost!", "Round won!", "Draw..."];
                const gamePossibilities = ["Game lost!", "Game won!"];

                const humanStatusDiv = document.querySelector('.game-result');

                const possibilities = isGameOver() ? gamePossibilities : roundPossibilities;

                humanStatusDiv.textContent = possibilities.at(roundResult_);
                humanStatusDiv.style.color = colors.at(roundResult_);
            }

            displaySelectedChoices();
            displayRoundResults();
            displayHumanStatus();
        }

        displayRoundStats();

        roundNumber++;

        const roundNumberSpan = document.querySelector('.round-title .highlight');
        roundNumberSpan.textContent = roundNumber;
    }

    function isGameOver() {
        return humanScore === DEFAULT_WINNING_SCORE || computerScore === DEFAULT_WINNING_SCORE;
    }

    function checkRestart() {
        if (isGameOver()) {
            const restart = document.querySelector('.restart');
            restart.removeAttribute("hidden");
        
            restart.addEventListener('click', () => {
                window.location.reload();
            });

            window.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    window.location.reload();
                }
            })
        }
    }

    window.addEventListener('beforeunload', function (e) {
        if (!isGameOver()) {
            e.preventDefault();
            e.returnValue = '';
        }
    })

    function getHumanChoiceMouse(event) {
        const button = event.target.closest('.button.choice');
        
        if (!button) return;

        if (button.classList.contains('rock')) return 1;
        if (button.classList.contains('paper')) return 2;
        if (button.classList.contains('scissors')) return 3;
    }

    function getHumanChoiceKeyboard(event) {
        switch (event.key) {
            case '1':
            case 'r':
                return 1;

            case '2':
            case 'p':
                return 2;

            case '3':
            case 's':
                return 3;
            
            default: return null;
        }
    }

    let humanChoice = null;

    const choices = document.querySelector('.choices');

    choices.addEventListener('click', function (e) {
        if (!isGameOver()) {
            humanChoice = getHumanChoiceMouse(e);
            playRound(humanChoice);
            checkRestart();
        }
    })
    window.addEventListener('keydown', function (e) {
        if (!isGameOver()) {
            humanChoice = getHumanChoiceKeyboard(e);
            if (humanChoice)
                playRound(humanChoice);
            checkRestart();
        }
    })
});