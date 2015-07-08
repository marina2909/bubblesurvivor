'use strict';

var animationDuration = {
	bulletExplosion: 250,
	bubbleExplosion: 700,
	bubble: 400,
	blackHole: 1000
}

var gameState = { 
	points: 0,
	bubbleSpeed: app.bubbleStartSpeed,
	startTime: performance.now(),
	totalBubbles: 0,
	gameOver: false,
	gameStart: false
}

var sounds;
var energy;
var entities;
var keysDown;
var loop;
var soundIcon;
var images;

var resetGame = function(){
	
	sounds.introSound.stop();
	
	loop = function() {
		var lastFrameTime = performance.now();
		return function(time){
			var dt = time - lastFrameTime;
			updateState(dt, keysDown.getKeys());
			draw(time - gameState.startTime);
			lastFrameTime = time;
			if (gameState.gameOver){
				finishGame();		
			} else {
				requestAnimationFrame(loop);
			}
		};
	}();
	
	energy.reset();
	resetGameStateVariables();
	
	// make sure you start the game after all images are loaded
	images = gameImages();
	images.load(function(){
		requestAnimationFrame(loop);
	});
	entities = new Entities();
	
}


function load(){  

	// create offset canvas
	app.canvas  = document.createElement('canvas');
	app.canvas.width = app.canvasWidth;
	app.canvas.height = app.canvasHeight;
	app.ctx = app.canvas.getContext('2d');
	app.ctx.font="bold 25px Arial";
	app.ctx.fillStyle = "white";
	
	// create main canvas
	app.canvasMain= document.getElementById("mainCanvas");
	app.canvasMain.width = app.canvasWidth;
	app.canvasMain.height = app.canvasHeight;
	app.ctxMain = app.canvasMain.getContext('2d');
	
	keysDown = new keysDown();
	sounds = new Sounds();
	energy = energy();
	
	var soundSlider = slider();
	soundIcon = soundicon();
	soundIcon.setActionOnClick(function(){
		soundSlider.show(soundIcon.getCanvasX()  + app.canvasMain.offsetLeft, soundIcon.getCanvasY() + app.canvasMain.offsetTop);
	});
	
	setHomeScreenBubblePlay();
	sounds.introSound.play();
	
	document.getElementById('startbtn').addEventListener('click', function(){
		document.getElementsByClassName('start')[0].style.display = "none";
		gameState.gameStart = true;
		resetGame(); 		
	}, false);
	
	document.getElementById('restartbtn').addEventListener('click', function(){
		document.getElementsByClassName('finish')[0].style.display = "none";
		resetGame();     
	}, false);
	
	document.addEventListener('click', function(e){
		if (!soundSlider.isClicked(e) && !soundIcon.isClicked(e)){
			soundSlider.hide();
		}
	});
	
	document.getElementById('startbtn').focus();
	
}


function finishGame(){
	document.getElementsByClassName('finish')[0].style.display = "block";
	document.getElementsByClassName('totalPoints')[0].innerHTML = "Total points: " + gameState.points;
	document.getElementById('restartbtn').focus();
}

function getRandomInt(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
};

function setHomeScreenBubblePlay(){
	var evilImg = loadImg('img/evilbubble0.png');
	var goodImg = loadImg('img/goodbubble0.png');
	var pointImg = loadImg('img/pointbubble.png');
	
	var r = 40;
	var xEvil = 0;
	var yEvil = 0;
	var xGood = app.canvasWidth;
	var yGood = app.canvasHeight;
	var xPoint = 0;
	var yPoint= app.canvasHeight/2;
	
	function _draw(){
		app.ctxMain.drawImage(evilImg, xEvil, yEvil, 2*r, 2*r);
		app.ctxMain.drawImage(goodImg, xGood, yGood, 2*r, 2*r);
		app.ctxMain.drawImage(pointImg, xPoint, yPoint, r, r);
		soundIcon.draw();
	}
	
	function _calculateCoordinates(dt){
		var step = app.bubbleStartSpeed * dt;
		xEvil += step;
		yEvil += step;
		xGood -= step;
		yGood -= step;
		xPoint +=step;
		if (yEvil > app.canvasHeight){
			yEvil = 0;
		}
		if (xEvil > app.canvasWidth){
			xEvil = 0;
		}
		if (yGood< -60){
			yGood = app.canvasHeight;
		}
		if (xGood < -60){
			xGood= app.canvasWidth;
		}
		if (xPoint> app.canvasWidth){
			xPoint= 0;
		}
	}
	var loopStart = function() {
		var lastFrameTime = performance.now();
		return function(time){
			app.ctxMain.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
			var dt = time - lastFrameTime;
		
			_calculateCoordinates(dt);
			_draw();
			
			lastFrameTime = time;
			if (!gameState.gameStart){
				requestAnimationFrame(loopStart);
			}
		};
	}();
	requestAnimationFrame(loopStart);
	
}


function resetGameStateVariables(){
	gameState.points = 0;
	gameState.bubbleSpeed = app.bubbleStartSpeed;
	gameState.startTime = performance.now();
	gameState.totalBubbles = 0;
	gameState.gameOver = false;
}

