 $(document).ready(function(){
	//define some globals
	canvasWidth = 1000;
	canvasHeight = 500;
	numberOfBubbles = 30;
	minRadius = 30;
	maxRadius = 70;
	minVelocity = -3;
	maxVelocity = 3;

	runAnimation = true;

	//run main function
	main();

	//allow user to start and stop the animation
	$("#start").click(function(){
		runAnimation = true;
	});

	$("#stop").click(function(){
		runAnimation = false;
	})
});

//runs the canvas and animation
function main(){

	bubbles = new Array(); //create array of bubbles

	//initialise the bubbles array
	for(var i = 0; i <= numberOfBubbles; i++){
		//initialise bubble
		bubbles[i] = initialiseBubble();
		//draw bubble on canvas
		drawBubble(bubbles[i]);
	}
	//move bubbles to their next position
	moveBubble(bubbles);

	//repeat this every 50 milliseconds
	setInterval(moveBubble, 50);

}

//creates a bubble object, putting in in a random position on the canvas and giving it a random size
function initialiseBubble(){
	bubble = new Object();

	//keep track of bubbles position on X and Y axis
	bubble.x = randomX();
	bubble.y = randomY();
	bubble.radius = randomRadius();

	//ensure that the bubble starts fully within the canvas on the X axis
	if((bubble.x + bubble.radius) > canvas.width){
		//if it doesn't ensure that it does
		bubble.x -= bubble.radius;
	}else if((bubble.x - bubble.radius) < 0){
		bubble.x += bubble.radius;
	}

	//ensure that the bubble starts fully within the canvas on the Y axis
	if((bubble.y + bubble.radius) > canvas.height){
		//if it doesn't ensure that it does
		bubble.y -= bubble.radius;
	}else if((bubble.y - bubble.radius) < 0){
		bubble.y += bubble.radius;
	}

	//randomly decide whether to give bubble a positive or negative velocity on the X axis
	if(decision() == 1){
		//give a positive velocity
		bubble.xVel = positiveVel();
	}else{
		//give a negative velocitu
		bubble.xVel = minusVel();
	}

	//randomly decide whether to give bubble a positive or negative velocity on Y axis
	if(decision() == true){
		//give a positive velocity
		bubble.yVel = positiveVel();
	}else{
		//negative velocity
		bubble.yVel = minusVel();
	}

	//ensure bubble is not stationary
	if((bubble.xVel == 0) && (bubble.yVel == 0)){
		//if so make it move
		bubble.xVel = 2;
	}

	return bubble;
}//end initialise bubble

			//draws the bubble on the canvas using its X and Y position generated earlier
function drawBubble(object){

	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");

	ctx.beginPath();
	ctx.arc((object.x),(object.y),(object.radius),0,2*Math.PI);
	ctx.stroke();
	ctx.fillStyle="blue";
	ctx.globalAlpha=0.4;
	ctx.fill();

}//end drawBubble

//creates the effect of a moving bubble but in reality throws away all the old bubbles and moves each one to a slightly different position
function moveBubble(){

	//only run if runAnimation is true - allows user to stop the animation
	if(runAnimation == true){

		var canvas = document.getElementById('canvas');

		//Clear the canvas of all old bubbles	
		canvas.width = canvas.width;

		//check to ensure a bubble is not going off the canvas
		for(var i = 0; i <= 30; i++){

			//if off to right
			if((bubbles[i].x + bubbles[i].radius) > canvas.width){
				//make xVel negative
				bubbles[i].xVel = -bubbles[i].xVel;
			}
			//off to the left
			else if((bubbles[i].x - bubbles[i].radius) < 0){
				//make xVel positive
				bubbles[i].xVel = bubbles[i].xVel * -1;
			}
				//move bubble to new position 	
				bubbles[i].x += bubbles[i].xVel;

			//is off at the top
			if((bubbles[i].y + bubbles[i].radius) > canvas.height){
				//make yVel negative
				bubbles[i].yVel = -bubbles[i].yVel;
			}//is off at bottom
			else if((bubbles[i].y - bubbles[i].radius) < 0){
				//make yVel positive
				bubbles[i].yVel = bubbles[i].yVel * -1;
			}
				//move bubble to new position
				bubbles[i].y += bubbles[i].yVel;
			//re-draw the bubbles	
			drawBubble(bubbles[i]);
		}
	}//end if runAnimation
}//end moveBubble

//gives the bubble a random position on the X axis
function randomX(){
	return Math.random() * (canvasWidth);
}

//gives the bubble a random position on the Y axis
function randomY(){
	return Math.random() * (canvasHeight);
}

//gives the bubble a random size between 30 and 70 rounded to nearest integer
function randomRadius(){
	return Math.floor(Math.random() * ((maxRadius - minRadius + 1) + minRadius));
}

//used as to make a decision on whether the bubble heads in a postive or negative direction along an axis
function decision(){
	return Math.floor(Math.random() * (2));
}

//generates a random velocity for a bubble between -3 and 0
function minusVel(){
	return (Math.random()* 0) + (minVelocity);
}

//generates a random velocity for a bubble between 0 and 3
function positiveVel(){
	return (Math.random()* maxVelocity);
}