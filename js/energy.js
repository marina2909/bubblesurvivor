function energy(){	
	var _energyColor= loadImg('img/energyColor.png');
	var _energyBlank = loadImg('img/energyBlank.png');
	var _value;
	var _y;
	
	var _add = function(val){
		_value += val;
		 _value = (_value > app.maxEnergy) ? app.maxEnergy : _value; 
	}
	
	var _update = function(dt){
		_add(dt);
		_y = app.canvasHeight * (1 - _value/app.maxEnergy);
		_y = Math.round(_y / 10) * 10;
	}
	
	var _draw = function(){
		app.ctx.drawImage(_energyBlank, 0, 0, app.energyWidth, _y, 0, 0, app.energyWidth, _y); // draw blank image
		app.ctx.drawImage(_energyColor, 0, _y, app.energyWidth, app.canvasHeight - _y, 0, _y, app.energyWidth, app.canvasHeight - _y); // draw color image
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
		update: _update,
		draw : _draw,
		add: _add,
		reset: _reset,
		set: _set,
		isEmpty:_isEmpty
	}
}