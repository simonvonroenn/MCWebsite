class Piece {
    constructor(color, x, y, pathIdx) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.validMove = null;
        this.pathIdx = pathIdx;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x * squareSizePx + squareSizePx / 2, this.y * squareSizePx + squareSizePx / 2, pieceRadius, 0, Math.PI * 2);
        ctx.fill();
    }
}
