var video = "", objectDetector, canvas, status;

function preload() {
  video = createVideo('video.mp4');
  video.hide();
}

function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
}

function draw() {
  image(video, 0, 0, 480, 380);
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', () => {
    status = true;
    vodep.loop();
    video.speed(1);
    video.volume(0);
  });
  document.getElementById("status").innerHTML = "Status: Detecting Objects";
}