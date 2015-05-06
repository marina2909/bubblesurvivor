function Explosion(x, y, r){
	Entity.call(this);
	this._x = x;
	this._y = y;
	this._r = r;
	this._startTime = performance.now();
	
	this._opacityStart = 1;
	this._opacityEnd = 0;
	
}
Explosion.prototype = Object.create(Entity.prototype);
Explosion.prototype.constructor = Explosion;
Explosion.prototype.updatePosition = function(dt, entities){
	var newPos = this.getNewPosition(this._x, this._y, -this.speed , 0, dt, 0);
	this._x = newPos.x;
	var t = (performance.now() - this._startTime) / this.animationDuration;
	if (t < 1){
		this._r = this._rStart + (this._rEnd - this._rStart) * Math.pow(t, 0.5); 
		this._opacity = this._opacityStart + (this._opacityEnd - this._opacityStart) * t; 
		if (this._r < 0) this._r = 0; 
	} else {
		this._status = 'dead';
	}
}
Explosion.prototype.draw = function(){
	app.ctx.save();
	app.ctx.globalAlpha = this._opacity ;
	app.ctx.drawImage(this.sprite, this._x - this._r, this._y - this._r, 2 * this._r, 2 * this._r);
	app.ctx.restore();
}

function BubbleExplosion(x, y, r){
	Explosion.call(this);
	this._x = x;
	this._y = y;
	this._r = r;
	this._rStart = 0.1 * r;
	this._rEnd = 2 * r;
	this._startTime = performance.now();
	this.animationDuration = animationDuration.bubbleExplosion;
	this.speed = gameState.bubbleSpeed;
}
BubbleExplosion.prototype = Object.create(Explosion.prototype);
BubbleExplosion.prototype.constructor = BubbleExplosion;
BubbleExplosion.prototype.sprite = loadImg('img/bubbleexplosion.png');

function BulletExplosion(x, y, r){
	Explosion.call(this);
	this._x = x;
	this._y = y;
	this._r = r;
	this._rStart = 0.1 * r;
	this._rEnd = 2 * r;
	this._startTime = performance.now();
	this.animationDuration = animationDuration.bulletExplosion;
	this.speed = app.bulletSpeed;
}
BulletExplosion.prototype = Object.create(Explosion.prototype);
BulletExplosion.prototype.constructor = BulletExplosion;
BulletExplosion.prototype.sprite = loadImg('img/bulletexplosion.png');

