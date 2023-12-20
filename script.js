/**
 * This is the main javascript file.
 * It initializes the canvas, adds all event listeners and calls all setup methods.
 */

/** The canvas */
const canvas = document.getElementById('gameCanvas');

/** The 2d-context of the canvas, hereafter referred to as the canvas itself. */
const ctx = canvas.getContext('2d');

document.getElementById('diceImage').addEventListener('click', rollDice);

canvas.addEventListener('mousedown', click);

canvas.addEventListener('mousemove', drag);

canvas.addEventListener('mouseup', drop);

setup();
updateCurrentColorDisplay();
drawBoard();