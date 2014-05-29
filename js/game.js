//places alien sprites
var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
    //overall speed
  this.speed = 5;

  this.draw = function() {};

    //if all aliens get killed
  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }
//increases speed of the last aliens
  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}

var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);   {
            this.board.addSprite('explosion', this.x, this.y, this.frame);
                        }
}


Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 3;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}
//determines how often the aliens fire at the player
Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 10) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}

var Player = function Player(opts) { 
  this.reloading = 0;
}
//draws player on to the canvas
Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y);
}

//causes board to respond when player is hit
Player.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
}

//changed for extra functionality
//adds key functions and speed
Player.prototype.step = function(dt) {
  if(Game.keys['left']) { this.x -= 100 * dt; }
  if(Game.keys['right']) { this.x += 100 * dt; }
  if(Game.keys['up']) {this.y += 100 * dt; }
  if(Game.keys['down']) {this.y -= 100 * dt; }
//restricts player to the board
  if(this.x < 0) this.x = 0;
  if(this.y < 0) this.y = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;
  if(this.y > Game.height-this.h) this.y = Game.height-this.h;
    
  this.reloading--;
//space bar/fire function
  if(Game.keys['fire'] && this.reloading <= 0 && this.board.missiles < 3) {
    GameAudio.play('fire');
      //adds missile to fire function
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    this.reloading = 10;
  }
  return true;
}

//initialising a missile
var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}
//draws missile from sprite sheet
Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
}
//missile movement
Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;
//if missile hits alien, calls another function to get rid of alien
   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}
//when missile hits an object get rid of missile
Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

//initialising pause function
//if(Game.keys['p']) {
 //       function pauseGame() {
//          if (!gamePaused) {
//            game =  this.loop
//            gamePaused = true;
//                } else if (gamePaused) {
//            game = setTimeout(gameLoop, 1000 / 30);
//            gamePaused = false;
 // }
//}


//if(Game.keys['p']){
//setTimeout(function() {alert('hello');},


//initialising explosion function

var Explosion = function Explosion(opts) {
        this.frame = 0;
};
Explosion.prototype.draw = function(canvas) {
    Sprites.draw(canvas,'explosion',this.x,this.y,this.frame);
    
};

Explosion.prototype.step = function() {
     this.frame = (this.frame+1) % 3;
};

Explosion.prototype.die = function(dt) { 

    if(this.frame >= 3) {
    this.board.remove(this);
  }
};


//function draw() {
//var ctx = document.getElementById('explosion')
//var ctx = canvas.getContext('2d'); //create new img element
//img.src = spriteData.explosion //set source path
//img.addEventListener("load", function() {
    //execute drawImage statements here
//}, false);
//img.src = 'myImage.png';
