function calculateValidMoves(player) {
    pieces[player].forEach(piece => {
        if (diceResult == 6) {
            let startField = getStartField(player);
            if (startField.isEmpty()) piece.validMoves.push(startField);
        }
    });
}

function hasValidMoves(player) {
    return pieces[player].some(piece => piece.validMoves.length > 0);
}

function isValidMove(x, y, pieceColor) {
    let field = board[y][x];
    // Überprüfen, ob das Zielfeld ein Wegfeld ist
    if (field.type == 'path') return true;

    // Überprüfen, ob das Zielfeld ein Zielfeld der eigenen Farbe ist
    if (field.type == 'goal' && field.color == pieceColor) return true;

    return false; // Alle anderen Felder sind ungültig
}

function changePlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    hasRolled = false;
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    const playerDisplay = document.getElementById('currentPlayer');
    playerDisplay.textContent = `Spieler am Zug: ${players[currentPlayerIndex]}`;
}

function getStartField(player) {
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            if (board[y][x].type == 'start' && board[y][x].color == player) {
                return board[y][x];
            }
        }
    }
}