var canvas,
    ctx,
    ballY = 0;
    ballSpeedY = 8;
    paddleX = 200;

window.onload = function(){
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  var framesPerSecond = 50;
  setInterval(function (){
      drawEverything();
      ballMove();
  }, 1000/framesPerSecond);

  canvas.addEventListener('keydown', movePaddle);
};

function movePaddle(e){
  if(e.which === 39) {
    paddleX += 6;
  }
  if(e.which === 37){
    paddleX -= 6;
  }
}

function ballMove (){
  ballY += ballSpeedY;
    if(ballY > canvas.height){
      ballSpeedY = -ballSpeedY;
    }
    if(ballY < 0){
      ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
  rectangle(0, 0, canvas.width, canvas.height, 'black'); //Fill in the canvas
  rectangle(paddleX, 490, 100, 10, 'white'); //draw bottom paddle
  ball(250, ballY, 10, 'white'); //draw a white ball.
}

//function constructor to draw a rectangle
function rectangle(x, y, width, height, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

//function constructor to make a circle
function ball (x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fill();
}
