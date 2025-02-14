class GameView {
  constructor() {
    let canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.offsetTop = canvas.offsetTop;
  }

  draw(...entities) {
    //Draw Board
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);

    entities.forEach((entity) => entity.draw(this.ctx));
  }
  drawScores(scores) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px monospace";
    this.ctx.textAlign = "left";
    this.ctx.fillText(scores.leftScore.toString(), 50, 50);
    this.ctx.textAlign = "right";
    this.ctx.fillText(scores.rightScore.toString(), this.width - 50, 50);
  }

  drawGameOver() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "13px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER - press 'r' to restart!",
      this.width / 2,
      this.height / 2
    );
  }
}

class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  boundingBox() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height,
    };
  }
  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Paddle extends Entity {
  static WIDTH = 5;
  static HEIGHT = 20;
  static OFFSET = 10;

  constructor(x, y) {
    super(x, y, Paddle.WIDTH, Paddle.HEIGHT);
  }
}

class Ball extends Entity {
  static SIZE = 5;

  constructor() {
    super(0, 0, Ball.SIZE, Ball.SIZE);
    this.init();
  }

  init() {
    this.x = 20;
    this.y = 30;
    this.xSpeed = 4;
    this.ySpeed = 2;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  adjustAngle(distanceFromTop, distanceFromBottom) {
    if (distanceFromTop < 0) {
      this.ySpeed -= 0.5;
    } else if (distanceFromBottom < 0) {
      this.ySpeed += 0.5;
    }
  }

  checkPaddleCollision(paddle, xSpeedAfterBounce) {
    let ballBox = this.boundingBox();
    let paddleBox = paddle.boundingBox();

    //Check if ball is colliding with paddle, boolean value
    let collisionOccurred =
      ballBox.left < paddleBox.right &&
      ballBox.right > paddleBox.left &&
      ballBox.top < paddleBox.bottom &&
      ballBox.bottom > paddleBox.top;

    if (collisionOccurred) {
      let distanceFromTop = ballBox.top - paddleBox.top;
      let distanceFromBottom = paddleBox.bottom - ballBox.bottom;
      this.adjustAngle(distanceFromTop, distanceFromBottom);
      this.xSpeed = xSpeedAfterBounce;
    }
  }
  checkWallCollision(width, height, scores) {
    let ballBox = this.boundingBox();

    if (ballBox.left < 0) {
      scores.rightScore++;
      this.init();
    }
    if (ballBox.right > width) {
      scores.leftScore++;
      this.init();
    }
    if (ballBox.top < 0 || ballBox.bottom > height) {
      this.ySpeed = -this.ySpeed;
    }
  }
}

class Scores {
  constructor() {
    this.leftScore = 0;
    this.rightScore = 0;
  }
}

class Computer {
  static followBall(paddle, ball) {
    const MAX_SPEED = 2;
    let ballBox = ball.boundingBox();
    let paddleBox = paddle.boundingBox();

    if (ballBox.top < paddleBox.top) {
      paddle.y -= MAX_SPEED;
    } else if (ballBox.bottom > paddleBox.bottom) {
      paddle.y += MAX_SPEED;
    }
  }
  static restartGame(){
    const restartKey = "r";
    document.addEventListener("keydown", (e) => {
    if(e.key === restartKey){
      let game = new Game();
      game.loop();
    }
  }); 
}}

//Esse é o jogo propriamente dito
class Game {
  constructor() {
    this.gameView = new GameView();
    this.ball = new Ball();
    this.leftPaddle = new Paddle(Paddle.OFFSET, 10);
    this.rightPaddle = new Paddle(
      this.gameView.width - Paddle.OFFSET - Paddle.WIDTH,
      30
    );
    this.scores = new Scores();
    this.gameOver = false;

    document.addEventListener("mousemove", (e) => {
      this.rightPaddle.y = e.y - this.gameView.offsetTop;
    });
  }

  draw(){
    this.gameView.draw(this.ball, this.leftPaddle, this.rightPaddle);
    this.gameView.drawScores(this.scores);
  }

  checkCollision(){
    this.ball.checkPaddleCollision(this.leftPaddle, Math.abs(this.ball.xSpeed));
    this.ball.checkPaddleCollision(this.rightPaddle, -Math.abs(this.ball.xSpeed));
    this.ball.checkWallCollision(this.gameView.width, this.gameView.height, this.scores);

  if(this.scores.leftScore > 9 || this.scores.rightScore > 9){
    this.gameOver = true;
  }
  }

  update(){
    this.ball.update();
    Computer.followBall(this.leftPaddle, this.ball);
  }
  loop(){
    this.draw();
    this.update();
    this.checkCollision();

    if(this.gameOver){
      this.draw();
      this.gameView.drawGameOver();
      this.restartGame();
  }

  else{
      setTimeout(() => this.loop(), 30);
  }
}
  restartGame(){
  Computer.restartGame();
}
}

let game = new Game();
game.loop();
/*


const MAX_COMPUTER_SPEED = 2;




}

let leftPaddleTop = 10;
let paddleTop = 30;


let gameOver = false;

document.addEventListener("mousemove", (e) => {
  paddleTop = e.y - canvas.offsetTop;
});



function draw() {
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
}


function update() {

  followBall();  
}


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
*/
