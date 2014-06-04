//which space invaders are present on each level
  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,3,0,0,0,0,0],
          //[0,0,0,0,3,3,3,0,0,0,0],
          [0,0,0,3,0,0,0,3,0,0,0],
          //[0,0,1,1,1,1,1,1,1,0,0],
          [0,2,2,0,0,0,0,0,2,2,0],
          //[3,3,0,0,0,0,0,0,0,3,3],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,4,4,0,0,0,0,0,0,0],
          [0,0,4,4,0,0,0,0,0,0,0],
          [0,0,4,4,0,0,0,0,0,0,0],
          [0,0,4,4,0,0,0,0,0,0,0],
          [0,0,5,5,5,5,5,0,0,0,0],
          [0,0,6,6,6,6,6,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,7,7,7,0,0,0,0],
          [0,0,0,0,7,7,7,0,0,0,0],
          [0,0,0,0,7,7,7,0,0,0,0],
          [0,0,0,0,8,8,8,0,0,0,0],
          [0,0,0,0,8,8,8,0,0,0,0],
          [0,0,0,0,9,9,9,0,0,0,0],
          [0,0,0,0,9,9,9,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],  
     4:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,10,10,10,10,10,10,0],
          [0,0,0,0,10,10,0,0,0,0,0],
          [0,0,0,0,11,11,0,0,0,0,0],
          [0,0,0,0,11,11,11,11,11,0,0],
          [0,0,0,0,12,12,0,0,0,0,0],
          [0,0,0,0,12,12,0,0,0,0,0],
          [0,0,0,0,12,12,0,0,0,0,0],
          [0,0,0,0,12,12,12,12,12,12,0]],
    5:   [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,13,13,13,0,0,0,0,13,13,0],
          [0,13,13,13,13,0,0,0,13,13,0],
          [0,13,13,0,13,13,0,0,13,13,0],
          [0,13,13,0,0,13,13,0,13,13,0],
          [0,13,13,0,0,0,13,13,13,13,0],
          [0,13,13,0,0,0,0,13,13,13,0],
          [0,13,13,0,0,0,0,0,13,13,0],
          [0,13,13,0,0,0,0,0,13,13,0]], };


//places aliens on the canvas and the frames for the sprite sheet
  var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 24, h: 18, cls: Alien, frames: 3 },
    'alien2': { sx: 0,  sy: 18, w: 24, h: 18, cls: Alien, frames: 3 },
    'alien3': { sx: 0,  sy: 36, w: 24, h: 18, cls: Alien, frames: 3 },
    'player': { sx: 0,  sy: 72, w: 33, h: 28, cls: Player },
    'missile': { sx: 0,  sy: 100, w: 15,  h: 19, cls: Missile },
    'explosion': {sx: 0, sy: 54, w: 24, h: 18, cls: Explosion, frames: 8 },
    'alien4': {sx: 0, sy:122, w:24, h:18, cls:Alien, frames: 3 }, 
    'alien5': {sx: 0, sy:140, w:24, h:18, cls:Alien, frames: 3 },
    'alien6': {sx: 0, sy:158, w:24, h:18, cls:Alien, frames: 3 },
    'alien7': {sx: 0, sy:176, w:23, h:18, cls:Alien, frames: 3 }, 
    'alien8': {sx: 0, sy:193, w:23, h:18, cls:Alien, frames: 3 },
    'alien9': {sx: 0, sy:210, w:23, h:18, cls:Alien, frames: 3 },
    'alien10': {sx: 0, sy:227, w:23, h:18, cls:Alien, frames: 3 }, 
    'alien11': {sx: 0, sy:244, w:23, h:18, cls:Alien, frames: 3 },
    'alien12': {sx: 0, sy:263, w:23, h:18, cls:Alien, frames: 3 },
    'alien13': {sx: 0, sy:281, w:23, h:18, cls:Alien, frames: 3 },

  }

//introduction to the game, wording
  function startGame() {
    var screen = new GameScreen("Aliens are Invading!","press Enter to start",
                                //controls the next board to show upon hitting the spacebar
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

//wording at the end of the game - if lost
  function endGame() {
    var screen = new GameScreen("Game Over","press Enter to try again",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

//wording at the end of the game - if won
  function winGame() {
    var screen = new GameScreen("You completed the Game!","press Enter to restart",
                                function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }
//been trying to initiate a screen between one level and the next level.

  //function nextGame() {
    //var screen = new GameScreen("Good Show!","press Enter for next level",      
                                //--attempted to create a introductory screen to each level using this function
                                //function (){
                               //Game.loadBoard(new GameBoard(Game.board.nextLevel()))}); 
                               // function() {
                               ///      Game.loadBoard(new GameBoard(2));                 
                               //  });
   // Game.loadBoard(screen);

 // }   


//sound fire (shot by player) sound die (hit invaders)
  $(function() {
    GameAudio.load({ 'fire' : 'media/62362__fons__zap-1.wav', 'die' : 'media/34205__themfish__zoup.wav    ' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame,
                                        //"win2" : nextGame,
                                        
                                        });
                   });
   });

