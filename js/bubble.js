function Bubble(){
	Entity.call(this);
	this._x = 5/4 * app.canvasWidth;
	this._y = this.generateStartYPosition();
}
Bubble.prototype = Object.create(Entity.prototype);
Bubble.prototype.constructor = Bubble;
Bubble.prototype.generateStartYPosition = function(){

		var _nextY = 0;
		var _currentY = 0;	
		var bubblePositions = [Math.round(app.canvasHeight/9), Math.round(2*app.canvasHeight/9), Math.round(3*app.canvasHeight/9), Math.round(4*app.canvasHeight/9), Math.round(5*app.canvasHeight/9), Math.round(6*app.canvasHeight/9), Math.round(7*app.canvasHeight/9), Math.round(8*app.canvasHeight/9)];

		
		return function(){
			if (!app.isBubbleAdded){
				_currentY = _nextY;
			}
			if(_currentY == 0){
				var r = getRandomInt(0, 1); 
				var y = bubblePositions[r];
				_nextY = 2;	
			} else if (_currentY == 1){
				var r = getRandomInt(2, 3);
				var y = bubblePositions[r];
				_nextY = 3;
			} else if (_currentY == 2){
				var r = getRandomInt(4, 5);
				var y = bubblePositions[r];
				_nextY = 1;
			} else if (_currentY == 3){
				var r = getRandomInt(6, 7);
				var y = bubblePositions[r];
				_nextY = 0;
			}
			return y;
		}
}();

Bubble.prototype.getEnergy = function(){
	return this._energy;
}

Bubble.prototype.collides = function(a){
	if (a instanceof  Bullet || a instanceof  Bubble){
		return (Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2)) < Math.pow(this.getRCollision() + a.getRCollision(), 2);
	}
	if (a instanceof Player){
		return a.collides(this);
	}
};
Bubble.prototype.updatePosition = function(dt, entities){
	var newPos = this.getNewPosition(this._x, this._y, -gameState.bubbleSpeed, 0, dt, 0);
	this._x = newPos.x;
}
Bubble.prototype.draw = function(){
	app.ctx.save();
	app.ctx.globalAlpha = this._opacity ;
	app.ctx.drawImage(this.sprite(), this._x - this._r, this._y - this._r);
	app.ctx.restore();
}

function EvilBubble(){
	Bubble.call(this);
	this._idx = Math.floor(Math.random() * 4);
	this._energy = this.energyArr[this._idx];
	this._r =  this.rArr[this._idx];
	this._energy*=1000;
}
EvilBubble.prototype = Object.create(Bubble.prototype);
EvilBubble.prototype.constructor = EvilBubble;
EvilBubble.prototype.rArr = [20, 27, 34, 41];
EvilBubble.prototype.energyArr = [-4, -8, -12, -16];
EvilBubble.prototype.sprite = function(){
	return images.evilbubbles[this._idx];
}

function GoodBubble(){
	Bubble.call(this);
	this._idx = Math.floor(Math.random() * 4);
	this._energy = this.energyArr[this._idx];
	this._r =  this.rArr[this._idx];
	this._energy*=1000;
}
GoodBubble.prototype = Object.create(Bubble.prototype);
GoodBubble.prototype.constructor = GoodBubble;
GoodBubble.prototype.rArr = [20, 27, 34, 41];
GoodBubble.prototype.energyArr = [4, 8, 12, 16];
GoodBubble.prototype.sprite = function(){
	return images.goodbubbles[this._idx];
}

function PointBubble(){
	Bubble.call(this);
	this._r = 10;
	this._rLight = 32; // radius of the light around point bubble
	this._angle = 0;
	this._speed = -0.001 + Math.random() * 0.002;
	this._rLightStart = this._rLight;
	this._rLightEnd = 0.9 * this._rLight;
	this._pointNumber = this._generatePoints();
	this._points = this._pointNumber + 2;
	this.getPoints = function(){
		return this._points;
	}
}
PointBubble.prototype = Object.create(Bubble.prototype);
PointBubble.prototype.constructor = PointBubble;
PointBubble.prototype.sprite = function(){
	return images.imgs['pointbubble'];
}
PointBubble.prototype._generatePoints = function(){
	var prob = [];
	if (app.level == 0){
		prob = [1, 0, 0];
	}else if (app.level == 1){
		prob = [0.7, 0.3, 0]; 
	} else if (app.level == 2){
		prob = [0.2, 0.4, 0.4];
	} else if (app.level == 3){
		prob = [0, 0.5, 0.5];
	} else if (app.level == 4){
		prob = [0, 0.3, 0.7];
	} else{
		prob = [0, 0.2, 0.8];
	}
	
	var sum = 0;
	var rand = Math.random();
	var prev = 0;
	for (var i=0; i<prob.length; i++){
		sum += prob[i];
		if (rand >=prev && rand <= sum){
			return i + 1;
		}
		prev = sum;
	}
 }
PointBubble.prototype.updatePosition = function(dt, entities){
	Bubble.prototype.updatePosition.apply(this, arguments);
	this._fAnimation = Math.sin(0.005 * (performance.now()));
	this._rLight = this._rLightStart + (this._rLightEnd - this._rLightStart) * this._fAnimation;
	this._angle += this._speed * dt;
}

PointBubble.prototype.draw = function(){
	app.ctx.save();
	app.ctx.translate(this._x, this._y);
	app.ctx.rotate(this._angle);
	app.ctx.drawImage(this.sprite(), - this._r, - this._r, 2 * this._r, 2 * this._r);
	app.ctx.drawImage(images.imgs['light'+(this._pointNumber)], - this._rLight, - this._rLight, 2 * this._rLight, 2 * this._rLight);
	app.ctx.restore();

}
PointBubble.prototype.getRCollision = function(){
	return this._rLight;
}

function BlackHole(){
	Bubble.call(this);
	this._energy = getRandomInt(app.evilAirMin, app.evilAirMax);
	this._r = 220;
	this._rSmallCircle = 20;
	this._angle = 0;
	this._spinSpeed = -0.0025 + Math.random() * 0.005;

}
BlackHole.prototype = Object.create(Bubble.prototype);
BlackHole.prototype.constructor = BlackHole;
BlackHole.prototype.sprite = function(){
	return images.imgs['blackhole'];
}


BlackHole.prototype.updatePosition = function(dt, entities){
	Bubble.prototype.updatePosition.apply(this, arguments);
	this._angle += this._spinSpeed * dt;
}
BlackHole.prototype.draw = function(){
	app.ctx.save();
	app.ctx.translate(this._x, this._y);
	app.ctx.rotate(this._angle);
	app.ctx.drawImage(this.sprite(), - this._r, - this._r, 2 * this._r, 2 * this._r);
	app.ctx.restore();
}
BlackHole.prototype.getRCollision = function(){
	return 6;
}
BlackHole.prototype.collides_super = BlackHole.prototype.collides;
BlackHole.prototype.collides = function(a){
	if (a instanceof  Bullet){
		return (Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2)) < Math.pow(this._rSmallCircle + a.getRCollision(), 2);
	} else {
		return this.collides_super(a);
	}
};




