export class PowerUp {
    constructor(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.size = 20;
        this.speed = 2;
        this.type = Math.random() < 0.5 ? 'shotgun' : 'double';
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = this.type === 'shotgun' ? 'gold' : 'purple';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
