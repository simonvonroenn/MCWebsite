const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boardSizePx = 600;
const boardSize = 11;
const squareSizePx = boardSizePx / boardSize;
const pieceRadius = squareSizePx / 3; // Radius der Spielfiguren

// Anfangspositionen der Spielfiguren
let pieces = {
    red: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
    green: [{x: 9, y: 0}, {x: 10, y: 0}, {x: 9, y: 1}, {x: 10, y: 1}],
    yellow: [{x: 0, y: 9}, {x: 1, y: 9}, {x: 0, y: 10}, {x: 1, y: 10}],
    royalblue: [{x: 9, y: 9}, {x: 10, y: 9}, {x: 9, y: 10}, {x: 10, y: 10}]
};

let selectedPiece = null;

let board = [];
setup();

function setup() {
    let fieldType;
    let fieldColor;

    for (let y = 0; y < boardSize; y++) {
        let row = [];
        for (let x = 0; x < boardSize; x++) {
            fieldType = 'empty';
            fieldColor = 'none';
            
            // Häuser
            if (x < 2 && y < 2) {
                fieldType = 'house';
                fieldColor = 'lightpink';
            }
            else if (x < 2 && y >= boardSize - 2) {
                fieldType = 'house';
                fieldColor = 'khaki';
            }
            else if (x >= boardSize - 2 && y < 2) {
                fieldType = 'house';
                fieldColor = 'lightgreen';
            }
            else if (x >= boardSize - 2 && y >= boardSize - 2) {
                fieldType = 'house';
                fieldColor = 'lightblue';
            }
            // Ziele
            else if (x == 5 && y >= 1 && y <= 4) {
                fieldType = 'goal';
                fieldColor = 'lightgreen';
            }
            else if (x >= 1 && x <= 4 && y == 5) {
                fieldType = 'goal';
                fieldColor = 'lightpink';
            }
            else if (x == 5 && y >= boardSize - 5 && y <= boardSize - 2) {
                fieldType = 'goal';
                fieldColor = 'khaki';
            }
            else if (x >= boardSize - 5 && x <= boardSize - 2 && y == 5) {
                fieldType = 'goal';
                fieldColor = 'lightblue';
            }
            row.push(new Field(fieldType, fieldColor));
        }
        board.push(row);
    }

    // Pfadfelder
    fieldType = 'path';
    fieldColor = 'grey';
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            if (board[y][x].type != 'empty') continue;
            if (x == 5 && y == 5) continue;
            if (neighborExists(x, y, 'goal')) board[y][x] = new Field(fieldType, fieldColor);
        }
    }
}

function neighborExists(x, y, type) {
    // Überprüfe alle acht möglichen Nachbarn
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            // Überspringe das aktuelle Feld selbst
            if (dx === 0 && dy === 0) {
                continue;
            }

            let neighborX = x + dx;
            let neighborY = y + dy;

            // Überprüfe, ob der Nachbar innerhalb des Spielbretts liegt
            if (neighborX >= 0 && neighborX < boardSize && neighborY >= 0 && neighborY < boardSize) {
                // Überprüfe den Typ des Nachbarfeldes
                if (board[neighborY][neighborX].type === type) {
                    return true;
                }
            }
        }
    }

    return false;
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    handleClick(Math.floor(x / squareSizePx), Math.floor(y / squareSizePx));
});

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

function isValidMove(x, y, pieceColor) {
    // Überprüfen, ob das Zielfeld ein gültiges Wegfeld ist
    if (x === 0 || x === boardSize - 1 || y === 0 || y === boardSize - 1) {
        return true; // Wegfelder sind immer gültig
    }

    // Überprüfen, ob das Zielfeld ein gültiges Zielfeld der eigenen Farbe ist
    switch (pieceColor) {
        case 'red':
            return y === 4 && x > 0 && x < 4; // Rote Zielfelder
        case 'green':
            return x === 6 && y > 0 && y < 4; // Grüne Zielfelder
        // ... Fügen Sie Logik für andere Farben hinzu ...
    }

    return false; // Alle anderen Felder sind ungültig
}

function handleClick(x, y) {
    if (selectedPiece) {
        // Überprüfen, ob der Zug gültig ist
        if (isValidMove(x, y, selectedPiece.color)) {
            // Bewege die ausgewählte Figur zum neuen Feld
            selectedPiece.x = x;
            selectedPiece.y = y;
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


for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
        console.log(`Field at (${x}, ${y}): Type = ${board[y][x].type}, Color = ${board[y][x].color}`);
    }
}

drawBoard();


document.getElementById('rollDice').addEventListener('click', function() {
    let result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').textContent = 'Gewürfelt: ' + result;
    // Hier können weitere Aktionen hinzugefügt werden, wie das Bewegen der Spielfiguren
});
