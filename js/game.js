//places alien sprites
var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
    //overall speed of the alien flock
  this.speed = 5;

  this.draw = function() {};

    //if all aliens get killed
this.die = function() {
    if(Game.board.nextLevel()) {
        Game.callbacks['win2']();
    } else {
      Game.callbacks['win2']();
    }
  }
//increases speed as they move down the board and as there are less aliens
  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
//this.dy changes depending on the y axis mainly - as the aliens get lower down the screen the dy becomes larger, however if aliens are hit this dy is subject to change between around 15 & 20
    } else {
      (this.dy=0);
            }
      

    this.dx = this.speed * this.hit;
//stops aliens moving off the board
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
//function for singular alien
var Alien = function Alien(opts) {
  this.flock = opts['flock'];
    //start aliens at frame 0
  this.frame = 0;
  this.mx = 10;
}
//draw aliens from sprite data
Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}
//what to do when alien dies
Alien.prototype.die = function() {
    //play audiio
  GameAudio.play('die');
    //increase overall flock speed
  this.flock.speed += 1;
    //remove alien from game
  this.board.remove(this);   {
      //in place, draw in explosion
            this.board.addSprite('explosion', this.x, this.y,this.frame);
                        }
}

//How Alien spefically moves
Alien.prototype.step = function(dt) {
    //movement of flock across screen
  this.mx += dt * this.flock.dx;
    //movement of flock down the screen
  this.y += this.flock.dy;
    //speed at which they move as a flock
  if(Math.abs(this.mx) > 7) {
      //determines how often flock shoots at player
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    //moves aliens accross the screen, in the x axis
    this.x += this.mx;
      //how far aliens can move
    this.mx = 0;
      //counts through the sprite frames 
    this.frame = (this.frame+1) % 3;
      //restricts canvas and makes aliens move down
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
    }
  
  return true;
}
//determines how often the aliens fire at the player
Alien.prototype.fireSometimes = function() {
    //fires missile randoml
      if(Math.random()*100 < 0) {
          //draws missile into game
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
    //how the missiles travel/speed
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
    //when user is not pressing missile remove from game
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

//initialising explosion function, no arguments 
var Explosion = function Explosion(opts) {
        this.frame= 0;
};
Explosion.prototype.draw = function(canvas) {
    Sprites.draw(canvas,'explosion',this.x,this.y,this.frame);
    
};

Explosion.prototype.step = function() {
   this.frame++;

  };


Explosion.prototype.die = function() {
    if(this.frame =3 ){
        this.board.remove(this);

    }
}

//var pauseGame() {
   //if(Game.keys['p']); {
     //  Game.board.setTimeout(partB,1000);
   //}
//}


  // console.log(this.y);
   //           if(this.y>=16){
 //       console.log('I am dead');
   //     Game.callbacks['die'];
