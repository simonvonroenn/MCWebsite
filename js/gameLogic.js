const colors = ['red', 'green', 'blue', 'yellow']; // Liste der Spieler
let currentColorIndex = 0; // Startet mit dem ersten Spieler

let selectedPiece = null;

function calculateValidMoves(color) {
    let startField = getStartField(color);
    pieces[color].forEach(piece => {
        if (board[piece.y][piece.x].type == 'house') {
            if (diceResult == 6 && startField.isEmpty()) {
                piece.validMove = startField;
            }
        } else {
            if (piece.pathIdx + diceResult < pathlength) {
                piece.validMove = board[path[color].y[piece.pathIdx + diceResult]][path[color].x[piece.pathIdx + diceResult]];
            }
        }

        if (piece.validMove != null) console.log("(" + piece.validMove.x + ", " + piece.validMove.y + ")");
    });
}

function hasValidMoves(color) {
    return pieces[color].some(piece => piece.validMove != null);
}

function isValidMove(x, y, color) {
    let field = board[y][x];
    if (field.type == 'empty' || field.type == 'house') return false;
    if (field.type == 'goal' && field.color != color) return false;
    if (selectedPiece.validMove != board[y][x]) return false;

    return true;
}

function changeColor() {
    pieces[colors[currentColorIndex]].forEach(piece => {
        piece.validMove = null;
    }); 
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    hasRolled = false;
    rollCounter = 1;
    updateCurrentColorDisplay();
    console.log(colors[currentColorIndex]);
}

function updateCurrentColorDisplay() {
    const colorDisplay = document.getElementById('currentColor');
    colorDisplay.textContent = `Spieler am Zug: ${colors[currentColorIndex]}`;
}

function getStartField(color) {
    for (let y = 0; y < SquaresPerSide; y++) {
        for (let x = 0; x < SquaresPerSide; x++) {
            if (board[y][x].type == 'start' && board[y][x].color == color) {
                return board[y][x];
            }
        }
    }
}

function animateSkip() {
    // Skip animation, wenn ein Spieler keine gültigen Züge hat.
}

function handleClick(x, y) {
    if (selectedPiece && selectedPiece.color === colors[currentColorIndex] && hasRolled) {
        // Überprüfen, ob der Zug gültig ist
        if (isValidMove(x, y, selectedPiece.color)) {
            // Aktualisieren der Position der Figur im path array
            if (board[selectedPiece.y][selectedPiece.x].type == 'house') {
                selectedPiece.pathIdx = 0;
            } else {
                selectedPiece.pathIdx += diceResult;
            }

            // Bewege die ausgewählte Figur zum neuen Feld
            selectedPiece.x = x;
            selectedPiece.y = y;

            changeColor();
        }
        selectedPiece = null; // Auswahl aufheben
        drawBoard(); // Brett neu zeichnen
    } else {
        // Prüfe, ob eine Spielfigur angeklickt wurde
        for (const color in pieces) {
            for (const piece of pieces[color]) {
                if (Math.hypot(piece.x - x, piece.y - y) * squareSizePx <= pieceRadius) {
                    if (piece.validMove != null) {
                        selectedPiece = piece;
                    }
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