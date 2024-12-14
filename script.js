const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let spaceship = { x: canvas.width / 2, y: canvas.height - 80, size: 60 };
let stars = [];
let obstacles = [];
let score = 0;
let gameOver = false;

// Load custom images
const spaceshipImg = new Image();
spaceshipImg.src = "./DurrrSpaceShip.png"; // Ship

const starImg = new Image();
starImg.src = "./orb_green.png"; // Green Orb

const obstacleImg = new Image();
obstacleImg.src = "./Rock Pile.png"; // Rock Pile

// Load background music
const bgMusic = new Audio("./y2mate.com - A Theme For Space 8bit music.mp3");
bgMusic.loop = true;

// Play music after user interacts with the game
document.addEventListener('keydown', () => {
    if (bgMusic.paused) {
        bgMusic.play();
    }
});


// Key controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') spaceship.x -= 20;
    if (e.key === 'ArrowRight') spaceship.x += 20;
    if (e.key === 'ArrowUp') spaceship.y -= 20;
    if (e.key === 'ArrowDown') spaceship.y += 20;
});

// Generate stars
function spawnStars() {
    stars.push({ x: Math.random() * canvas.width, y: 0, size: 30 });
}

// Generate obstacles
function spawnObstacles() {
    obstacles.push({ x: Math.random() * canvas.width, y: 0, size: 60 });
}

// Draw functions
function drawSpaceship() {
    ctx.drawImage(spaceshipImg, spaceship.x - spaceship.size / 2, spaceship.y - spaceship.size / 2, spaceship.size, spaceship.size);
}

function drawStar(star) {
    ctx.drawImage(starImg, star.x - star.size / 2, star.y - star.size / 2, star.size, star.size);
}

function drawObstacle(obstacle) {
    ctx.drawImage(obstacleImg, obstacle.x - obstacle.size / 2, obstacle.y - obstacle.size / 2, obstacle.size, obstacle.size);
}

// Game loop
function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 150, canvas.height / 2);
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 180, canvas.height / 2 + 60);
        return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw spaceship
    drawSpaceship();

    // Draw stars
    ctx.fillStyle = 'gold';
    stars.forEach((star, index) => {
        drawStar(star);
        star.y += 4; // Move stars downward

        // Check for collision with spaceship
        if (Math.hypot(spaceship.x - star.x, spaceship.y - star.y) < spaceship.size / 2 + star.size / 2) {
            score++;
            stars.splice(index, 1);
        }
    });

    // Draw obstacles
    ctx.fillStyle = 'red';
    obstacles.forEach((obstacle, index) => {
        drawObstacle(obstacle);
        obstacle.y += 6; // Move obstacles downward

        // Check for collision with spaceship
        if (Math.hypot(spaceship.x - obstacle.x, spaceship.y - obstacle.y) < spaceship.size / 2 + obstacle.size / 2) {
            gameOver = true;
            bgMusic.pause();
        }
    });

    // Display score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);

    requestAnimationFrame(gameLoop);
}

// Spawn stars and obstacles at intervals
setInterval(spawnStars, 1000);
setInterval(spawnObstacles, 1500);

// Start the game loop
gameLoop();
