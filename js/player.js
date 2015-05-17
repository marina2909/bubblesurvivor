function Player(){
	Entity.call(this);
	var h = 41;
	var w = 100;
	this._h = h;
	this._w = w;
	this._x = this._w / 2;
	this._y = this._h / 2;
	this.circles = [new Circle(w/2, w/2 - w/2, h/2 - h/2),
					new Circle(h/4, w*9/27 - w/2, h*7/27 - h/2),
					new Circle(h/4, w*9/27 - w/2, h*19/27 - h/2), 
					new Circle(h*12/40, w*12/25 - w/2, h*1/2- h/2),
					new Circle(h/4, w*3/5 - w/2, h*1/2 - h/2),
					new Circle(h/4, w*18/25 - w/2, h*1/2 - h/2), 
					new Circle(h/11, w*21/25 - w/2, h*1/2 - h/2), 
					new Circle(h/14, w*23/25 - w/2, h*1/2 - h/2), 
					new Circle(h/20, w*48/50 - w/2, h*1/2 - h/2)
					];
	this.sprite = new Sprite(loadImg('img/player.png'), this._w, this._h, this._w, this._h, 15, 'vertical', [0, 1, 2, 3]);
}

Player.prototype = Object.create(Entity.prototype);  
Player.prototype.constructor = Player;
Player.prototype.collides = function(a){
	if (a instanceof  Bullet || a instanceof  Bubble){
		var c0 = this.circles[0];
		// return false if there is no collision between circumscribed circle
		if (!((Math.pow(c0.x + this.x - a.x, 2) 
		 + Math.pow(c0.y + this.y - a.y, 2)) < 
		 Math.pow(c0.r + a.getRCollision(), 2))){
			return false;
		}
		for (var i=1; i<this.circles.length; i++){
			var c = this.circles[i];
			if ((Math.pow(c.x + this.x - a.x, 2) 
			 + Math.pow(c.y + this.y - a.y, 2)) < 
			 Math.pow(c.r + a.getRCollision(), 2))
				return true;
		}
	}
	return false;
};

Player.prototype.updatePosition = function(dt, entities, keysDown){

	var vx = 0;
	var vy = 0;
	
	if (keysDown['left']){
		vx = -app.playerSpeed;
	}
	if (keysDown['right']){
		vx = app.playerSpeed;
	}
	if (keysDown['up']){
		vy = -app.playerSpeed;
	}
	if (keysDown['down']){
		vy = app.playerSpeed;
	}
	
	var newPos = this.getNewPosition(this._x, this._y, vx, vy, dt, 55);
	this._x = newPos.x;
	this._y = newPos.y;
	
	
	// make sure player stays inside borders
	if (this._x - this._w/2 < app.energyWidth) this._x = this._w/2 + app.energyWidth;
	if (this._x + this._w/2 > app.canvasWidth) this._x = app.canvasWidth - this._w/2;

	if (this._y - this._h/2 < 0) this._y = this._h/2;
	if (this._y + this._h/2 > app.canvasHeight) this._y = app.canvasHeight - this._h/2;

	this.sprite.update(dt, this._x - this._w/2, this._y - this._h/2, this._w, this._h);
}

Player.prototype.draw = function(){
	this.sprite.draw();
	/*for(i in this.circles){
		var c = this.circles[i];
		console.log(c.r);
		app.ctx.beginPath();
		app.ctx.arc(this._x+c.x, this._y+c.y, c.r, 0, 2 * Math.PI);
		app.ctx.lineWidth = 1;
		app.ctx.strokeStyle = "white";
		app.ctx.stroke();
		app.ctx.closePath();
	}*/
}

Object.defineProperty(Player.prototype, 'w', {
	get : function(){
		return this._w;
	},
});

Object.defineProperty(Player.prototype, 'h', {
	get : function(){
		return this._h;
	},
});