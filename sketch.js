// canonical hand pose detection script
// I took bits of this from the ML5 website 
// Michael Palumbo

let handPose;
let hands = [];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  let video = createCapture(VIDEO);
  video.hide();
  handPose.detectStart(video, function(results) {
    hands = results;
  });
}

function draw() {
  background(0);
  for (let hand of hands) {
    for (let kp of hand.keypoints) {
      fill(0, 255, 0);
      noStroke();
      circle(kp.x, kp.y, 10);
    }
  }
  if (hands.length > 1) {
    console.log('two hands!');
  }
}