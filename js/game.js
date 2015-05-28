'use strict';

var animationDuration = {
	bulletExplosion: 250,
	bubbleExplosion: 700,
	bubble: 300,
	blackHole: 1000
}

var gameState = {
	gameState: app.maxEnergy, 
	points: 0,
	bubbleSpeed: app.bubbleStartSpeed,
	startTime: performance.now(),
	totalBubbles: 0,
	gameOver: false
}

var sounds;
var energy;
var entities;
var keysDown;

var resetGame = function(){
	energy.reset();
	gameState.points = 0;
	gameState.bubbleSpeed = app.bubbleStartSpeed;
	gameState.startTime = performance.now();
	gameState.totalBubbles = 0;
	gameState.gameOver = false;
	
	requestAnimationFrame(loop);
	entities = new Entities();
}


function load(){  
	
	app.canvas = document.getElementById("mainCanvas");
	app.canvas.width = app.canvasWidth;
	app.canvas.height = app.canvasHeight;
	app.ctx = app.canvas.getContext('2d');
	app.ctx.fillStyle = "white";
	app.ctx.font = "bold 25px Arial";
	
	keysDown = new KeysDown();
		
	document.getElementById('startbtn').addEventListener('click', function(){
		document.getElementsByClassName('start')[0].style.display = "none";
		resetGame(); 		
	}, false);
	
	document.getElementById('restartbtn').addEventListener('click', function(){
		document.getElementsByClassName('finish')[0].style.display = "none";
		resetGame();     
	}, false);
	
	
	document.getElementById('startbtn').focus();
	
	sounds = new Sounds();
	energy = new Energy();
}

var loop = function() {
	var lastFrameTime = performance.now();
	return function(time){
		var dt = time - lastFrameTime;
		energy.add(-dt);
		
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


function finishGame(){
	document.getElementsByClassName('finish')[0].style.display = "block";
	document.getElementsByClassName('totalPoints')[0].innerHTML = "Total points: " + gameState.points;
	document.getElementById('restartbtn').focus();
}

function getRandomInt(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
};
