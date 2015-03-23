function Bullet(x, y){
	Entity.call(this);
	this._color = '#FF3300';
	this._x = x;
	this._y = y;
	this._r = 3;
	this._speed = 10;
	this.gravVX = 0;
	this.gravVY = 0;
	
	this.isInside = function(){
		return this._x > 0 && this._x < app.canvasWidth &&
			this._y > 0 && this._y < app.canvasHeight;
	}	
}

Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.update = function(dt){
	this._x += this._speed;
	
	// move bullet because of the gravitational force 
	this._x += this.gravVX*dt;
	this._y += this.gravVY*dt;
}
Bullet.prototype.draw = function(){
	app.ctx.beginPath();
	app.ctx.fillStyle = this._color; 
	app.ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI, false);
	app.ctx.closePath();
	app.ctx.fill();
	app.ctx.lineWidth = 1;
	app.ctx.strokeStyle = '#FFFF00';
	app.ctx.stroke();
}