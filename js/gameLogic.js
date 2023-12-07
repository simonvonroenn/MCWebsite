function animateSkip() {
    // Skip animation, wenn ein Spieler keine gültigen Züge hat.
    console.log("Skip " + players[currentPlayerIndex]);
}

function handleClick(x, y) {
    if (selectedPiece && selectedPiece.color === players[currentPlayerIndex] && hasRolled) {
        // Überprüfen, ob der Zug gültig ist
        if (isValidMove(x, y, selectedPiece.color)) {
            // Bewege die ausgewählte Figur zum neuen Feld
            selectedPiece.x = x;
            selectedPiece.y = y;

            changePlayer();
        }
        selectedPiece = null; // Auswahl aufheben
        drawBoard(); // Brett neu zeichnen
    } else {
        // Prüfe, ob eine Spielfigur angeklickt wurde
        for (const color in pieces) {
            for (const piece of pieces[color]) {
                if (Math.hypot(piece.x - x, piece.y - y) * squareSizePx <= pieceRadius) {
                    piece.color = color;
                    selectedPiece = piece;
                    return;
                }
            }
        }
    }
}

function click(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    handleClick(Math.floor(x / squareSizePx), Math.floor(y / squareSizePx));
}