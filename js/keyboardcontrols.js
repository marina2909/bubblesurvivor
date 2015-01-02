$(document).ready(function(){
	keysDown = {};
	
	addEventListener('keydown', function(e){
		keysDown[e.keyCode] = true;
	});
	
	addEventListener('keyup', function(e){
		keysDown[e.keyCode] = false;
	});

});