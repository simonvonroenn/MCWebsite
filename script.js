const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

setup();
updateCurrentColorDisplay();
drawBoard();


for (let y = 0; y < squaresPerSide; y++) {
    let s = "";
    for (let x = 0; x < squaresPerSide; x++) {
        s += "'" + board[y][x].type[0] + board[y][x].color[0] + "', "
    }
    console.log(s);
}

document.getElementById('diceImage').addEventListener('click', rollDice);

canvas.addEventListener('mousedown', click);

canvas.addEventListener('mousemove', drag);

canvas.addEventListener('mouseup', drop);