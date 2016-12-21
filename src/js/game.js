'use strict';

const game = document.getElementById('game');
const colorBg = '#8bc34a';
const colorBall = '#ffffff';
const colorPaddle = '#ffd740';
const ballSize = 6;
const padding = 20;

let ball;
let paddlePlayer;
let paddleComputer;
let scorePlayer;
let scoreComputer;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent(game);
  paddlePlayer = Paddle(padding);
  paddleComputer = Paddle(width - padding);
  ball = Ball();
}

function draw() {
  background(colorBg);
  // draw net
  stroke(colorBall);
  strokeWeight(2)
  line(width / 2, 0, width / 2, height);
  // draw horizontal middle
  stroke(255, 50);
  strokeWeight(1)
  line(0, height / 2, width, height / 2);
  paddlePlayer.render();
  paddlePlayer.update();
  paddleComputer.render();
  paddleComputer.update();
  ball.hit(paddlePlayer);
  ball.hit(paddleComputer);
  ball.render();
  ball.update();
  if (ball.isOffscreen()) {
    ball = Ball();
  }
}

function keyPressed() {
  if (key === ' ') {
    // drop ball
  }
  if (keyCode === UP_ARROW) {
    paddleComputer.move('up');
  }
  else if (keyCode === DOWN_ARROW) {
    paddleComputer.move('down');
  }

  if (keyCode === 87) {
    paddlePlayer.move('up');
  }
  else if (keyCode === 83) {
    paddlePlayer.move('down');
  }
}

function keyReleased() {
  paddlePlayer.move('stop');
  paddleComputer.move('stop');
}

// function touchStarted() {
//   let pos = touches[0].y;
//   if (pos && pos < height / 2) {
//     paddlePlayer.move('up');
//   }
//   else if (pos && pos >= height / 2) {
//     paddlePlayer.move('down');
//   }
// }
//
// function touchEnded() {
//   paddlePlayer.move('stop')
// }

function Paddle(x) {
  const size = height / 8;
  const weight = 6;
  let pos = createVector(x, height / 2 - size / 2);
  let velocity = createVector(0, 0);
  let isMoving = false;

  function render() {
    stroke(colorPaddle);
    strokeWeight(weight);
    line(pos.x, pos.y, pos.x, pos.y + size);
  }

  function update() {
    pos.y = constrain(pos.y, weight / 2, height - size - weight / 2);

    if (isMoving) {
      pos.add(velocity);
    }
  }

  function move(direction) {
    isMoving = true;
    if (direction === 'up') {
      velocity.y -= 10;
    }

    else if (direction === 'down') {
      velocity.y += 10;
    }

    if (direction === 'stop') {
      velocity.y = 0;
      isMoving = false;
    }
  }

  return {
    render: render,
    update: update,
    move: move,
    size: size,
    pos: pos
  }
}

function Ball() {
  let pos = createVector(width / 2, height / 2);
  let velocity = createVector(random(-3, -3), random(-3, 3));

  function render() {
    stroke(colorBall);
    strokeWeight(ballSize);
    point(pos.x, pos.y);
  }

  function update() {
    bounce();
    pos.add(velocity);
  }

  function bounce() {
    if (pos.y < 0 + ballSize / 2 || pos.y > height - ballSize / 2) {
      velocity.y *= -1;
    }
  }

  function bounceBack() {
    velocity.x *= -1;
  }

  function hit(paddle) {
    let distX;
    let distY;

    // TODO: minus paddle width
    if (paddle.pos.x <= width / 2) {
      distX = pos.x - paddle.pos.x;
    }
    else {
      distX = paddle.pos.x - pos.x;
    }



    if (distX <= 0) {
      if (pos.y - paddle.pos.y > 0 && pos.y - paddle.pos.y < paddle.size) {
        velocity.x *= -1;
      }
      // noLoop();
    }


    // let d = dist(pos.x, pos.y, paddle.pos.x, paddle.pos.y);
    // if (d < 20) {
    //   console.log(d, pos.y - paddle.pos.y);
    // }
    // if (pos.x <= paddle.pos.x) {
    //   // velocity.x *= -1;
    // }
  }

  function isOffscreen() {
    return (pos.x < 0 || pos.x > width);
  }

  return {
    render: render,
    update: update,
    bounce: bounce,
    hit: hit,
    bounceBack: bounceBack,
    isOffscreen: isOffscreen,
    pos: pos
  }
}

function Score(name) {
  let pos = createVector(x, height / 2);
  let points = 0;

  function render() {

  }

  function update() {

  }

  return {
    render: render,
    update: update
  }
}
