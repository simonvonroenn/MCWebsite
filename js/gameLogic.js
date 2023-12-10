const colors = ['red', 'green', 'blue', 'yellow']; // Liste der Spieler
let currentColorIndex = 0; // Startet mit dem ersten Spieler

let selectedPiece = null;

// Orientierung in jedem Viertel (maybe delete this)
let quarterMap = new Map([
    ["red", {fst: Ori.RIGHT, snd: Ori.UP}],
    ["green", {fst: Ori.DOWN, snd: Ori.RIGHT}],
    ["blue", {fst: Ori.LEFT, snd: Ori.DOWN}],
    ["yellow", {fst: Ori.UP, snd: Ori.LEFT}]
]);

function calculateValidMoves(color) {
    let startField = getStartField(color);
    pieces[color].forEach(piece => {
        if (board[piece.y][piece.x].type == 'house') {
            if (diceResult == 6 && startField.isEmpty()) {
                piece.validMove = startField;
            }
        } else {
            let info = calculateInformation(piece);

            console.log("ori: %s -> %s", quarterMap.get(info.quarter).fst, quarterMap.get(info.quarter).snd);
            console.log("corner: (x: %d, y: %d)", info.corner.x, info.corner.y);
        }


        if (piece.validMove != null) console.log("(" + piece.validMove.x + ", " + piece.validMove.y + ")");
        else console.log("()");
    });
}

// Maybe delete this
function calculateInformation(piece) {
    let middle = Math.floor(boardSize / 2);
    if (piece.x < middle && piece.y < middle || piece.x == middle && piece.y < middle) return {quarter: "red", corner: {x: middle - 1, y: middle - 1}};
    else if (piece.x > middle && piece.y < middle || piece.x > middle && piece.y == middle) return {quarter: "green", corner: {x: middle + 1, y: middle - 1}};
    else if (piece.x > middle && piece.y > middle || piece.x == middle && piece.y > middle) return {quarter: "blue", corner: {x: middle + 1, y: middle + 1}};
    else if (piece.x < middle && piece.y > middle || piece.x < middle && piece.y == middle) return {quarter: "yellow", corner: {x: middle - 1, y: middle + 1}};
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
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
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