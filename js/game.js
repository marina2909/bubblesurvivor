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
var sicon;
var images;


var resetGame = function(){
	
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
	gameState.points = 0;
	gameState.bubbleSpeed = app.bubbleStartSpeed;
	gameState.startTime = performance.now();
	gameState.totalBubbles = 0;
	gameState.gameOver = false;
	

	images = gameImages();
	images.load(function(){
		requestAnimationFrame(loop);
	});
	entities = new Entities();
	
}


function load(){  

	app.canvas  = document.createElement('canvas');
	app.canvas.width = app.canvasWidth;
	app.canvas.height = app.canvasHeight;
	app.ctx = app.canvas.getContext('2d');
	app.ctx.font="bold 25px Arial";
	app.ctx.fillStyle = "white";
	
	app.canvasMain= document.getElementById("mainCanvas");
	app.canvasMain.width = app.canvasWidth;
	app.canvasMain.height = app.canvasHeight;
	app.ctxMain = app.canvasMain.getContext('2d');
	
	keysDown = new KeysDown();

	setHomeScreenBubbles();
	sounds = new Sounds();
	energy = energy();
	sicon = soundicon();
	
	document.getElementById('startbtn').addEventListener('click', function(){
		document.getElementsByClassName('start')[0].style.display = "none";
		gameState.gameStart = true;
		resetGame(); 		
	}, false);
	
	document.getElementById('restartbtn').addEventListener('click', function(){
		document.getElementsByClassName('finish')[0].style.display = "none";
		resetGame();     
	}, false);
	
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

function setHomeScreenBubbles(){
	var evilImg = loadImg('img/evilbubble.png');
	var goodImg = loadImg('img/goodbubble.png');
	var pointImg = loadImg('img/pointbubble.png');
	
	var r = 40;
	var xEvil = 0;
	var yEvil = 0;
	var xGood = app.canvasWidth;
	var yGood = app.canvasHeight;
	var xPoint = 0;
	var yPoint= app.canvasHeight/2;
	
	function _draw(){
		app.ctx.drawImage(evilImg, xEvil, yEvil, 2*r, 2*r);
		app.ctx.drawImage(goodImg, xGood, yGood, 2*r, 2*r);
		app.ctx.drawImage(pointImg, xPoint, yPoint, r, r);
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
			app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
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
