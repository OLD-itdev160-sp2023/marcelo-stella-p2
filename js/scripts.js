const wordBank = ["house", "birthday", "fridge", "building", "programming", "computer", 
"variable", "object", "wedding", "phone", "bottle", "subway", "container", "keyboard"];

const maxGuesses = 6;
var currentWord = '';
let currentGuesses = [];
let guessesLeft = 0;

const hangmanDisplay = document.querySelector('.hangman');
const messageDisplay = document.querySelector('#message');
const wordDisplay = document.querySelector('#word-display');
const guessInput = document.querySelector('#guess');

function initGame(){
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    currentGuesses = Array(currentWord.length).fill('_');
    guessesLeft = maxGuesses;
    guessInput.disabled = false;
    hangmanDisplay.className = 'hangman';
    updateDisplay();
}

function updateDisplay(){
    messageDisplay.textContent = `Remaining guesses: ${guessesLeft}`;
    wordDisplay.textContent = currentGuesses.join(' ');
    guessInput.value = '';
    updateHangman();
}

//Function to hide hangman limbs
function updateHangman(){
    const numWrongGuesses = maxGuesses - guessesLeft;
    const limbs = ['left-arm', 'right-arm', 'left-leg', 'right-leg', 'body', 'head'];
    limbs.forEach((limb, index) => {
        if(index < numWrongGuesses){
            hangmanDisplay.classList.add(`wrong-${limb}`);
        } else {
            hangmanDisplay.classList.remove(`wrong-${limb}`);
        }
    });
    if(numWrongGuesses === maxGuesses){
        messageDisplay.textContent = `Game over! The word was "${currentWord}".`;
        guessInput.disabled = true;
    }
}

//Function to display a message after input
function handleGuess(e){
    e.preventDefault();
    const guess = guessInput.value.toLowerCase();
    if(!guess.match(/[a-z]/)){
        messageDisplay.textContent = `Please enter a letter from a to z.`;
        return;
    }
    if(currentGuesses.includes(guess)){
        messageDisplay.textContent = `You already guessed the letter "${guess}".`;
        return;
    }
    const indices = [];
    for(var i = 0; i < currentWord.length; i++){
        if(currentWord[i] === guess){
            indices.push(i);
        }
    }
    if(indices.length === 0){
        guessesLeft--;
        messageDisplay.textContent = `Sorry, there are no "${guess}" in the word`;
    }else{
        indices.forEach(index => {
            currentGuesses[index] = guess;
        });
        messageDisplay.textContent = `Good guess! The letter "${guess}" is in the word!`
    }
    updateDisplay();
    if(currentGuesses.join('') === currentWord){
        messageDisplay.textContent = `Congratulations! You guessed the word "${currentWord}"!`;
        guessInput.disabled = true;
    }
}

initGame();
document.querySelector('form').addEventListener('submit', handleGuess);


//New game button
var newGame = document.getElementById('new-game');
newGame.addEventListener('click', initGame);