// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 200);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) { // Enemies only move horizontally, hence only x-value changes
        this.x += this.speed * dt;
    } else {
        this.x = -100; // Enemy off canvas? Back to left of canvas
    }
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() { // Rendering = 'weergeven'
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // ctx is canvas
}; // Render method uses ctx.drawImage() method that takes three params: image, x, y

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x; // Same as for enemy, except 'speed' is not necessary here
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function() {
    //
};

Player.prototype.render = function() { // Draw player on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode == 'left') { // See allowedKeys below
        if (this.x - 101 < 0) {
            this.x = 0;
        } else {
            this.x -= 101;
        }
    }
    if (keyCode == 'right') {
        if (this.x + 101 > 404) {
            this.x = 404;
        } else {
            this.x += 101;
        }
    }
    if (keyCode == 'down') {
        if (this.y + 85 > 404) {
            this.y = 404;
        } else {
            this.y += 83;
        }
    }
    if (keyCode == 'up') {
        if (this.y - 85 < 0) { // Player reaches water
            resetPlayer(); // Player goes back to start
            counter = counter + 1; // Level up
            scoreBoard.innerHTML = counter; // Update level up in HTML
        } else {
            this.y -= 83;
        }
    }
};

function checkCollision(oneEnemy) { // If 'this' collides with player
    if (player.x < oneEnemy.x + 80 && // From https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    player.x + 60 > oneEnemy.x &&
    player.y < oneEnemy.y + 80 &&
    40 + player.y > oneEnemy.y) {
        resetPlayer(); // Player goes back to start
        counter = 0; // Level is reset to zero
        scoreBoard.innerHTML = counter; // Update level zero in HTML
    }
};

function resetPlayer() {
    player.x = 202;
    player.y = 404;
};

let scoreBoard = document.getElementById('scoreboard');
let counter = 0;

// Now instantiate your objects.
const player = new Player(202, 404); // 505 / 2 - 50.5 = 202 (0, 0 is top left corner)
const enemyOne = new Enemy(-100, 227.5, 50); // Maybe later add one enemy every time player levels up?
const enemyTwo = new Enemy(-100, 227.5, 50);
const enemyThree = new Enemy(-100, 145, 50);
const enemyFour = new Enemy(-100, 61, 50);
const enemyFive = new Enemy(-100, 61, 50);

let allEnemies = [];
allEnemies.push(enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
