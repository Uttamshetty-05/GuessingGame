
let secretNumber;
let attempts = 0;
const MAX_ATTEMPTS = 10;

const guessInput = document.getElementById('guessInput');
const checkButton = document.getElementById('checkButton');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');


function startGame() {
 
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    message.textContent = 'Take your first guess!';
    attemptsDisplay.textContent = 'Attempts: 0';
    guessInput.value = '';
    guessInput.disabled = false;
    checkButton.disabled = false;
    resetButton.style.display = 'none';

    console.log(`New Secret Number (Dev Only): ${secretNumber}`);
}

function checkGuess() {
    const userGuess = parseInt(guessInput.value);


    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = '⚠️ Please enter a valid number between 1 and 100.';
        return;
    }

    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;

    if (userGuess === secretNumber) {
        message.textContent = `🎉 Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts!`;
        endGame(true);
    } else if (userGuess < secretNumber) {
        message.textContent = '⬆️ Too low! Try a higher number.';
    } else {
        message.textContent = '⬇️ Too high! Try a lower number.';
    }

    if (attempts >= MAX_ATTEMPTS && userGuess !== secretNumber) {
        message.textContent = `Game Over! You ran out of attempts. The number was ${secretNumber}.`;
        endGame(false);
    }

    guessInput.value = '';
}


function endGame(win) {
    guessInput.disabled = true;
    checkButton.disabled = true;
    resetButton.style.display = 'block'; 
}

checkButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', startGame);

guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});
startGame();