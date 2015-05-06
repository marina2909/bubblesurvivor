function Energy(){	
	var _energyGreen = loadImg('img/energyGreen.png');
	var _energyRed = loadImg('img/energyRed.png');
	var _energyBlank = loadImg('img/energyBlank.png');
	var _separator = loadImg('img/separator.png');
	var _tiles = 50;
	var _verticalStep = app.canvasHeight / _tiles;
	
	var _tileHeight = _verticalStep - 2;
	var _tileWidtht = app.energyWidth - 2;
	
	var _stepEnergy = app.maxEnergy / (1000 * _tiles);
	var _maxEnergy = app.maxEnergy / 1000;
	
	var _draw = function(){
		
		var sprite = _energyGreen;
		var currentEnergy = gameState.energy / 1000;

		var y = app.canvasHeight - _tileHeight;
		for (var i = 0; i<currentEnergy; i+=_stepEnergy){ 
			sprite = (i > 40) ? _energyGreen : _energyRed;
			app.ctx.drawImage(sprite, 0, y, _tileWidtht, _tileHeight);
			y -= _verticalStep;
		}
		
		for (var i = currentEnergy; i<_maxEnergy; i+=_stepEnergy){ 
			app.ctx.drawImage(_energyBlank, 0, y, _tileWidtht, _tileHeight);
			y -= _verticalStep;
		}
		
		app.ctx.drawImage(_separator, 20, 0, 5, app.canvasHeight);
	}
	
	var _makeSound = function(){
		if (gameState.energy > 0 && gameState.energy <= 40000){
			sounds.clockSound.play();
		} else if (gameState.gameOver || gameState.energy > 40000 || gameState.energy <= 0){
			sounds.clockSound.stop();
		}
	}
	
	return {
		draw : _draw,
		makeSound : _makeSound
	}
}