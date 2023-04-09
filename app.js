const grid = document.querySelector(".grid");
const brickWidth = 100;
const brickHeight = 20;
const boardHeight = 560;
const boardWidth = 300;
let scoreDisplay = document.querySelector("#score");
let playerStartingPositionX = 230;
let playerCurrentPositionX = playerStartingPositionX;
let ballStartingPosition = [280, 23];
let ballCurrentPosition = ballStartingPosition;
let directionX = 2;
let directionY = 2;
let ballDiameter = 15;
let identifier;
let score = 0;

class Brick {
  constructor(xAxis, yAxis) {
    this.leftBottomCorner = [xAxis, yAxis];
    this.rightBottomCorner = [xAxis + brickWidth, yAxis];
    this.rightTopCorner = [xAxis + brickWidth, yAxis + brickHeight];
    this.leftTopCorner = [xAxis, yAxis + brickHeight];
  }
}

const bricks = [
  new Brick(10, 270),
  new Brick(10, 240),
  new Brick(10, 210),
  new Brick(120, 270),
  new Brick(120, 240),
  new Brick(120, 210),
  new Brick(230, 270),
  new Brick(230, 240),
  new Brick(230, 210),
  new Brick(340, 270),
  new Brick(340, 240),
  new Brick(340, 210),
  new Brick(450, 270),
  new Brick(450, 240),
  new Brick(450, 210),
];

bricks.forEach((element) => {
  let brick = document.createElement("div");
  brick.style.left = element.leftBottomCorner[0] + "px";
  brick.style.bottom = element.leftBottomCorner[1] + "px";
  brick.setAttribute("class", "brick");
  grid.appendChild(brick);
});

let player = document.createElement("div");
player.setAttribute("class", "player");
player.style.left = playerCurrentPositionX + "px";
grid.appendChild(player);

document.addEventListener("keydown", movePlayer)

function movePlayer(event) {
  switch (event.key) {
    case "ArrowRight":
      if (playerCurrentPositionX < boardHeight - brickWidth) {
        playerCurrentPositionX += 10;
      }
      break;
    case "ArrowLeft":
      if (playerCurrentPositionX > 0) {
        playerCurrentPositionX -= 10;
      }
      break;
  }
  player.style.left = playerCurrentPositionX + "px";
};

let ball = document.createElement("div");
ball.setAttribute("class", "ball");
positionBall();
grid.appendChild(ball);

function positionBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

function moveBall() {
  ballCurrentPosition[0] += directionX;
  ballCurrentPosition[1] += directionY;
  positionBall();
  checkForCollision();
}

identifier = setInterval(moveBall, 30);

function checkForCollision() {
  console.log("checking for collision");

  // wall collisions
  if (
    ballCurrentPosition[1] >= boardWidth - ballDiameter ||
    ballCurrentPosition[0] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }
  if (ballCurrentPosition[1] < 0) {
    scoreDisplay.innerHTML = "Game over!!!";
    clearInterval(identifier);
    document.addEventListener("keydown", movePlayer)
  }

  // brick collisions
  for (let i = 0; i < bricks.length; i++) {
    if (
      ballCurrentPosition[0] + ballDiameter <= bricks[i].rightBottomCorner[0] &&
      ballCurrentPosition[0] >= bricks[i].leftBottomCorner[0] &&
      ballCurrentPosition[1] + ballDiameter >= bricks[i].leftBottomCorner[1] &&
      ballCurrentPosition[1] <= bricks[i].leftTopCorner[1]
    ) {
      changeDirection();
      const allBricks = document.querySelectorAll(".brick");
      allBricks[i].classList.remove("brick");
      bricks.splice(i, 1);
      score++;
      scoreDisplay.innerHTML = "Score: " +score;

      if (bricks.length === 0) {
        scoreDisplay.innerHTML = "You win!!!";
        clearInterval(identifier);
        document.addEventListener("keydown", movePlayer);
      }
    }
  }

  // user collisions
  if (
    (ballCurrentPosition[0] + ballDiameter <= playerCurrentPositionX + brickWidth) &&
    (ballCurrentPosition[0] >= playerCurrentPositionX) && (ballCurrentPosition[1] <= brickHeight)
  ) {
    changeDirection();
  }
}

function changeDirection() {
  if (directionX === 2 && directionY === 2) {
    directionY = -2;
    return;
  }
  if (directionX === -2 && directionY === 2) {
    directionX = 2;
    return;
  }
  if (directionX === 2 && directionY === -2) {
    directionX = -2;
    return;
  }
  if (directionX === -2 && directionY === -2) {
    directionY = 2;
    return;
  }
}
