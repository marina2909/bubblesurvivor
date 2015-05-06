function Bullet(x, y){
	Entity.call(this);
	this._vx = app.bulletSpeed;
	this._vy = 0;
	
	this._x = x;
	this._y = y;
	this._r = app.bulletRadius;

	
	this.isInside = function(){
		return this._x > 0 && this._x < app.canvasWidth &&
			this._y > 0 && this._y < app.canvasHeight;
	}	
}

Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.sprite = loadImg('img/bullet.png');
Bullet.prototype.updatePosition = function(dt, entities){
	var newPos = this.getNewPosition(this._x, this._y, this._vx, this._vy, dt, 10);
	this._vx = newPos.vx;
	this._vy = newPos.vy;
	this._x = newPos.x;
	this._y = newPos.y;
}

Bullet.prototype.collides = function(a){
	if (a instanceof Bubble){
		return a.collides(this); 
	} else if (a instanceof Player){
		return a.collides(this);
	}
}

Bullet.prototype.draw = function(){
	app.ctx.drawImage(this.sprite, this._x - this._r, this._y - this._r, 2 * this._r, 2 * this._r);
}

