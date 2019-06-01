// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Start loading the model
  modelStartLoading();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function modelStartLoading() {
  select('#status').html('Model Start loading...');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
  getPoses(poses);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// A function to draw special stuff
function getPoses(poses) {
    for (let i = 0; i < poses.length; i++) {

        // DISPLAY EYES
        // Black around eyes
        let newX = poses[i].pose.keypoints[1].position.x
        let newY = poses[i].pose.keypoints[1].position.y
        fill(0, 0, 0);
        noStroke();
        ellipse(newX + 5, newY, 50, 50);

        let newX2 = poses[i].pose.keypoints[2].position.x
        let newY2 = poses[i].pose.keypoints[2].position.y
        fill(0, 0, 0);
        noStroke();
        ellipse(newX2 - 5, newY2, 50, 50);

        // White of the eyes
        let newX3 = poses[i].pose.keypoints[1].position.x
        let newY3 = poses[i].pose.keypoints[1].position.y
        fill(255, 255, 255);
        noStroke();
        ellipse(newX3 + 5, newY3, 45, 45);

        let newX4 = poses[i].pose.keypoints[2].position.x
        let newY4 = poses[i].pose.keypoints[2].position.y
        fill(255, 255, 255);
        noStroke();
        ellipse(newX4 - 5, newY4, 49, 49);

        // Black inside of the eyes
        let newX5 = poses[i].pose.keypoints[1].position.x
        let newY5 = poses[i].pose.keypoints[1].position.y
        fill(0, 0, 0);
        noStroke();
        ellipse(newX5 - 3 - 5, newY5 - 1, 15, 15);

        let newX6 = poses[i].pose.keypoints[2].position.x
        let newY6 = poses[i].pose.keypoints[2].position.y
        fill(0, 0, 0);
        noStroke();
        ellipse(newX6 + 1 + 5, newY6 + 3, 23, 23);
    }
}