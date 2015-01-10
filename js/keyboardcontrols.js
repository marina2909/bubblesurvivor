function handleInputs(){
	app.keysDown = {};
	
	addEventListener('keydown', function(e){
		app.keysDown[e.keyCode] = true;
	});
	
	addEventListener('keyup', function(e){
		app.keysDown[e.keyCode] = false;
	});

}