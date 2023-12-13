const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

setup();

for (let y = 0; y < boardSize; y++) {
    let s = "";
    for (let x = 0; x < boardSize; x++) {
        s += "'" + board[y][x].type[0] + board[y][x].color[0] + "', "
    }
    console.log(s);
}

canvas.addEventListener('click', click);

document.getElementById('diceImage').addEventListener('click', rollDice);

updateCurrentColorDisplay();
drawBoard();