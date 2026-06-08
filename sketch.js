// canonical hand pose detection script
// I took bits of this from the ML5 website 
// Michael Palumbo

let video;
let faceMesh;
let faces = [];

let jointSize = 5;

function preload() {
  faceMesh = ml5.faceMesh();
}

function setup() {
  createCanvas(640, 480);
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