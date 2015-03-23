function Player(){
	Entity.call(this);
	var h = 42;
	var w = 75;
	this._h = h;
	this._w = w;
	this.circles = [new Circle(w/2, w/2, h/2),
					new Circle(h/4, w/6, h*8/27),
					new Circle(h/4, w/6, h*19/27), 
					new Circle(h*11/40, w*10/25, h*1/2),
					new Circle(h/4, w*13/25, h*1/2),
					new Circle(h/4, w*16/25, h*1/2), 
					new Circle(h/11, w*20/25, h*1/2), 
					new Circle(h/14, w*22/25, h*1/2), 
					new Circle(h/20, w*47/50, h*1/2)
					];   
	app.keysDown = {};
	var keys = {
		37: 'left',
		39: 'right',
		38: 'up',
		40: 'down',
		32: 'space'
	}	
	handleInput();
	
	function handleInput(){	
		addEventListener('keydown', function(e){
			app.keysDown[keys[e.keyCode]] = true;
		});

		addEventListener('keyup', function(e){
			app.keysDown[keys[e.keyCode]] = false;
		});
	}
	
	this._playerSpeed = 0.3;
	this.gravVX = 0;
	this.gravVY = 0;
}

Player.prototype = Object.create(Entity.prototype);  
Player.prototype.constructor = Player;
Player.prototype.update = function(dt){
	
	// move player based on keyboard
	var playerStep = this._playerSpeed*dt;
	if (app.keysDown['left']){
		this._x-= playerStep;
	}
	if (app.keysDown['right']){
		this._x+= playerStep;
	}
	if (app.keysDown['up']){
		this._y-= playerStep;
	}
	if (app.keysDown['down']){
		this._y+= playerStep;
	}
	if (app.keysDown['space']) this.shoot(this._x, this._y);
	
	// move player because of the gravitational force 
	this._x += this.gravVX*dt;
	this._y += this.gravVY*dt;
	

	// make sure player stays inside borders
	if (this._x < 0) this._x = 0;
	if (this._x + this._w > app.canvasWidth) this._x = app.canvasWidth - this._w;

	if (this._y < 0) this._y = 0;
	if (this._y + this._h> app.canvasHeight) this._y = app.canvasHeight - this._h;
}

Player.prototype.draw = function(){
	
	var img = new Image();
	img.src = 'img/player.png';
	app.ctx.drawImage(img, this._x, this._y, this._w, this._h);
	/*for(var i in this.circles)
	{
		var c = this.circles[i];
		app.ctx.strokeStyle = 'white';
		app.ctx.arc(c.getX() + this._x, c.getY() + this._y, c.getR(), 0, 2*Math.PI);
	}
	app.ctx.stroke();*/
    
}