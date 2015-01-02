function Player() {
	var step = 10;
	var r = 20;
	var x = 30;
	var y = 30;
	var width = 28;
	var height = 24;
	
	function handleInput(){
		var left = keysDown[37];
		var right = keysDown[39];
		var up = keysDown[38];
		var down = keysDown[40];
		var space = keysDown[32];
			
		x += left ? (-step) : (right ? step : 0 );
		y += up ? (-step) : (down ? step : 0 );
		if (space) shoot();
	}
	
	function update(){			
		handleInput();
		
		if (x - r < 0) x = r;
		if (x + r > app.canvasWidth) x = app.canvasWidth - r;
		if (y - r < 0) y = r;
		if (y + r > app.canvasHeight) y = app.canvasHeight - r;
	}

	function draw(){ 
		app.ctx.beginPath();
		app.ctx.fillStyle = "black";
		app.ctx.arc(x, y, r, 0, 2 * Math.PI);
		app.ctx.closePath();
		app.ctx.fill();	
	}
	
	function shoot(){
		if (app.count%2 == 0){
			app.bullets.push(new Bullet(5, x + r/2, y));
		}
	}
	
	return {
		update: update,
		draw: draw,
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