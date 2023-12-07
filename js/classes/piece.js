class Piece {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.validMoves = []; // Hier werden gültige Züge gespeichert
    }
    
    draw(x, y) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x * squareSizePx + squareSizePx / 2, y * squareSizePx + squareSizePx / 2, pieceRadius, 0, Math.PI * 2);
        ctx.fill();
    }
}
