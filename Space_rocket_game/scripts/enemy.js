export class Enemy {
    constructor(canvas, difficulty = 'medium') {
        this.canvas = canvas;
        this.size = 30;
        this.x = Math.random() * (canvas.width - this.size);
        this.y = -this.size;
        
        // Snelheid aanpassen op basis van moeilijkheidsgraad
        const speedMultiplier = {
            'easy': 0.7,
            'medium': 1,
            'hard': 1.5
        }[difficulty] || 1;
        
        this.speed = 2 * speedMultiplier;
    }

    update(slowMultiplier = 1) {
        this.y += this.speed * slowMultiplier;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x + this.size/2, this.y + this.size/2, this.size/2, 0, Math.PI * 2);
        ctx.fill();
    }
}