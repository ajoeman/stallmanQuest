window.addEventListener('load', function(){
  //it is good practice to listen for load event.

var GAME_WIDTH = 640;
var GAME_HEIGHT = 360;
 var gameLive = true;
//enemies
var enemies = [
  {
    x: 100, //x coordinate
    y: 100, //y coordinate
    speedY: 1, //speed in Y
    w: 40, //width
    h: 40 //heght
  },
  {
    x: 210,
    y: 100,
    speedY: 2,
    w: 40,
    h: 40
  },
  {
    x: 330,
    y: 100,
    speedY: 3,
    w: 40,
    h: 40
  },
  {
    x: 450,
    y: 100,
    speedY: 4,
    w: 40,
    h: 40
  }
];

var player = {
  x: 10,
  y: 180,
  speedX: 2,
  w: 40,
  h: 40,
  isMoving: false,
  isMovingBackwards: false
};

var goal = {
  x: 580,
  y: 180,
  w: 50,
  h: 36,
};
var level = 1;

var winningDialogue = [
  "\"Facebook has introduced a racial discrimination feature that lets advertisers direct ads at people selected by race.\"",
  "\"There is no intrinsic right to intellectual property.\"",
  "\"Not all my shirts are red or purple, but many are. I like those colors.\"",
  "\"All computer users ought to insist on free software: it gives users the freedom to control their own computers.\"",
  "\"The most powerful programming language is Lisp. If you don't know Lisp , you don't know what it means for a programming language to be powerful and elegant.\"",
  "\"I cannot in good conscience sign a nondisclosure agreement or a software license agreement.\"",
  "\"GNU serves as an example to inspire and a banner to rally others to join us in sharing. \"",
  "\"If anything deserves a reward, it is social contribution. \"",
  "\"Extracting money from users of a program by restricting their use of it is destructive.\"",
  "\"A proprietary program puts its developer or owner in a position of power over its users. This power is in itself an injustice.\""
];
function randomNumber(){
  return Math.floor(Math.random() * 10);
}
var sprites = {};
//using the functions as variables helps compute time.
var movePlayer = function(){
  player.isMovingBackwards = false;
  player.isMoving = true;
};
var movePlayerBackwards = function(){
  player.isMoving = false;
  player.isMovingBackwards = true;
}
var stopPlayer = function(){
  player.isMoving = false;
  player.isMovingBackwards = false;
}
//grab the canvas and context
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

//listens for mouse down event on the canvas
canvas.addEventListener("mousedown", movePlayer);
canvas.addEventListener("mouseup", stopPlayer);
canvas.addEventListener("touchstart", movePlayer);
canvas.addEventListener("touchend", stopPlayer);
canvas.addEventListener("keydown", keyboardControl, false);
canvas.addEventListener("keyup", keyReleased, false);

function keyboardControl(e){
  if (e.keyCode == "39"){
    player.isMovingBackwards = false;
    player.isMoving = true;
  }
  if(e.keyCode == "37"){
    player.isMoving = false;
    player.isMovingBackwards = true;
  }
}
function keyReleased(e){
  player.isMoving = false;
  player.isMovingBackwards = false;
}
var load = function(){
  sprites.player = new Image();
  sprites.player.src = "resources/Stallman.png";

  sprites.background = new Image();
  sprites.background.src = "resources/matrix.png"

/*  sprites.enemy = new Image();
  sprites.enemy.src = "resources/enemy.png" */
  sprites.enemy1 = new Image();
  sprites.enemy1.src = "resources/chrome.png"
  sprites.enemy2 = new Image();
  sprites.enemy2.src = "resources/windows.png"
  sprites.enemy3 = new Image();
  sprites.enemy3.src = "resources/apple.png"
  sprites.enemy4 = new Image();
  sprites.enemy4.src = "resources/facebook.png"

  sprites.goal = new Image();
  sprites.goal.src = "resources/emacs.png"
};
//update the logic
var update = function() {
  if(checkCollision(player, goal)){
  /*  gameLive = false;
    alert('You WIN!!!!');
    window.location = ""; */
      level += 1;
      alert(winningDialogue[randomNumber()] + "\nLevel " + level);
      player.isMoving = false;
      player.x = 10;
      enemies.forEach(function(element, index){
        if(element.speedY > 0 && element.speedY < 7){
          element.speedY += 1;
        }else if(element.speedY < 0 && element.speedY > -7){
          element.speedY -= 1;
        }
      });
    }


  if(player.isMoving){
    player.x += player.speedX;
  }
  if(player.isMovingBackwards){
    player.x -= player.speedX;
  }
  //update the position of each enemy
  enemies.forEach(function(element, index){
    //check colision
    if(checkCollision(player, element)){
      gameLive = false;
      if(level == 1){
        alert("You are one of the many sheeple who chooses to be used by proprietary software.");
      }else{
        alert('After reaching level ' + level +' , you have succumbed to the evils of proprietary software.' );
      }
      //reload page
      window.location = "";
    }
    element.y += element.speedY;
    if(element.y <= 10){
      element.y = 10; //this is a bug fix that stops it getting stuc
      element.speedY *= -1;
    }else if(element.y >= GAME_HEIGHT - 50){
      element.y = GAME_HEIGHT - 50;
      element.speedY *= -1;
    }
  })

};

//show the game on the screen
var draw = function() {
  //clear the canvas
  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
/* commented out is the basics jst rectangles.
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "#3333FF";
  //update enemy position
  enemies.forEach(function(element, index){
    ctx.fillRect(element.x, element.y, element.w, element.h);
  })
  //draw goal
  ctx.fillStyle = "rgb(128, 128, 0)";
  ctx.fillRect(goal.x, goal.y, goal.w, goal.h); */
  ctx.drawImage(sprites.background, 0, 0);
  ctx.drawImage(sprites.player, player.x, player.y);
  ctx.drawImage(sprites.enemy1, enemies[0].x, enemies[0].y );
  ctx.drawImage(sprites.enemy2, enemies[1].x, enemies[1].y );
  ctx.drawImage(sprites.enemy3, enemies[2].x, enemies[2].y );
  ctx.drawImage(sprites.enemy4, enemies[3].x, enemies[3].y );
/*  enemies.forEach(function(element, index){
    ctx.drawImage(sprites.enemy, element.x, element.y);
  }); */
  ctx.drawImage(sprites.goal, goal.x, goal.y);
};

//gets executed multiple times per second
var step = function() {

  update();
  draw();

  if(gameLive){
    window.requestAnimationFrame(step);
  }
};

 var checkCollision = function(rect1, rect2){
   var closeOnWidth = Math.abs(rect1.x - rect2.x) < Math.max(rect1.w, rect2.w);
   var closeOnHeight = Math.abs(rect1.y - rect2.y) < Math.max(rect1.h, rect2.h);
   return closeOnWidth && closeOnHeight;
 }
load();
//initial kick
step();
});
