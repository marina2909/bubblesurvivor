function soundicon(){
	var _imgOn = loadImg("img/soundon.png"); 
	var _imgOff = loadImg("img/soundoff.png");
	var _img = _imgOn;
	var _actionOnClick = function(){};
	var _canvasX = app.canvasWidth - 45;
	var _canvasY = app.canvasHeight - 45;
	var _r = 13;	
	
	function _isClicked(e){
		var mouseCanvasX= e.pageX - app.canvasMain.offsetLeft;
		var mouseCanvasY = e.pageY - app.canvasMain.offsetTop;
		return (_canvasX -_r <  mouseCanvasX)  &&  (mouseCanvasX < _canvasX +_r) &&  (_canvasY -_r <  mouseCanvasY) && (mouseCanvasY < _canvasY +_r);
	}
	
	document.body.onclick= function(e) { 
		if (!gameState.gameStart &&  _isClicked(e)){
			_actionOnClick();
		}
	}
	
	var _draw = function(){
		app.ctxMain.drawImage(_img, _canvasX -_r, _canvasY -_r);
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