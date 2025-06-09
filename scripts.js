const gameBoard = document.getElementById("game-board");
const startBtn = document.getElementById("start-btn");


startBtn.addEventListener("click", startGame);

let flippedCards = [];
let lock = false;
