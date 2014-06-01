//which space invaders are present on each level
  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,1,0,0,0,0,0],
          [0,0,0,0,1,2,1,0,0,0,0],
          [0,0,0,1,2,0,2,1,0,0,0],
          [0,0,1,1,1,1,1,1,1,0,0],
          [0,1,3,0,0,0,0,0,3,1,0],
          [1,3,1,0,0,0,0,0,1,3,1],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,3,3,0,0,0,0,0,0,0],
          [0,0,3,3,0,0,0,0,0,0,0],
          [0,0,3,3,0,0,0,0,0,0,0],
          [0,0,3,3,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,0,0,0,0],
          [0,0,1,1,1,1,1,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,3,3,3,0,0,0,0],
          [0,0,0,0,3,3,3,0,0,0,0],
          [0,0,0,0,2,2,2,0,0,0,0],
          [0,0,0,0,2,2,2,0,0,0,0],
          [0,0,0,0,1,1,1,0,0,0,0],
          [0,0,0,0,1,1,1,0,0,0,0],
          [0,0,0,0,1,1,1,0,0,0,0],
          [0,0,0,0,1,1,1,0,0,0,0],  ] };


//places aliens on the canvas and the frames for the sprite sheet
  var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 24, h: 18, cls: Alien, frames: 3 },
    'alien2': { sx: 0,  sy: 18, w: 24, h: 18, cls: Alien, frames: 3 },
    'alien3': { sx: 0,  sy: 36, w: 24, h: 18, cls: Alien, frames: 3 },
    'player': { sx: 0,  sy: 72, w: 38, h: 28, cls: Player },
    'missile': { sx: 0,  sy: 99, w: 15,  h: 19, cls: Missile },
    'explosion': {sx: 0, sy: 54, w: 24, h: 18, cls: Explosion, frames: 8 },

   
  }

//introduction to the game, wording
  function startGame() {
    var screen = new GameScreen("Aliens are Invading!","press space to start",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

//wording at the end of the game - if lost
  function endGame() {
    var screen = new GameScreen("Game Over","press space to restart",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

//wording at the end of the game - if won
  function winGame() {
    var screen = new GameScreen("Good Show! Top Notch!","(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }
          

//sound fire (shot by player) sound die (hit invaders)
  $(function() {
    GameAudio.load({ 'fire' : 'media/62362__fons__zap-1.wav', 'die' : 'media/34205__themfish__zoup.wav    ' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win2"  : winGame,
                                        });
                   });
   });

