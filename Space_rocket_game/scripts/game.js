import { Player } from './player.js';

// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

// Game state
let player;
let enemies = [];
let gameRunning = false;
let score = 0;
let keys = {};
let currentDifficulty = 'medium';

// Event listeners
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

document.getElementById('easy').addEventListener('click', () => startGame('easy'));
document.getElementById('medium').addEventListener('click', () => startGame('medium'));
document.getElementById('hard').addEventListener('click', () => startGame('hard'));
document.getElementById('restart-button').addEventListener('click', () => startGame(currentDifficulty));

function startGame(difficulty) {
    gameRunning = true;
    score = 0;
    enemies = [];
    currentDifficulty = difficulty;
    
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.add('hidden');
    canvas.classList.remove('hidden');
    
    player = new Player(canvas.width/2, canvas.height - 100);
    
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.update(keys, canvas);
    player.draw(ctx);

    // Score weergeven
    ctx.fillStyle = 'white';
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameRunning = false;
    document.getElementById('game-over-screen').classList.remove('hidden');
    canvas.classList.add('hidden');
    document.getElementById('final-score').textContent = `Score: ${score}`;
}