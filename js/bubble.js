function Bubble(){
	
	this._getRandomInt = function(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	};

	this._x = app.canvasWidth + app.canvasWidth/2;
	this.status = 'active';	
	this._font = 19;
	this._color;

	this.getX = function(){
		return this._x;
	};
	
	this.getY = function(){
		return this._y;
	};
	
	this.getR = function(){
		return this._r;
	};
			
	this.startDissapearnig = function(){
		this.startTime = performance.now();
		this.status = 'dissapearing';
	};
	
}

Bubble.prototype.update = function(){
	this._x -= app.bubbleSpeed;
	if (this.status == 'dissapearing'){
		var t = performance.now() - this.startTime;
		if (t > app.animationDuration){
			this.status = 'dead';
		} else {
			this._r -=  this._r / app.animationDuration * t;
			if (this._r < 0) this._r = 0;
			this._font -=  this._font / app.animationDuration * t;
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
	app.ctx.fillText(this.air ? this.air : 'G' , this._x, this._y);
	
}

function GoodBubble(){
	Bubble.call(this);
	this.air = this._getRandomInt(app.goodAirMin, app.goodAirMax);
	this._r = 20 + 20 * (this.air - 1) / (app.goodAirMax - app.goodAirMin); // (20, 40)
	this._y = this._getRandomInt(30, app.canvasHeight - this._r);
	this._color = '#98AFC7';
}
GoodBubble.prototype = Object.create(Bubble.prototype);
GoodBubble.prototype.constructor = GoodBubble;
GoodBubble.prototype.explode = function(){
	this._color = '#A9F5F2';
	this.startDissapearnig();
}


function EvilBubble(){
	Bubble.call(this);
	this.air = this._getRandomInt(app.evilAirMin, app.evilAirMax);
	this._r =  20 + 20 * (this.air - 10) / (app.evilAirMax - app.evilAirMin); //(20, 40);
	this._y = this._getRandomInt(30, app.canvasHeight - this._r);
	this.air = -this.air;
	this._color = 'red';
}
EvilBubble.prototype = Object.create(Bubble.prototype);
EvilBubble.prototype.constructor = EvilBubble;
EvilBubble.prototype.explode = function(){
	this._color = 'yellow';
	this.startDissapearnig();
}

function DeadEvilBubble(){
	Bubble.call(this);
	this.air = this._getRandomInt(app.evilAirMin, app.evilAirMax);
	this._r = 20;
	this._y = this._getRandomInt(30, app.canvasHeight - this._r);
	this._color = 'black';
}
DeadEvilBubble.prototype = Object.create(Bubble.prototype);
DeadEvilBubble.prototype.constructor = DeadEvilBubble;
DeadEvilBubble.prototype.explode = function(){
	this._color = 'pink';
	this.startDissapearnig();
}

function PointBubble(){
	Bubble.call(this);
	this._r = 20;
	this._y = this._getRandomInt(30, app.canvasHeight - this._r);
	this._color = 'green';
}
PointBubble.prototype = Object.create(Bubble.prototype);
PointBubble.prototype.constructor = PointBubble;
PointBubble.prototype.explode = function(){
	this.startDissapearnig();
}