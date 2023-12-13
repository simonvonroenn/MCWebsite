const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

setup();
updateCurrentColorDisplay();
drawBoard();


for (let y = 0; y < SquaresPerSide; y++) {
    let s = "";
    for (let x = 0; x < SquaresPerSide; x++) {
        s += "'" + board[y][x].type[0] + board[y][x].color[0] + "', "
    }
    console.log(s);
}

canvas.addEventListener('click', click);

document.getElementById('diceImage').addEventListener('click', rollDice);

/*
window.addEventListener('resize', () => {
    // Clear the canvas.
    ctx.clearRect(0, 0, ctx.width, ctx.height);

    // Draw it all again.
    setup();
    updateCurrentColorDisplay();
    drawBoard();
});
*/