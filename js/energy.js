function energy(){	
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
	var _value = app.maxEnergy;
	
	
	var _draw = function(){
		var sprite = _energyGreen;
		var currentEnergy = _value / 1000;

		var y = app.canvasHeight - _tileHeight;
		for (var i = 0; i<currentEnergy; i+=_stepEnergy){ 
			sprite = (i > 20) ? _energyGreen : _energyRed;
			app.ctx.drawImage(sprite, 0, y, _tileWidtht, _tileHeight);
			y -= _verticalStep;
		}
		
		for (var i = currentEnergy; i<_maxEnergy; i+=_stepEnergy){ 
			app.ctx.drawImage(_energyBlank, 0, y, _tileWidtht, _tileHeight);
			y -= _verticalStep;
		}
		
		
		app.ctx.drawImage(_separator, 20, 0, 5, app.canvasHeight);
	}
	
	var _add = function(val){
		_value += val;
		 _value = (_value > app.maxEnergy) ? app.maxEnergy : _value; 
	}
	
	var _reset = function(){
		_value = app.maxEnergy;
	}
	
	var _set = function(val){
		_value = val;
	}
	
	var _isEmpty = function(){
		return _value <= 0;
	}
	
	return {
		draw : _draw,
		add: _add,
		reset: _reset,
		set: _set,
		isEmpty:_isEmpty
	}
}