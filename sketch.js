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

//facemesh
let video;
let faceMesh;
let faces = [];

let lipsCoords = {
  x: 0,
  y: 0
};

let mouthOpenThreshold = 50;

//ball
var screen = 0;
var y = -20;
var x = 200;
var speed = 2;
var score= 0;

function preload() {
  faceMesh = ml5.faceMesh();
}

function setup() {
  createCanvas(1000, 760);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  faceMesh.detectStart(video, function gotFaces(results) {
    faces = results;
  });
}

function draw() {
  if (video) { //mirror video and joints
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
  }

	if (screen == 0) {
    startScreen()
  } else if (screen == 1) {
  	gameOn()
  } else if (screen==2) {
  	endScreen()
  }

  if (faces.length > 0 && faces[0].lips) {
    let mirroredX = width - faces[0].lips.x - 80;

    if (faces[0].lips.height > mouthOpenThreshold) { //when mouth is open, turn rectangle yellow and add teeth to the rectangle
      fill(255, 255, 255);

      //top teeth
      triangle( //tooth 1
        mirroredX,
        faces[0].lips.y,
        (mirroredX + 30),
        faces[0].lips.y,
        (mirroredX + 15),
        (faces[0].lips.y + 30)
      );

      triangle( //tooth 2
        (mirroredX + faces[0].lips.width + 10),
        faces[0].lips.y,
        (mirroredX + faces[0].lips.width - 23),
        faces[0].lips.y,
        (mirroredX + faces[0].lips.width - 7),
        (faces[0].lips.y + 30)
      );

      //bottom teeth
      triangle( //tooth 1
        mirroredX,
        (faces[0].lips.y + faces[0].lips.height),
        (mirroredX + 30),
        (faces[0].lips.y + faces[0].lips.height),
        (mirroredX + 15),
        (faces[0].lips.y + faces[0].lips.height - 30)
      );

      triangle( //tooth 2
        (mirroredX + faces[0].lips.width + 10),
        (faces[0].lips.y + faces[0].lips.height),
        (mirroredX + faces[0].lips.width - 23),
        (faces[0].lips.y + faces[0].lips.height),
        (mirroredX + faces[0].lips.width - 7),
        (faces[0].lips.y + faces[0].lips.height - 30)
      );

      fill(255, 255, 0, 99);

      rect(
      mirroredX,
      faces[0].lips.y,
      (faces[0].lips.width + 10),
      faces[0].lips.height
      );

    };

    lipsCoords.x = mirroredX;
    lipsCoords.y = faces[0].lips.y;
  }

  /*
  for (let face of faces) { //draw points for joints
    for (let kp of face.keypoints) {
      let mirroredX = width - kp.x;
      
      if (kp.name == 'lips') {
        lips.x = mirroredX;
        lips.y = kp.y;

        circle(mirroredX, kp.y, 10);
      }

      circle(mirroredX, kp.y, 4);
    }
  }
    */
}

function startScreen() {
	fill(255)
	textAlign(CENTER);
  textSize(20);
	text('CATCH THE BALL WITH YOUR MOUTH! BE SURE TO OPEN WIDE!', width / 2, height / 2)
	text('click to start', width / 2, height / 2 + 20);
	reset();
}

function gameOn() {
  fill(255)
  textSize(20);
  textAlign(LEFT);
  textStyle(NORMAL);
  text('OPEN YOUR MOUTH TO EAT THE FALLING BALLS!', 20, 40);
  textStyle(BOLD);
  text("SCORE = " + score, 20, 70);

  fill("red");
  ellipse(x, y, 40, 40); //creating ball
  
	y += speed;
  if (y > height) {
  	screen = 2
	}

  if (y > lipsCoords.y && x > lipsCoords.x - 10 && x < lipsCoords.x + 90 && faces[0].lips.height > mouthOpenThreshold) {
  	y = -20
    speed += .5
    score += 1
  }

	if(y == -20) {
  	x = random(20, width - 20);
  }
}

function endScreen() {
	background(180)
	textAlign(CENTER);
	text('GAME OVER', width / 2, height / 2)
  text("SCORE = " + score, width / 2, height / 2 + 20)
	text('click to play again', width / 2, height / 2 + 40);
}

function mousePressed() {
	if (screen==0) {
  	screen=1
  } else if (screen==2) {
  	screen=0
  }
}

function reset() {
	score = 0;
  speed = 2;
  y = -20;
}
