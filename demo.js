let starPosition;
const totalBoxes = 15;
const maxGuesses = 29;
let guessesLeft = maxGuesses;
let isGameOver = false;

function startGame() {
    starPosition = Math.floor(Math.random() * totalBoxes);
    guessesLeft = maxGuesses;
    isGameOver = false;
    updateGuessesLeftDisplay();
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.dataset.index = i;
        box.textContent = i + 1; // Label boxes from 1 to 15
        box.addEventListener('click', () => makeGuess(i));
        container.appendChild(box);
    }
    clearGuessIndications();
    updateStarVisual(); // For debugging
}

function makeGuess(index) {
    if (isGameOver) {
        return; // Prevent guesses after the game has ended
    }
    const guessedBox = document.querySelector(`.box[data-index="${index}"]`);
    if (index === starPosition) {
        guessedBox.innerText = 'YES';
        guessedBox.style.backgroundColor = 'yellow'; // Highlight the correct box immediately upon finding
        isGameOver = true;
        disableBoxes();
        showModal('Congratulations! You found the Valentine!', 'Valentine.png');
    } else {
        guessedBox.innerText = 'NO';
        guessesLeft--;
        updateGuessesLeftDisplay();

        // Delay before resetting the text and moving the star
        setTimeout(() => {
            guessedBox.textContent = index + 1; // Reset to show its original number
            
            if (guessesLeft <= 0) {
                showModal('Unfortunately, you have run out of days. <br>The secret Valentine message, sadly, has been destroyed.','Destroyed_Valentine.png');
                isGameOver = true;
                disableBoxes();
                // Reveal the star location after game over
                document.querySelectorAll('.box')[starPosition].style.backgroundColor = 'yellow';
            } else {
                moveStar(); // Move the star after showing 'NO' briefly and updating the box
                updateStarVisual(); // Update the visual to show the star's new location
            }
        }, 700); // Delay in milliseconds
    }
}



function moveStar() {
    if (starPosition === 0) {
        starPosition = 1;
    } else if (starPosition === totalBoxes - 1) {
        starPosition = totalBoxes - 2;
    } else {
        let moveDirection = Math.random() < 0.5 ? -1 : 1;
        starPosition += moveDirection;
    }
    updateStarVisual();
}

function disableBoxes() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.classList.add('disabled');
    });
}

function clearGuessIndications() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        // Reset each box to its number, effectively clearing previous indications
        if (!box.classList.contains('disabled')) { // Check if the game is not over
            box.textContent = index + 1;
        }
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
    guessesLeftSpan.innerText = `Days Left: ${guessesLeft}`;
}

function showModal(message, imageUrl) {
    document.getElementById('modal-text').innerHTML = message;
    // Set the image source
    document.getElementById('modal-image').src = imageUrl;
    // Show the modal
    document.getElementById('myModal').style.display = "block";
}


// When the user clicks on <span> (x), close the modal
document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('myModal').style.display = "none";
});

// Get the modal
var modal = document.getElementById('myModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


startGame(); // Initialize the game




