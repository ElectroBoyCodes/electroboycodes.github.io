
/*created by prashant shukla */

var paddle2 =10,paddle1=10;

var paddle1X = 10,paddle1Height = 110;
var paddle2Y = 685,paddle2Height = 70;

var score1 = 0, score2 =0;
var paddle1Y;

var  playerscore =0;
var audio1;
var pcscore =0;
var video, canvas;
//ball x and y and speedx speed y and radius
var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}

var start = false, canvas;

var hand = 0, missSound;

function stargt() {
  loop();
  start= true;
  document.getElementById("start").style.display = "none";
  canvas.parent('canvas');

	video = createCapture(VIDEO);
	video.size(800, 400);
	video.parent('console');
	ml5.poseNet(video, () => console.log("model loaded")).on('pose', (results) => {
		console.log(results);
		if(results.length > 0) {
			hand = results[0].pose.leftWrist.x;
      circle(results[0].pose.leftWrist.x, results[0].pose.leftWrist.y, 80);
		}
	});
}

function setup(){
  canvas =  createCanvas(700,600);
  missSound = loadSound("missed.wav");
}


function draw(){

 if(start) {
  background(0); 

  fill("black");
  stroke("black");
  rect(680,0,20,700);
 
  fill("black");
  stroke("black");
  rect(0,0,20,700);
  
    //funtion paddleInCanvas call 
    paddleInCanvas();
  
    //left paddle
    fill(250,0,0);
     stroke(0,0,250);
     strokeWeight(0.5);
    paddle1Y = hand; 
    rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);
    
    
     //pc computer paddle
     fill("#FFA500");
     stroke("#FFA500");
    var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
     
     //function midline call
     midline();
     
     //funtion drawScore call 
    drawScore();
    
    //function models call  
    models();
    
    //function move call which in very important
     move();
 }
}



//function reset when ball does notcame in the contact of padde
function reset(){
   ball.x = width/2+100,
   ball.y = height/2+100;
   ball.dx=3;
   ball.dy =3;
   
}


//function midline draw a line in center
function midline(){
    for(i=0;i<480;i+=10) {
    var y = 0;
    fill("white");
    stroke(0);
    rect(width/2,y+i,10,480);
    }
}


//function drawScore show scores
function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("white");
    stroke(250,0,0)
    text("Player:",100,50)
    text(playerscore,140,50);
    text("Computer:",500,50)
    text(pcscore,555,50)
}


//very important function of this game
function move(){
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(ball.x,ball.y,ball.r,20)
   ball.x = ball.x + ball.dx;
   ball.y = ball.y + ball.dy;
   if(ball.x+ball.r>width-ball.r/2){
       ball.dx=-ball.dx-0.5;       
   }
  if (ball.x-2.5*ball.r/2< 0){
  if (ball.y >= paddle1Y&& ball.y <= paddle1Y + paddle1Height) {
    ball.dx = -ball.dx+0.5; 
  }
  else{
    missSound.play();
    pcscore++;
    reset();
    navigator.vibrate(100);
  }
}
if(pcscore ==4){
    fill("#FFA500");
    stroke(0)
    rect(0,0,width,height-1);
    fill("white");
    stroke("white");
    textSize(25)
    text("Game Over!☹☹",width/2,height/2);
    start = false;
    document.getElementById("start").style.display = "block";
    noLoop();
    pcscore = 0;
}
   if(ball.y+ball.r > height || ball.y-ball.r <0){
       ball.dy =- ball.dy;
   }   
}


//width height of canvas speed of ball 
function models(){
    textSize(18);
    fill(255);
    noStroke();
    text("Width:"+width,135,15);
    text("Speed:"+abs(ball.dx),50,15);
    text("Height:"+height,235,15)
}


//this function help to not go te paddle out of canvas
function paddleInCanvas(){
  if(hand+paddle1Height > height)
    hand=height-paddle1Height;
  if(hand < 0)
    hand =0;
}
