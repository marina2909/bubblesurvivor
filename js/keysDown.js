function KeysDown(){	
	var kDown = {};
	var keys = {
		37: 'left',
		39: 'right',
		38: 'up',
		40: 'down',
		32: 'space'
	};
	
	addEventListener('keydown', function(e){
		kDown[keys[e.keyCode]] = true;
	});

	addEventListener('keyup', function(e){
		kDown[keys[e.keyCode]] = false;
	});
	
	return {	
		getKeys : function(){
			return kDown;
		}
	}
};
