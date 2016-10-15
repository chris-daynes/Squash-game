
//window.onload = function(){
$(document).ready(function(){

  var ctx = document.getElementById('game').getContext('2d');
  var ballY = 0, ballX = ctx.canvas.width/2;
  var ballSpeedY = 10, ballSpeedX = 10;
  var paddleX = 200; //x position of paddle
  var paddleWidth = 100;
  var cW = ctx.canvas.width, cH = ctx.canvas.height;
  var wallSound = new sound('bleep1.mp3');
  var paddleSound = new sound('paddle.wav');
  var gameOverSound = new sound('game_over.wav');

  function animate(){
    ctx.save();
    ctx.clearRect(0,0,cW, cH);

    drawEverything();
    ballMove();

    ctx.restore();
  }
  var animateInterval = setInterval(animate, 30);


  ctx.canvas.addEventListener('mousemove', function(e){
    var mousePos = calculateMousePos(e);
    paddleX = mousePos.x - paddleWidth/2;
  });



  function calculateMousePos(e){
    var mouseX = e.clientX -ctx.canvas.offsetLeft;
    var mouseY = e.clientY - ctx.canvas.offsetTop;
    return {
      x: mouseX,
      y: mouseY
    };
  }


  function ballMove (){
    //var bop = new Audio();
    // //var padSound = new Audio();
    // //var gameover = new Audio();
    // // gameover.src = 'game_over.wav';
    //bop.src = 'bleep1.mp3';
    // //padSound.src = 'paddle.wav';
    //these two lines changes ball position incrementally by ballSpeed.
    ballX += ballSpeedX;
    ballY += ballSpeedY;
      //here if the ball goes beyound the baseline.
      if(ballY > ctx.canvas.height){
        if(ballX>paddleX && ballX<paddleX+paddleWidth){
          paddleSound.play();
          var deltaX = ballX - (paddleX + paddleWidth/2);
          ballSpeedX = deltaX * 0.35;
          ballSpeedY = -ballSpeedY;
        }
        else {
          gameOverSound.play();
          resetBall();
        }
      }
      if(ballY < 0){
        wallSound.play();
        //bop.play();
        ballSpeedY = -ballSpeedY;
      }
      if (ballX > ctx.canvas.width) {
        wallSound.play();
        //bop.play();
        ballSpeedX = -ballSpeedX;
      }
      if (ballX < 0) {
        wallSound.play();
        //bop.play();
        ballSpeedX = -ballSpeedX;

      }
  }

  function resetBall(){
    ballY = 0;
    ballX = cW/2;
  }

  function drawEverything() {
    rectangle(0, 0, ctx.canvas.width, ctx.canvas.height, 'black'); //Fill in the canvas
    rectangle(paddleX, 490, paddleWidth, 10, 'white'); //draw bottom paddle
    ball(ballX, ballY, 10, 'yellow'); //draw a white ball.
  }

  //function constructor to draw a rectangles
  function rectangle(x, y, width, height, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  //function constructor to make a circles
  function ball (x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
  }

  //sound constructor
  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    };
}
});
