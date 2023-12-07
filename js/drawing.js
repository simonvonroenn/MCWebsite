function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * squareSizePx, y * squareSizePx, squareSizePx, squareSizePx);
}

function drawPiece(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x * squareSizePx + squareSizePx / 2, y * squareSizePx + squareSizePx / 2, pieceRadius, 0, Math.PI * 2);
    ctx.fill();
}

function drawBoard() {
    // Zeichnet das Grundlayout des Bretts
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            board[y][x].draw(ctx, x, y, squareSizePx);
        }
    }

    // Spielfiguren zeichnen
    for (const color in pieces) {
        pieces[color].forEach(piece => {
            drawPiece(piece.x, piece.y, color);
        });
    }
}