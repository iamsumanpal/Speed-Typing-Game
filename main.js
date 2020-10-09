window.addEventListener("load", init);

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let currentscore = 0;
let isPlaying;
let high

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const highscore = document.getElementById("highscore");

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition"
];

// Initialize Game
function init() {
  seconds.innerHTML = currentLevel;

  highscore.innerHTML = localStorage.getItem('high')

  wordInput.addEventListener("input", startMatch)

}

function startGame(button) {
  if(button.innerHTML == "Exit Game"){
    document.location.reload()
  } else {
    button.innerHTML = "Exit Game"
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
  }
}

function removeScore() {
  window.localStorage.clear()
  highscore.innerHTML = 0
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    currentscore++;
    if (currentscore > localStorage.getItem('high', high)) {
      localStorage.setItem('high',currentscore)
      highscore.innerHTML = localStorage.getItem('high')
    }
  }

    scoreDisplay.innerHTML = currentscore;
    highscore.innerHTML = localStorage.getItem('high')
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
    document.getElementById("startgame").innerHTML = "Start Game"
    document.location.reload()
    
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over!!!";
    score = 0;
    scoreDisplay.innerHTML = 0
  }
}
