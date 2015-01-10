function Player() {
	var r = 10;
	var x = 40;
	var y = 40;
	var onShoot = function(){};
	
	function handleInput(){
		var left = app.keysDown[37];
		var right = app.keysDown[39];
		var up = app.keysDown[38];
		var down = app.keysDown[40];
		var space = app.keysDown[32];
			
		if (left)  x-= app.playerStep;
		if (right) x+= app.playerStep;
		if (up)    y-= app.playerStep;
		if (down)  y+= app.playerStep;
		if (space) onShoot(x + r, y);
	}
	
	function update(){			
		handleInput();
		
		// make sure player stays inside borders
		if (x - r < 0) x = r;
		if (x + r > app.canvasWidth) x = app.canvasWidth - r;
		if (y - r < 0) y = r;
		if (y + r > app.canvasHeight) y = app.canvasHeight - r;
	}

	function draw(){ 
		app.ctx.beginPath();
		app.ctx.rect(x - r, y - r, 2*r, 2*r);
		app.ctx.fillStyle = 'yellow';
		app.ctx.fill();
		app.ctx.lineWidth = 4;
		app.ctx.strokeStyle = 'black';
		app.ctx.stroke();
		
	}
	
	return {
		update: update,
		draw: draw,
		setOnShoot: function(handler){
			onShoot = handler;
		},
		getX : function(){
			return x;
		},
		getY : function(){
			return y;
		},
		getR: function(){
			return r;
		}
	}
}