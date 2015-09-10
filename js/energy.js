function energy(){	
	var _energyColor = images.imgs['energyColor']; 
	var _energyBlank = images.imgs['energyBlank']; 
	var _value;
	var _y;
	
	var _add = function(val){
		_value += val;
		 _value = (_value > app.maxEnergy) ? app.maxEnergy : _value; 
	}
	
	var _update = function(dt){
		_add(dt);
		_y = app.canvasHeight * (1 - _value/app.maxEnergy);
		_y = Math.min(Math.round(_y / 10) * 10, 519);
	}
	
	var _draw = function(){
		app.ctx.drawImage(_energyBlank, 0, 0, app.energyWidth, _y); // draw blank image
		if (_y <519)
			app.ctx.drawImage(_energyColor,   0, _y, app.energyWidth, app.canvasHeight - _y, 0, _y, app.energyWidth, app.canvasHeight - _y); // draw color image
	}

		/* 						
		context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		sx	Optional. The x coordinate where to start clipping	Play it »
		sy	Optional. The y coordinate where to start clipping	Play it »
		swidth	Optional. The width of the clipped image	Play it »
		sheight	Optional. The height of the clipped image	Play it »
		x	The x coordinate where to place the image on the canvas	Play it »
		y	The y coordinate where to place the image on the canvas	Play it »
		width	Optional. The width of the image to use (stretch or reduce the image)
		height	Optional. The height of the image to use (stretch or reduce the image) 
		*/
	
	
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