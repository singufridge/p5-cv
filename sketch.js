// canonical hand pose detection script
// I took bits of this from the ML5 website 
// Michael Palumbo

/*
let video;
let faceMesh;
let faces = [];

let jointSize = 5;

function preload() {
  faceMesh = ml5.faceMesh();
}

function setup() {
  createCanvas(1080, 780);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  faceMesh.detectStart(video, function gotFaces(results) {
    faces = results;
  });

  console.log(faceMesh.getUVCoords());
}

function draw() {
  if (video) { //mirror video and joints
    push();
    translate(width, 0);
    scale(-1,1);
    image(video, 0, 0, width, height);
    pop();
  }

  for (let face of faces) { //draw points for joints
    for (let kp of face.keypoints) {
      let mirroredX = width - kp.x;
      noStroke();
      circle(mirroredX, kp.y, jointSize);
    }
  }
}
  */

var screen = 0;
var y = -20;
var x = 200;
var speed = 2;
var score= 0;

function preload(){
}

function setup() {
  createCanvas(1000, 700);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  if (video) { //mirror video and joints
    push();
    translate(width, 0);
    scale(-1,1);
    image(video, 0, 0, width, height);
    pop();
  }

	if(screen == 0){
    startScreen()
  }else if(screen == 1){
  	gameOn()
  }else if(screen==2){
  	endScreen()
  }	
}

function startScreen(){
		fill(255)
		textAlign(CENTER);
		text('WELCOME TO MY CATCHING GAME', width / 2, height / 2)
		text('click to start', width / 2, height / 2 + 20);
		reset();
}

function gameOn(){
  text("score = " + score, 30,20)
  textAlign(CENTER);
  text('USE THE MOUSE POINTER TO CATCH THE FALLING BALLS IN THE BASKET',300,50);
  fill("red");

  ellipse(x,y,20,20)
  fill("yellow");
  rectMode(CENTER)
  rect(mouseX,height-10,50,30)
  
	y += speed;
  if (y > height) {
  	screen =2
	}

  if (y > height - 10 && x > mouseX - 20 && x < mouseX + 20) {
  	y=-20
    speed+=.5
    score+= 1
  }

	if(y == -20) {
  	pickRandom();
  }
}

function pickRandom() {
	x= random(20,width-20)
}

function endScreen() {
		background(150)
		textAlign(CENTER);
		text('GAME OVER', width / 2, height / 2)
  	text("SCORE = " + score, width / 2, height / 2 + 20)
		text('click to play again', width / 2, height / 2 + 40);
}

function mousePressed() {
	if(screen==0){
  	screen=1
  }else if(screen==2){
  	screen=0
  }
}

function reset() {
	  score = 0;
  	speed = 2;
  	y = -20;
}
