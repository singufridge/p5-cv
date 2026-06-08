// canonical hand pose detection script
// I took bits of this from the ML5 website 
// Michael Palumbo

let video;
let handPose;
let hands = [];

let cutoff = 0;
let sizeUp = 550;
let sizeDown = 60;

let drawCoords = [];

let brushSize = 10;

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  handPose.detectStart(video, function(results) {
    hands = results;
  });
}

function draw() {
  if (video) {
    push();
    translate(width, 0);
    scale(-1,1);
    image(video, 0, 0, width, height);
    pop();
  }

  for (let hand of hands) {
    for (let kp of hand.keypoints) {
      let mirroredX = width - kp.x;
      circle(mirroredX, kp.y, brushSize);
      }
  }
}

  /*
  for (let point of drawCoords) {
    fill(0, 255, 0);
    noStroke();
    circle(point[0], point[1], point[2]);
  }

  if (hands.length > 1) {
    console.log('two hands!');
  }

  stroke(255, 0, 0);
  strokeWeight(4);
}

function clearCanvas() {
  drawCoords = [];
}
  */