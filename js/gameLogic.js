function isValidMove(x, y, pieceColor) {
    let field = board[y][x];
    // Überprüfen, ob das Zielfeld ein Wegfeld ist
    if (field.type == 'path') return true;

    // Überprüfen, ob das Zielfeld ein Zielfeld der eigenen Farbe ist
    if (field.type == 'goal' && field.color == pieceColor) return true;

    return false; // Alle anderen Felder sind ungültig
}

function click() {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    handleClick(Math.floor(x / squareSizePx), Math.floor(y / squareSizePx));
}