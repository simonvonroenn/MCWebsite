function handleClick(x, y) {
    if (selectedPiece && selectedPiece.color === players[currentPlayerIndex] && diceResult > 0) {
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
                    piece.color = color; // Farbe der Figur speichern
                    selectedPiece = piece; // Spielfigur auswählen
                    return; // Schleife beenden
                }
            }
        }
    }
}

function changePlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    diceResult = 0;
    hasRolled = false;
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    const playerDisplay = document.getElementById('currentPlayer');
    playerDisplay.textContent = `Spieler am Zug: ${players[currentPlayerIndex]}`;
}