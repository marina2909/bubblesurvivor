function gameImages(){
	var _imgs = {};
	var _evilbubbles = {};
	var _goodbubbles = {};
	var _callbackCalled = false;
	var _callback;
	var keys = ['player', 'light1', 'light2', 'light3',  'pointbubble', 'blackhole' ,'soundon', 'soundoff', 'bullet', 'playervanish', 'playerExplode', 'bulletexplosion', 'soundon', 'soundoff', 'energyColor', 'energyBlank'];
	var numberImages = keys.length + 2*app.numberOfGoodEvilImages;
	
	 function _loadImg(source) {
		var img = new Image();
		img.src = source;	
		img.onload = function(){
			numberImages--;
			if(!_callbackCalled && numberImages<=0){
				_callbackCalled = true;
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
		var good = "img/goodbubble";
		for (var i = 0; i<app.numberOfGoodEvilImages; i++){
			_evilbubbles[i] = _loadImg(evil + i + ".png");
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