'use strict';

const game = document.getElementById('game');
const colorBg = '#8bc34a';
const colorBall = '#ffffff';
const colorPaddle = '#ffd740';

let ball;
let paddlePlayer;
let paddleComputer;
let scorePlayer;
let scoreComputer;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent(game);
  paddlePlayer = Paddle(20);
  paddleComputer = Paddle(width - 20);
  ball = Ball();
}

function draw() {
  background(colorBg);
  // draw net
  stroke(colorBall);
  strokeWeight(2)
  line(width / 2, 0, width / 2, height);
  paddlePlayer.render();
  paddleComputer.render();
  ball.render();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    paddlePlayer.move(up);
  }
}

function Ball() {
  let pos = createVector(width / 2, height / 2);

  function render() {
    stroke(colorBall);
    strokeWeight(6);
    point(pos.x, pos.y);
  }

  function update() {

  }

  return {
    render: render,
    update: update,
    pos: pos
  }
}

function Paddle(x) {
  const size = width / 10;
  let pos = createVector(x, height / 2 - size / 2);

  function render() {
    stroke(colorPaddle);
    strokeWeight(6);
    line(pos.x, pos.y, pos.x, pos.y + size);
  }

  function update() {

  }

  function move(direction) {

  }

  return {
    render: render,
    update: update,
    move: move,
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
