/*
const boxes = document.querySelectorAll('#game-container .box');
const message = document.getElementById('message');
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess');

let hiddenStar = Math.floor(Math.random() * 15) + 1;
let remainingGuesses = 5;

ccccccccccccccccc

function updateBoxState(index, state) {
    const box = boxes[index - 1];
    box.classList.remove('empty', 'highlighted', 'revealed');
    box.classList.add(state);
}

guessForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const guess = parseInt(guessInput.value);

    if (guess >= 1 && guess <= 15) {
        updateBoxState(guess, 'highlighted');

        if (guess === hiddenStar) {
            message.textContent = 'You guessed it! ';
            updateBoxState(hiddenStar, 'revealed');
            remainingGuesses = 0;
        } else {
            message.textContent = guess > hiddenStar ? 'Too high! ' : 'Too low! ';
            hiddenStar = Math.random() > 0.5 ? hiddenStar + 1 : hiddenStar - 1;
            remainingGuesses--;
            if (remainingGuesses === 0) {
                message.textContent = `Out of guesses! The star was at box ${hiddenStar}.`;
                updateBoxState(hiddenStar, 'revealed');
            } else {
                message.textContent += ` You have ${remainingGuesses} guesses left.`;
            }
        }
        guessInput.value = '';
    } else {
        message.textContent = 'Invalid guess. Please enter a number between 1 and 15.';
    }
});

// Initial box states
boxes.forEach(box => updateBoxState(parseInt(box.dataset.index), 'empty'));
*/

let starPosition;
const totalBoxes = 15;
const maxGuesses = 29;
let guessesLeft = maxGuesses;

function startGame() {
    starPosition = Math.floor(Math.random() * totalBoxes);
    guessesLeft = maxGuesses;
    updateGuessesLeftDisplay(); // Update counter display
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.dataset.index = i;
        box.addEventListener('click', () => makeGuess(i));
        container.appendChild(box);
    }
    clearGuessIndications();
    updateStarVisual(); // For debugging
}

function makeGuess(index) {
    clearGuessIndications();
    if (index === starPosition) {
        alert('You found the star!');
        startGame();
    } else {
        const guessedBox = document.querySelector(`.box[data-index="${index}"]`);
        guessedBox.innerText = 'Empty';
        moveStar();
        guessesLeft--;
        updateGuessesLeftDisplay(); // Update the counter after each guess
        if (guessesLeft <= 0) {
            alert('Out of guesses! Game over.');
            startGame();
        } else {
            updateStarVisual();
        }
    }
}

function moveStar() {
    let moveDirection = Math.random() < 0.5 ? -1 : 1;
    starPosition = Math.max(0, Math.min(totalBoxes - 1, starPosition + moveDirection));
    updateStarVisual();
}

function clearGuessIndications() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.innerText = '';
    });
}

function updateStarVisual() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        box.style.backgroundColor = '';
        if (index === starPosition) {
            box.style.backgroundColor = 'yellow';
        }
    });
}

function updateGuessesLeftDisplay() {
    const guessesLeftSpan = document.getElementById('guesses-left');
    guessesLeftSpan.innerText = `Guesses Left: ${guessesLeft}`;
}

// Initialize the game
startGame();
