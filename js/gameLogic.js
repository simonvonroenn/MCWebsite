const colors = ['red', 'green', 'blue', 'yellow']; // Liste der Spieler
let currentColorIndex = 0; // Startet mit dem ersten Spieler

let selectedPiece = null;

let isDragging = false;
let draggedFrom;

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
    for (let y = 0; y < squaresPerSide; y++) {
        for (let x = 0; x < squaresPerSide; x++) {
            if (board[y][x].type == 'start' && board[y][x].color == color) {
                return board[y][x];
            }
        }
    }
}

function animateSkip() {
    // Skip animation, wenn ein Spieler keine gültigen Züge hat.
}

function click(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    x = Math.floor(x / squareSizePx);
    y = Math.floor(y / squareSizePx);

    pieces[colors[currentColorIndex]].forEach(piece => {
        // Prüfe, ob eine Spielfigur angeklickt wurde
        if (Math.hypot(piece.x - x, piece.y - y) * squareSizePx <= pieceRadius) {
            if (piece.validMove != null) {
                draggedFrom = {x: piece.x, y: piece.y};
                selectedPiece = piece;
                isDragging = true;
            }
            return;
        }
    });
}

function drag(event) {
    if (isDragging && selectedPiece) {
        let rect = canvas.getBoundingClientRect();
        
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        x = Math.floor(x / squareSizePx);
        y = Math.floor(y / squareSizePx);
        if (x != selectedPiece.x || y != selectedPiece.y) {
            selectedPiece.x = x;
            selectedPiece.y = y;
            drawBoard();
        }
    }
}

function drop(event) {
    if (selectedPiece && selectedPiece.color === colors[currentColorIndex] && hasRolled) {
        if (isValidMove(selectedPiece.x, selectedPiece.y, selectedPiece.color)) {
            // Aktualisieren der Position der Figur im path array
            if (board[draggedFrom.y][draggedFrom.x].type == 'house') {
                selectedPiece.pathIdx = 0;
            } else {
                selectedPiece.pathIdx += diceResult;
            }
    
            changeColor();
        } else {
            selectedPiece.x = draggedFrom.x;
            selectedPiece.y = draggedFrom.y;
            drawBoard();
        }
    } 
    isDragging = false;
    selectedPiece = null;
}