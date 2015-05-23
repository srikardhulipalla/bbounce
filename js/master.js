// Direction - a global variable to randomly set movement of the newly created ball
var direction = 0;

// Triggers on button click
function addBall(){
	
	// Count the number of balls to create dynamic and unique ID's
	var ballCount =  document.getElementsByTagName("span").length+1;
	
	// Assign a random color to the ball
	var newColor = getRandomColor();
	
	// Get position of the rectangular box
	var elePosObj = getElementPosition(element);
	var fenceLeft = elePosObj.x;
	// Minus from rectangular box width as ball width is 20 and border is 10(5 on each side)
	var fenceRight = elePosObj.x + 570;
	var fenceTop = elePosObj.y;
	// Minus from rectangular box width as ball height is 20 and border is 10(5 on each side)
	var fenceBottom = elePosObj.y + 370;
	
	// Get new position to move the ball
	var newEleXpos = getRandomNumber(fenceLeft, fenceRight);
	var newEleYpos = getRandomNumber(fenceTop, fenceBottom);
	
	// Create a inline-block, absolutely placed element with predefined dimensions	
	var ball = document.createElement("span");
	ball.setAttribute("class", "ball");
	ball.setAttribute("id", "ball"+ballCount);
	ball.style.position = "absolute";
	ball.style.left = newEleXpos+"px";
	ball.style.top = newEleYpos+"px";
	ball.style.backgroundColor = newColor;
	
	// Append ball to the fence (rectangular box)
	var element = document.getElementById("fence");
	element.appendChild(ball);	
	
	// If direction is zero, move ball from left to right and vice versa
	// Set direction to 1 if true
	if(direction === 0){
		var animIdForth = setInterval(
			function(){ 
				moveObjectForth(animIdForth,ball,fenceLeft,fenceRight);
		}, 50);
		direction = 1;
	}
	// If direction is zero, move ball from top to bottom and vice versa
	// Set direction to 0 if true
	else{
		var animIdForth = setInterval(
			function(){ 
				moveObjectBottom(animIdForth,ball,fenceTop,fenceBottom);
		}, 50);
		direction = 0;
	}
}

// Compute position of the element
function getElementPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

// Compute random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Compute random color
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Note: Redundant functions, can be further optimized.

// Function to move a ball in forward direction
function moveObjectForth(animIdForth,ball,fenceLeft,fenceRight){
	var endLimit = fenceRight;
	var x = parseInt(ball.style.left)+5;
	if(x >= fenceRight){
		x = fenceRight
		ball.style.left = x+"px";
		clearInterval(animIdForth);
		var animIdBack = setInterval(
		function(){ 
			moveObjectBack(animIdBack,ball,fenceLeft,fenceRight);
		}, 50);
	}
	else{
		ball.style.left = x+"px";
	}
}

// Function to move a ball in backward direction
function moveObjectBack(animIdBack,ball,fenceLeft,fenceRight){
	var startLimit = fenceLeft;
	var x = parseInt(ball.style.left)-5;
	if(x <= fenceLeft){
		x = fenceLeft
		ball.style.left = x+"px";
		clearInterval(animIdBack);
		var animIdForth = setInterval(
		function(){ 
			moveObjectForth(animIdForth,ball,fenceLeft,fenceRight);
		}, 50);
	}
	else{
		ball.style.left = x+"px";
	}
}


// Function to move a ball in bottom direction
function moveObjectBottom(animIdBottom,ball,fenceTop,fenceBottom){
	var endLimit = fenceBottom;
	var x = parseInt(ball.style.top)+5;
	if(x >= fenceBottom){
		x = fenceBottom
		ball.style.top = x+"px";
		clearInterval(animIdBottom);
		var animIdTop = setInterval(
		function(){ 
			moveObjectTop(animIdTop,ball,fenceTop,fenceBottom);
		}, 50);
	}
	else{
		ball.style.top = x+"px";
	}
}

// Function to move a ball in top direction
function moveObjectTop(animIdTop,ball,fenceTop,fenceBottom){
	var startLimit = fenceTop;
	var x = parseInt(ball.style.top)-5;
	if(x <= fenceTop){
		x = fenceTop
		ball.style.top = x+"px";
		clearInterval(animIdTop);
		var animIdBottom = setInterval(
		function(){ 
			moveObjectBottom(animIdBottom,ball,fenceTop,fenceBottom);
		}, 50);
	}
	else{
		ball.style.top = x+"px";
	}
}
