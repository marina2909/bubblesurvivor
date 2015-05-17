function Vanish(x, y, r){
	Entity.call(this);
	this._x = x;
	this._y = y;
	this._r = r;
	this._rStart = this._r;
	this._rEnd = 0;
	this._startTime = performance.now();
	this._opacityStart = 1;
	
}
Vanish.prototype = Object.create(Entity.prototype);
Vanish.prototype.constructor = Vanish;
Vanish.prototype.updatePosition = function(dt, entities){
	this._x = this.getNewPosition(this._x, this._y, -this._speed , 0, dt, 0).x;
	var t = (performance.now() - this._startTime) / this._animationDuration;
	if (t < 1){
		this._r = this._rStart + (this._rEnd - this._rStart) * this._fAnimation(t);
		this._opacity = 1 - t; 
		if (this._r < 0) this._r = 0; 
		return true;
	}
	return false;
}
Vanish.prototype.draw = function(){
	app.ctx.save();
	app.ctx.globalAlpha = this._opacity ;
	app.ctx.drawImage(this._sprite, this._x - this._r, this._y - this._r, 2 * this._r, 2 * this._r);
	app.ctx.restore();
}

function BubbleVanish(x, y, r, type){
	Vanish.call(this, x, y, r);
	this._speed = gameState.bubbleSpeed;
	if (type == 'explode'){
		this._sprite = this._spriteExplode;
		this._rStart = 1.1 * this._r;
		this._rEnd = 2 * this._r;
		this._animationDuration = animationDuration.bubbleExplosion;
		this._fAnimation = this._fAnimationExplode;
	} else if (type == 'good' || type == 'evil' || 'point'){
		this._sprite = type == 'good' ? this._spriteGoodBubble : 
					(type == 'evil' ? this._spriteEvilBubble : this._spritePointBubble); 
		this._animationDuration = animationDuration.bubble;
		if (type == 'point'){
			this._fAnimation = this._fAnimationPoint;
		} else {
			this._fAnimation = this._fAnimationGoodEvil;
		}
	}
}
BubbleVanish.prototype = Object.create(Vanish.prototype);
BubbleVanish.prototype.constructor = BubbleVanish;
BubbleVanish.prototype._spriteGoodBubble= loadImg('img/goodbubble.png');
BubbleVanish.prototype._spriteEvilBubble = loadImg('img/evilbubble.png');
BubbleVanish.prototype._spritePointBubble = loadImg('img/pointbubble.png');
BubbleVanish.prototype._spriteExplode = loadImg('img/bubbleExplosion.png');
BubbleVanish.prototype._fAnimationGoodEvil = function(t){
	return  3.3 * t * t - 2.3 * t;
}
BubbleVanish.prototype._fAnimationExplode = function(t){
	return Math.pow(t, 0.5);
}
BubbleVanish.prototype._fAnimationPoint = function(t){
	return  3.3 * t * t - 4 * t;
}

function BulletVanish(x, y, r){
	Vanish.call(this, x, y, r);
	this._rStart = 0.1 * r;
	this._rEnd = 1.5 * r;
	this._animationDuration = animationDuration.bulletExplosion;
	this._speed = app.bulletSpeed;
}
BulletVanish.prototype = Object.create(Vanish.prototype);
BulletVanish.prototype.constructor = BulletVanish;
BulletVanish.prototype._sprite = loadImg('img/bulletexplosion.png');
BulletVanish.prototype._fAnimation = function(t){
	return  Math.pow(t, 0.5);
}

function PointVanish(x, y, r, points){
	Vanish.call(this, x, y, r);
	this._points = points;
	this._animationDuration = animationDuration.bubbleExplosion;
	this._speed = gameState.bubbleSpeed;;
}
PointVanish.prototype = Object.create(Vanish.prototype);
PointVanish.prototype.constructor = PointVanish;
PointVanish.prototype._fAnimation = function(t){
	return  3.3 * t * t - 4 * t;
}

PointVanish.prototype.updatePosition = function(dt, entities){
	var newPos = this.getNewPosition(this._x, this._y, -this._speed , 0, dt, 0);
	this._x = newPos.x;
	var t = (performance.now() - this._startTime) / this._animationDuration;
	if (t < 1){
		this._opacity = 1 - t;
		return true;		
	} 
	return false;
}

PointVanish.prototype.draw = function(){
	app.ctx.save();
	app.ctx.globalAlpha = this._opacity ;
	app.ctx.font = "25px Georgia";
	app.ctx.fillStyle = "white";
	app.ctx.fillText('+' + this._points, this._x ,this._y);
	app.ctx.restore();
}



function PlayerVanish(x, y, w, h, blackHole){
	Vanish.call(this, x, y);
	this._wEnd = 0;
	this._hEnd = 0;
	this._xStart = x;
	this._yStart = y;
	if (blackHole != null) {
		this._sprite = this._playerVanishSprite;
		this._wStart = w;
		this._hStart = h;
		this._xEnd = blackHole.x;
		this._yEnd = blackHole.y;
	}
	else { 
		this._sprite = this._playerExplodeSprite;
		this._wStart = 100;
		this._hStart = 100;
		this._xEnd = this._xStart;
		this._yEnd = this._yStart;
	}
	gameState.bubbleSpeed = 0;
}
PlayerVanish.prototype = Object.create(Vanish.prototype);
PlayerVanish.prototype.constructor = PlayerVanish;
PlayerVanish.prototype._playerVanishSprite = loadImg('img/playervanish.png');
PlayerVanish.prototype._playerExplodeSprite = loadImg('img/playerExplode.png');
PlayerVanish.prototype.isInside = function(){
	return (this._x) >= 0;
}
PlayerVanish.prototype._fAnimation = function(t){
	return  Math.pow(t, 0.5);
}
PlayerVanish.prototype.updatePosition = function(dt, entities){
	var t = (performance.now() - this._startTime) / animationDuration.blackHole;
	if (t < 1){ 
		this._w = this._wStart + (this._wEnd - this._wStart) * this._fAnimation(t);
		this._h = this._hStart + (this._hEnd - this._hStart) * this._fAnimation(t); 

		this._x = this._xStart + (this._xEnd - this._xStart) * this._fAnimation(t);
		this._y = this._yStart + (this._yEnd - this._yStart) * this._fAnimation(t); 
		
		return true;
	} 
	gameState.gameOver = true;
	return false;
}

PlayerVanish.prototype.draw = function(){
	app.ctx.save();
	app.ctx.globalAlpha = this._opacity ;
	app.ctx.drawImage(this._sprite, this._x - this._w/2, this._y - this._h/2, this._w, this._h);
	app.ctx.restore();
}








