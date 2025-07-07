export class Player {
    constructor(x, y, shootSound) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.speed = 5;
        this.bullets = [];
        this.canShoot = true;
        this.activePowerUps = {};

        // Laad afbeelding
        this.image = new Image();
        this.image.src = 'rocket.png';

        // Geluid instellen
        this.shootSound = shootSound;

        this.shieldActive = false;
        this.slowMultiplier = 1;
    }

    update(keys, canvas) {
        if (keys['w'] || keys['ArrowUp']) this.y = Math.max(0, this.y - this.speed);
        if (keys['s'] || keys['ArrowDown']) this.y = Math.min(canvas.height - this.height, this.y + this.speed);
        if (keys['a'] || keys['ArrowLeft']) this.x = Math.max(0, this.x - this.speed);
        if (keys['d'] || keys['ArrowRight']) this.x = Math.min(canvas.width - this.width, this.x + this.speed);
        
        if (keys[' '] && this.canShoot) this.shoot();
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.update();
            return !bullet.offScreen(canvas);
        });
    }

    shoot() {
        if (!this.canShoot) return;

        if (this.shootSound) {
            this.shootSound.currentTime = 0;
            this.shootSound.play().catch(e => console.log("Error playing sound:", e));
        }

        // Voeg nieuwe kogel toe
        this.bullets.push({
            x: this.x + this.width / 2,
            y: this.y,
            width: 4,
            height: 10,
            speed: 7,
            update() {
                this.y -= this.speed;
            },
            draw(ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height);
            },
            offScreen(canvas) {
                return this.y + this.height < 0;
            }
        });

        this.canShoot = false;
        setTimeout(() => this.canShoot = true, 250);
    }

    draw(ctx) {
        // Teken speler
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        
        // Teken kogels
        this.bullets.forEach(bullet => bullet.draw(ctx));

        // Teken schild indien actief
        if (this.shieldActive) {
            ctx.strokeStyle = 'cyan';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2,