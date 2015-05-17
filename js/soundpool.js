function SoundPool(poolSize, audioUrl, volume){
	var _size = poolSize; 
	var _pool = [];
	var _currentSound = -1;
	var _defaultAudio = new Audio(audioUrl);
	
	function _init(){
		_defaultAudio.volume = volume;
		_defaultAudio.load();
		for(var i=0; i<_size; i++){
			_pool[i] = _defaultAudio.cloneNode();
		}
	}
	_init();

	function _play(){
		_currentSound = (_currentSound + 1) % _size;
		if(app.soundOn && (_pool[_currentSound].currentTime == 0 || _pool[_currentSound].ended)){
			_pool[_currentSound].play();
		}
	}
	
	function _stop(){
		if (_currentSound >= 0 && !_pool[_currentSound].ended){
			_pool[_currentSound].pause();
			_pool[_currentSound].currentTime = 0;
			_pool[_currentSound].ended = true;			
		}
	}
	
	return {
		play: _play,
		stop: _stop
	}
	
}