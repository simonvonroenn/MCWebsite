class Field {
    constructor(type, color) {
        this.type = type; // 'path', 'goal', 'house', 'empty'
        this.color = color;
    }

    draw(ctx, x, y, size) {
        let fillColor;
        switch (this.type) {
            case 'path':
                fillColor = 'lightgrey';
                break;
            case 'empty':
                fillColor = 'white';
                break;
            case 'house':
            case 'goal':
                fillColor = this.color;
                break;
            default:
                fillColor = 'none';
        }

        ctx.fillStyle = fillColor;
        ctx.fillRect(x * size, y * size, size, size);
    }
}
