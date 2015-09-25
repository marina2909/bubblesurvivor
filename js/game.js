/* 'use strict'; */

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
	entities = new Entities();
	
	requestAnimationFrame(loop);
}


function load(){  

	// create canvas
	app.canvas  = document.getElementById("mainCanvas");
	app.canvas.width = app.canvasWidth;
	app.canvas.height = app.canvasHeight;
	app.ctx = app.canvas.getContext('2d');
	app.ctx.font="bold 25px Arial";
	app.ctx.fillStyle = "white";
	
	
	keysDown = new keysDown();
	sounds = new Sounds();
	
	// make sure you start the game after all images are loaded
	images = gameImages();
	images.load(function(){
		app.canvas.style.display='block';
		document.getElementsByClassName("start")[0].style.display='block';
		setHomeScreenBubblePlay();
		/* sounds.introSound.play(); */
	});
	
	energy = energy();
	
	var soundSlider = slider();
	soundIcon = soundicon();
	soundIcon.setActionOnClick(function(){
		soundSlider.show(soundIcon.getCanvasX()  + app.canvas.offsetLeft, soundIcon.getCanvasY() + app.canvas.offsetTop);
	});
	

	document.getElementById('startbtn').addEventListener('click', function(){
		document.getElementsByClassName('start')[0].style.display = "none";
		gameState.gameStart = true;
		resetGame(); 		
	}, false);
	
	document.getElementById('restartbtn').addEventListener('click', function(){
		document.getElementsByClassName('finish')[0].style.display = "none";
		resetGame();    
	}, false);
	
	document.getElementsByClassName('rulesLink')[0].addEventListener('click', function(){
		document.getElementsByClassName('rules')[0].style.display = "block";
	}, false);
	
	document.getElementById('closeRulesBtn').addEventListener('click', function(){
		document.getElementsByClassName('rules')[0].style.display = "none";
	}, false);
	
	document.addEventListener('click', function(e){
		if (!soundSlider.isClicked(e) && !soundIcon.isClicked(e)){
			soundSlider.hide();
		}
	});
	
	document.getElementsByClassName('start')[0].style.display = "block";
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
	var evilImg = images.evilbubbles[0];
	var goodImg =  images.goodbubbles[0]
	var pointImg =  images.imgs['pointbubble'];
	
	var r = 40;
	var xEvil = 0;
	var yEvil = 0;
	var xGood = app.canvasWidth;
	var yGood = app.canvasHeight;
	var xPoint = 0;
	var yPoint= app.canvasHeight/2;
	
	function _draw(time){
		drawBcg(time);
		app.ctx.drawImage(evilImg, xEvil, yEvil, 2*r, 2*r);
		app.ctx.drawImage(goodImg, xGood, yGood, 2*r, 2*r);
		app.ctx.drawImage(pointImg, xPoint, yPoint, r, r);
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
			app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
			var dt = time - lastFrameTime;
		
			_calculateCoordinates(dt);
			_draw(time);
			
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

var drawBcg = (function(){
	var background = loadImg("img/bcg.png");
	var backgroundWidth = app.canvasWidth - app.energyWidth;
	return function(totalTime){
		var x = (Math.round(totalTime*app.backgroundImgSpeed)) % backgroundWidth;
		app.ctx.drawImage(background, app.energyWidth - x, 0);
		app.ctx.drawImage(background, app.canvasWidth - x, 0);
	}
})();

