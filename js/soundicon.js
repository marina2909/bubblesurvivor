function soundicon(){
	var _imgOn = loadImg("img/soundon.png");
	var _imgOff = loadImg("img/soundoff.png");
	var _img = _imgOn;
	var x = app.canvasWidth - 45;
	var y = app.canvasHeight - 45;
	var r = 13;	
	
	document.body.onclick= function(e) { 
		var mouseX= e.pageX - app.canvasMain.offsetLeft;
		var mouseY = e.pageY - app.canvasMain.offsetTop;
		if ((x - r <  mouseX)  &&  (mouseX < x + r) &&  (y - r <  mouseY) && (mouseY < y + r) ){
			app.soundOn = !app.soundOn;
			_img = app.soundOn ? _imgOn : _imgOff;
		}
	}

	var _draw = function(){
		app.ctx.drawImage(_img, x - r, y - r);
	}	
	
	return {
		draw: _draw
	}
}