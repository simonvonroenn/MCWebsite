const boardSizePx = 600;
const boardSize = 11;
const squareSizePx = boardSizePx / boardSize;
const pieceRadius = squareSizePx / 3; // Radius der Spielfiguren

let board = [];

const players = ['red', 'green', 'blue', 'yellow']; // Liste der Spieler
let currentPlayerIndex = 0; // Startet mit dem ersten Spieler

let selectedPiece = null;

// Anfangspositionen der Spielfiguren
let pieces = {
    red: [
        new Piece('red', 0, 0), 
        new Piece('red', 1, 0), 
        new Piece('red', 0, 1), 
        new Piece('red', 1, 1)
    ],
    green: [
        new Piece('green', 9, 0), 
        new Piece('green', 10, 0), 
        new Piece('green', 9, 1), 
        new Piece('green', 10, 1)
    ],
    yellow: [
        new Piece('yellow', 0, 9), 
        new Piece('yellow', 1, 9), 
        new Piece('yellow', 0, 10), 
        new Piece('yellow', 1, 10)
    ],
    blue: [
        new Piece('blue', 9, 9), 
        new Piece('blue', 10, 9), 
        new Piece('blue', 9, 10), 
        new Piece('blue', 10, 10)
    ]
};

function setup() {
    setRandomDiceAtStart();

    let fieldType;
    let fieldColor;

    for (let y = 0; y < boardSize; y++) {
        let row = [];
        for (let x = 0; x < boardSize; x++) {
            fieldType = 'empty';
            fieldColor = 'white';
            
            // Hausfelder
            if (x < 2 && y < 2) {
                fieldType = 'house';
                fieldColor = 'red';
            }
            else if (x < 2 && y >= boardSize - 2) {
                fieldType = 'house';
                fieldColor = 'yellow';
            }
            else if (x >= boardSize - 2 && y < 2) {
                fieldType = 'house';
                fieldColor = 'green';
            }
            else if (x >= boardSize - 2 && y >= boardSize - 2) {
                fieldType = 'house';
                fieldColor = 'blue';
            }

            // Zielfelder
            else if (x == 5 && y >= 1 && y <= 4) {
                fieldType = 'goal';
                fieldColor = 'green';
            }
            else if (x >= 1 && x <= 4 && y == 5) {
                fieldType = 'goal';
                fieldColor = 'red';
            }
            else if (x == 5 && y >= boardSize - 5 && y <= boardSize - 2) {
                fieldType = 'goal';
                fieldColor = 'yellow';
            }
            else if (x >= boardSize - 5 && x <= boardSize - 2 && y == 5) {
                fieldType = 'goal';
                fieldColor = 'blue';
            }

            // Startfelder
            let middle = Math.floor(boardSize / 2);
            if (x == 0 && y == middle - 1) {
                fieldType = 'start';
                fieldColor = 'red';
            }
            else if (x == middle + 1 && y == 0) {
                fieldType = 'start';
                fieldColor = 'green';
            }
            else if (x == boardSize - 1 && y == middle + 1) {
                fieldType = 'start';
                fieldColor = 'blue';
            }
            else if (x == middle - 1 && y == boardSize - 1) {
                fieldType = 'start';
                fieldColor = 'yellow';
            }
            row.push(new Field(x, y, fieldType, fieldColor));
        }
        board.push(row);
    }

    // Pfadfelder
    fieldType = 'path';
    fieldColor = 'lightgrey';
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            if (board[y][x].type != 'empty') continue;
            if (x == 5 && y == 5) continue;
            if (neighborExists(x, y, 'goal')) board[y][x] = new Field(x, y, fieldType, fieldColor);
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

function setRandomDiceAtStart() {
    let randomStartDice = Math.floor(Math.random() * 6) + 1;
    let diceImage = document.getElementById('diceImage');
    diceImage.src = `img/dice-${randomStartDice}.svg`;
    diceImage.classList.add('dice-filter'); // Fügt den Filtereffekt hinzu
}

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * squareSizePx, y * squareSizePx, squareSizePx, squareSizePx);
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
            piece.draw(piece.x, piece.y);
        });
    }
}