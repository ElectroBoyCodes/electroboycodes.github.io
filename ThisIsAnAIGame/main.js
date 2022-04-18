var world_start, video, canvas;

function preload() {
	world_start = loadSound("world_start.wav");
	mario_jump = loadSound("jump.wav");
	mario_coin = loadSound("coin.wav");
	gameover = loadSound("gameover.wav");
	mario_kick = loadSound("kick.wav");
	mario_die = loadSound("mariodie.wav")
	setSprites();
	MarioAnimation();
}

function setup() {
	canvas = createCanvas(1240,336);
	canvas.parent('canvas');
	instializeInSetup(mario);

	video = createCapture(VIDEO);
	video.size(800, 400);
	video.parent('console');
	ml5.poseNet(video, () => console.log("model loaded")).on('pose', (results) => {
		console.log(results);
		if(results.length > 0) {
			noseX = results[0].pose.nose.x;
			noseY = results[0].pose.nose.y;
		}
	});
}

function draw() {
	game()
}
