const boardSizePx = 600;
const boardSize = 11;
const squareSizePx = boardSizePx / boardSize;
const pieceRadius = squareSizePx / 3; // Radius der Spielfiguren

let board = [];

const players = ['red', 'green', 'blue', 'yellow']; // Liste der Spieler
let currentPlayerIndex = 0; // Startet mit dem ersten Spieler

// Anfangspositionen der Spielfiguren
let pieces = {
    red: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
    green: [{x: 9, y: 0}, {x: 10, y: 0}, {x: 9, y: 1}, {x: 10, y: 1}],
    yellow: [{x: 0, y: 9}, {x: 1, y: 9}, {x: 0, y: 10}, {x: 1, y: 10}],
    blue: [{x: 9, y: 9}, {x: 10, y: 9}, {x: 9, y: 10}, {x: 10, y: 10}]
};

let selectedPiece = null;
let diceResult = 0;
let hasRolled = false; // Flag, das anzeigt, ob der aktuelle Spieler gewürfelt hat

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
            row.push(new Field(fieldType, fieldColor));
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

function setRandomDiceAtStart() {
    let randomStartDice = Math.floor(Math.random() * 6) + 1;
    let diceImage = document.getElementById('diceImage');
    diceImage.src = `img/dice-${randomStartDice}.svg`;
    diceImage.classList.add('dice-filter'); // Fügt den Filtereffekt hinzu
}