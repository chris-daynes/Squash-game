var canvas,
    ctx,
    ballY = 0;
    ballSpeedY = 8;
    paddleX = 200;
    paddleWidth = 100;

window.onload = function(){
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  var framesPerSecond = 50;
  setInterval(function (){
      drawEverything();
      ballMove();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', function(e){
    var mousePos = calculateMousePos(e);
    paddleX = mousePos.x - paddleWidth/2;
  });
};


function calculateMousePos(e){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = e.clientX -rect.left - root.scrollLeft;
  var mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
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
  rectangle(paddleX, 490, paddleWidth, 10, 'white'); //draw bottom paddle
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
