class Piece {
    constructor(color, x, y, pathIdx) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.validMove = null;
        this.pathIdx = pathIdx;
    }
    
    draw(x, y) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x * squareSizePx + squareSizePx / 2, y * squareSizePx + squareSizePx / 2, pieceRadius, 0, Math.PI * 2);
        ctx.fill();
    }
}
