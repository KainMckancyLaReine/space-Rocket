export class Bullet {
    constructor(x, y, angle = -90, homing = false) {  // <-- angle standaard op -90 graden (omhoog)
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 15;
        this.speed = 7;
        this.angle = angle * Math.PI / 180;  // graden naar radialen
        this.homing = homing;
        this.target = null;  // vijand target voor homing
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    }

    update(enemies = []) {
        if (this.homing) {
            if (!this.target || !enemies.includes(this.target)) {
                let closest = null;
                let closestDist = Infinity;
                enemies.forEach(enemy => {
                    const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                    if (dist < closestDist) {
                        closest = enemy;
                        closestDist = dist;
                    }
                });
                this.target = closest;
            }

            if (this.target) {
                const dx = this.target.x - this.x;
                const dy = this.target.y - this.y;
                this.angle = Math.atan2(dy, dx);
            }
        }

        // Beweeg bullet volgens angle
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle) * -1; // y-as gaat naar beneden, dus * -1 is omhoog
    }

    offScreen(canvas) {
        return this.y + this.height < 0 || this.y > canvas.height || this.x < 0 || this.x > canvas.width;
    }

    checkCollision(enemy) {
        return (
            this.x < enemy.x + enemy.size &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.size &&
            this.y + this.height > enemy.y
        );
    }
}
