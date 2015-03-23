function Bubble(){
	Entity.call(this);
	var that = this;
	this._bubbleSpeed = 0.035; 
	this._font = 19;
	this._color = 'black';
	this._x = app.canvasWidth + app.canvasWidth/2;

	this._getRandomInt = function(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	};

	this._generateYPosition = function(){
		var bubblePositions = [app.canvasHeight/9, 2*app.canvasHeight/9, 3*app.canvasHeight/9, 4*app.canvasHeight/9, 5*app.canvasHeight/9, 6*app.canvasHeight/9, 7*app.canvasHeight/9, 8*app.canvasHeight/9];
		
		if (!app.isBubbleAdded){
			app.currentY = app.nextY;
		}
		if(app.currentY == 0){
			var r = that._getRandomInt(0, 1);
			var y = bubblePositions[r];
			app.nextY = 2;	
		} else if (app.currentY == 1){
			var r = that._getRandomInt(2, 3);
			var y = bubblePositions[r];
			app.nextY = 3;
		} else if (app.currentY == 2){
			var r = that._getRandomInt(4, 5);
			var y = bubblePositions[r];
			app.nextY = 1;
		} else if (app.currentY == 3){
			var r = that._getRandomInt(6, 7);
			var y = bubblePositions[r];
			app.nextY = 0;
		}
		return y;
	}
	this._y = this._generateYPosition();
	
	this.air = 0;
	this._status = 'active';	
	this.startDissapearnig = function(){
		this._startTime = performance.now();
		this._status = 'dissapearing';
	};
	this.isInside = function(){
		return (this._x + this._r) >= 0;
	}
	
}
Bubble.prototype = Object.create(Entity.prototype);
Bubble.prototype.constructor = Bubble;
Bubble.prototype.update = function(dt){
	Entity.prototype.update();
	this._x-= this._bubbleSpeed*dt;
	if (this._status == 'dissapearing'){
		var t = performance.now() - this._startTime;
		if (t > app.animationDuration){
			this._status = 'dead';
		} else {
			this._r -=  this._r / app.animationDuration * t;
			if (this._r < 0) this._r = 0;
			this._font -=  this._font / app.animationDuration * t;
			
			this._w -=  this._w / app.animationDuration * t;
			if (this._w < 0) this._w = 0;
			
			this._h -=  this._h / app.animationDuration * t;
			if (this._h < 0) this._h = 0;
		}
	}
}

Bubble.prototype.draw = function(){
	app.ctx.beginPath();
	app.ctx.fillStyle = this._color;
	app.ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);
	app.ctx.closePath();
	app.ctx.fill();
	
	app.ctx.font = this._font + "px Verdana";
	app.ctx.fillStyle = 'black';
	app.ctx.textAlign = 'center'
	app.ctx.textBaseline = 'middle';
	app.ctx.fillText(this.air ? this.air : '' , this._x, this._y);
}


function EvilBubble(){
	Bubble.call(this);
	var evilAirMin = 10;
	var evilAirMax = 20;
	this.air = this._getRandomInt(evilAirMin, evilAirMax);
	this._r =  20 + 20 * (this.air - 10) / (evilAirMax - evilAirMin);
	this._color = 'red';
}
EvilBubble.prototype = Object.create(Bubble.prototype);
EvilBubble.prototype.constructor = EvilBubble;
EvilBubble.prototype.explode = function(){
	this._color = '#FE642E';
	this.startDissapearnig();
}


function GoodBubble(){
	Bubble.call(this);
	var goodAirMin = 1;
	var goodAirMax = 10;
	this.air = this._getRandomInt(goodAirMin, goodAirMax);
	this._r = 20 + 20 * (this.air - 1) / (goodAirMax - goodAirMin); 
	this._color = '#5FB404';
}
GoodBubble.prototype = Object.create(Bubble.prototype);
GoodBubble.prototype.constructor = GoodBubble;
GoodBubble.prototype.explode = function(){
	this._color = '#D0FA58';
	this.startDissapearnig();
}

function BlackHole(){
	Bubble.call(this);
	this.air = this._getRandomInt(app.evilAirMin, app.evilAirMax);
	this._r = 25;
	this._w = 70;
	this._h = 70;
	this._field = 5;
	
	this.getField = function(){
		return this._field;
	}
}
BlackHole.prototype = Object.create(Bubble.prototype);
BlackHole.prototype.constructor = BlackHole;
BlackHole.prototype.explode = function(){
	this.startDissapearnig();
}
BlackHole.prototype.draw = function(){
	var img = new Image();
	img.src = 'img/blackhole.png';
	app.ctx.drawImage(img, this._x - this._w/2, this._y - this._h/2, this._w, this._h);
	app.ctx.beginPath();
	app.ctx.arc(this._x, this._y, this._field * this._r, 0, 2 * Math.PI);
	app.ctx.lineWidth = 0.4;
	app.ctx.fillStyle = "rgba(0, 0, 0, .08)"
	app.ctx.fill();
	app.ctx.closePath();
	
}

function PointBubble(){
	Bubble.call(this);
	this._r = 25;
	this._w = 50;
	this._h = 50;	
}
PointBubble.prototype = Object.create(Bubble.prototype);
PointBubble.prototype.constructor = PointBubble;
PointBubble.prototype.explode = function(){
	this.startDissapearnig();
}
PointBubble.prototype.draw = function(){
	var img = new Image();
	img.src = 'img/planet.png';
	app.ctx.drawImage(img, this._x - this._r, this._y - this._r, this._w, this._h);
}


