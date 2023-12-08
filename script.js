const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

setup();

canvas.addEventListener('click', click);

document.getElementById('diceImage').addEventListener('click', rollDice);

updateCurrentColorDisplay();
drawBoard();