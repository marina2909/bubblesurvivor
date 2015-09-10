function soundicon(){
	var _imgOn =  images.imgs['soundon']; 
	var _imgOff =  images.imgs['soundoff'];
	var _img = _imgOn;
	var _actionOnClick = function(){};
	var _canvasX = app.canvasWidth - 45;
	var _canvasY = app.canvasHeight - 45;
	var _r = 13;	
	
	function _isClicked(e){
		var mouseCanvasX= e.pageX - app.canvas.offsetLeft;
		var mouseCanvasY = e.pageY - app.canvas.offsetTop;
		return (_canvasX -_r <  mouseCanvasX)  &&  (mouseCanvasX < _canvasX +_r) &&  (_canvasY -_r <  mouseCanvasY) && (mouseCanvasY < _canvasY +_r);
	}
	
	document.body.onclick= function(e) { 
		if (!gameState.gameStart &&  _isClicked(e)){
			_actionOnClick();
		}
	}
	
	var _draw = function(){
		app.ctx.drawImage(_img, _canvasX -_r, _canvasY -_r);
	}	
	
	return {
		draw: _draw,
		setActionOnClick: function(handler){
			_actionOnClick = handler;
		},
		getCanvasX: function(){
			return _canvasX;
		},
		getCanvasY: function(){
			return _canvasY;
		},
		isClicked: _isClicked
	}
}