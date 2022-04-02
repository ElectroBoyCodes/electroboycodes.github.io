var status = "";

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(480,380);
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modeLoaded);
    document.getElementById("status").innerHTML= "Status: detecting objects";
    document.getElementById("input");
}

function modeLoaded() {
    console.log("Model is Loaded");
    status = "true";
}

function draw() {
    image(video, 0, 0, 480, 380);
}