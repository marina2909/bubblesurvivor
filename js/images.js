function gameImages(){
	var _imgs = {};
	var _evilbubbles = {};
	var _goodbubbles = {};
	var _callback;
	var keys = ['player', 'light1', 'light2', 'light3',  'pointbubble', 'blackhole'];
	var numberImages = keys.length;
	
	 function _loadImg(source) {
		var img = new Image();
		img.src = source;	
		img.onload = function(){
			numberImages--;
			if(numberImages<=0){
				_callback();
			}
		}
		return img;
	}

	
	_load = function(callback){
		_callback = callback;
		var k ="img/";
		for (var i in keys){
			_imgs[keys[i]]= _loadImg(k+keys[i]+".png");
		}
		var evil = "img/evilbubble";
		for (var i = 0; i<4; i++){
			_evilbubbles[i] = _loadImg(evil + i + ".png");
		}
		var good = "img/goodbubble";
		for (var i = 0; i<4; i++){
			_goodbubbles[i] = _loadImg(good + i + ".png");
		}
	}
	
	
	return {
		load: _load,
		imgs: _imgs,
		evilbubbles: _evilbubbles,
		goodbubbles: _goodbubbles,
	}
	
}