let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

const MAX_COMPUTER_SPEED = 2;

const BALL_SIZE = 5;
let ballPosition;
let xSpeed;
let ySpeed;

function initBall() {
    ballPosition = {x: 20, y: 30};
    xSpeed = 4;
    ySpeed = 2;
}
const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let paddleTop = 30;

let leftScore = 0;
let rightScore = 0;
let gameOver = false;

document.addEventListener("mousemove", (e) => {
  paddleTop = e.y - canvas.offsetTop;
});

let restartKey = "r";
document.addEventListener("keydown", (e) => {
    if(e.key === restartKey){
        restartGame();
    }
  }); 

function draw() {
  //Draw Board
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  //Draw Ball
  ctx.fillStyle = "white";
  ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);
  //Draw Paddles
  ctx.fillRect(PADDLE_OFFSET, leftPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(
    width - PADDLE_OFFSET - PADDLE_WIDTH,
    paddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
  //Draw Scores
    ctx.font = "30px monospace";
    ctx.textAlign = "left";
    ctx.fillText(leftScore.toString(), 50, 50);
    ctx.textAlign = "right";
    ctx.fillText(rightScore.toString(), width - 50, 50);
}

function followBall(){
    let ball = {
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE
    };
    let leftPaddle = {
        top: leftPaddleTop,
        bottom: leftPaddleTop + PADDLE_HEIGHT
    };

    if(ball.top < leftPaddle.top){
        leftPaddleTop -= MAX_COMPUTER_SPEED;
    } else if(ball.bottom > leftPaddle.bottom){
        leftPaddleTop += MAX_COMPUTER_SPEED;
    }
}

function update() {
  ballPosition.x += xSpeed;
  ballPosition.y += ySpeed;
  followBall();  
}

function checkPaddleCollision(ball, paddle) {
  return (
    ball.left < paddle.right &&
    ball.right > paddle.left &&
    ball.top < paddle.bottom &&
    ball.bottom > paddle.top
  );
}

function adjustAngle(distanceFromTop, distanceFromBottom) {
  if (distanceFromTop < 0) {
    ySpeed -= 0.5;
  } else if (distanceFromBottom < 0) {
    ySpeed += 0.5;
  }
}

function checkCollision() {
  let ball = {
    left: ballPosition.x,
    right: ballPosition.x + BALL_SIZE,
    top: ballPosition.y,
    bottom: ballPosition.y + BALL_SIZE,
  };

  let leftPaddle = {
    left: PADDLE_OFFSET,
    right: PADDLE_OFFSET + PADDLE_WIDTH,
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };

  let rightPaddle = {
    left: width - PADDLE_OFFSET - PADDLE_WIDTH,
    right: width - PADDLE_OFFSET,
    top: paddleTop,
    bottom: paddleTop + PADDLE_HEIGHT,
  };
  if (checkPaddleCollision(ball, leftPaddle)) {
    let distanceFromTop = ball.top - leftPaddle.top;
    let distanceFromBottom = leftPaddle.bottom - ball.bottom;
    adjustAngle(distanceFromTop, distanceFromBottom);
    xSpeed = Math.abs(xSpeed);
  }
  if (checkPaddleCollision(ball, rightPaddle)) {
    let distanceFromTop = ball.top - rightPaddle.top;
    let distanceFromBottom = rightPaddle.bottom - ball.bottom;
    adjustAngle(distanceFromTop, distanceFromBottom);
    xSpeed = -Math.abs(xSpeed);
  }

  if (ball.left < 0) {
    rightScore++;
    initBall();
  }
  if (ball.right > width) {
    leftScore++;
    initBall();
  } 
if(leftScore > 9 || rightScore > 9){
    gameOver = true;
}
  if (ball.left < 0 || ball.right > width) {
    xSpeed = -xSpeed;
  }
  if (ball.top < 0 || ball.bottom > height) {
    ySpeed = -ySpeed;
  }
}

function drawGameOver(){
    ctx.fillStyle = "white";
    ctx.font = "13px monospace";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER - press 'r' to restart!", width/2, height/2);
}

function restartGame(){
    leftScore = 0;
    rightScore = 0;
    gameOver = false;
    initBall();
    draw();
    gameLoop();
}

function gameLoop() {
  draw();
  update();
  checkCollision();
    if(gameOver){
        draw();
        drawGameOver();
    }else{
        setTimeout(gameLoop, 30);
    }
}

initBall();
gameLoop();
