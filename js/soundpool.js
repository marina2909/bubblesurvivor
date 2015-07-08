function SoundPool(poolSize, audioUrl, volumePercentage, repeat){
	var _size = poolSize; 
	var _pool = [];
	var _currentSound = -1;
	var _volumePercentage = volumePercentage;
	var _defaultAudio = new Audio(audioUrl);
	
	function _init(){
		_defaultAudio.load();
		
		for(var i=0; i<_size; i++){
			_pool[i] = _defaultAudio.cloneNode();
			if (repeat){
				_pool[i] .addEventListener('ended', function() {
					this.currentTime = 0;
					this.play();
				}, false);
			}
		}
	}
	_init();
	
	function _update(){
		for(var i=0; i<_size; i++){
			_pool[i].volume = _volumePercentage * app.volume;
		}
	}

	function _play(){
		_currentSound = (_currentSound + 1) % _size;
		if(_pool[_currentSound].currentTime == 0 || _pool[_currentSound].ended){
			_pool[_currentSound].volume = _volumePercentage * app.volume;
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
		stop: _stop,
		update: _update
	}
	
}