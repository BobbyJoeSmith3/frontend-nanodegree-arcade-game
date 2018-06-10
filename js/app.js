// starting level
let level = 1;

// Enemies our player must avoid
var Enemy = function(locX, locY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; //100x70px
    this.x = locX;
    this.y = locY;
    this.initX = locX;
    this.initY = locY;
    this.speed = this.setInitEnemySpeed(50, 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x+(this.speed*dt);

    // reset enemy's position once edge is reached
    if (this.x >= 550) {
        this.reset();
    }

    // check for collision with player
    if (player.x >= this.x -35 && player.x <= this.x + 35) {
        if (player.y >= this.y - 50 && player.y <= this.y + 60) {
            player.reset();
            // reset enemy speeds
            for (let i = 0; i < allEnemies.length; i++) {
                allEnemies[i].speed = allEnemies[i].setInitEnemySpeed(50, 100);
            }
            level = 1;
            updateLevelTracker();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = this.initX;
    this.y = this.initY;
};

Enemy.prototype.setInitEnemySpeed = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let initSpeed = Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    console.log("Initial speed = " + initSpeed);
    return initSpeed;
};

Enemy.prototype.increaseSpeed = function() {
    this.speed += 50;
    console.log("New speed " + this.speed);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(locX, locY) {
    this.sprite = 'images/char-boy.png'; //70x80px
    this.x = locX;
    this.y = locY;
    this.initX = locX;
    this.initY = locY;
};

Player.prototype.update = function(dt) {
    if (this.y < -20) {
        this.goalReached();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = this.initX;
    this.y = this.initY;
};

Player.prototype.handleInput = function(input) {
    const pSpeed = 20;
    // canvas is 505px by 606px
    if (input === 'left' && this.x > 0) {
        this.x = this.x - pSpeed;
    } else if (input === 'right' && this.x < 405) {
        this.x = this.x + pSpeed;
    } else if (input === 'up' && this.y > -50) {
        this.y = this.y - pSpeed;
    } else if (input === 'down' && this.y < 420) {
        this.y = this.y + pSpeed;
    }
};
Player.prototype.goalReached = function() {
    this.reset();
    level++;
    for (let i = 0; i < allEnemies.length; i++) {
            allEnemies[i].increaseSpeed();
        }
    updateLevelTracker();

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(-100, 60);
const enemy2 = new Enemy(-400, 60);
const enemy3 = new Enemy(-220, 140);
const enemy4 = new Enemy(-460, 140);
const enemy5 = new Enemy(-600, 220);
const enemy6 = new Enemy(-330, 220);
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
const player1 = new Player(200,420);
const player = player1;


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

// Scoreboard & Instructions
const body = document.querySelector('body');
const levelTracker = document.createElement('h2');
let directions = document.createElement('p');
directions.textContent = "Use the arrow keys to navigate Char Boy across the dangerous Beetle Road to the safety of water. What level can you reach?!";
body.appendChild(levelTracker);
updateLevelTracker();
levelTracker.insertAdjacentElement('afterend',directions);
function updateLevelTracker() {
    levelTracker.textContent = "Level: " + level;
}
