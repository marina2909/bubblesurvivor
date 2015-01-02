function Bubble(timeToLive){
	
	this._r = _getRandomInt(20, 40);
	this._x = _getRandomInt(30, app.canvasWidth + app.canvasWidth/2);
	this._y = _getRandomInt(30, app.canvasHeight - this._r);
	this._timeToLive = timeToLive;
	this.status = "active";	
	this._font = 20;
	this._animationDuration = 300;
	this.air = _getRandomInt(1, 10);
	this._color;

	function _getRandomInt(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	};
	
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
	this._timeToLive--;
	this._x = this._x - 2;
	if (this._timeToLive <= 0){
		this.status = 'dead';
	} else if (this.status == 'dissapearing'){
		var dT = performance.now() - this.startTime;
		if (dT > this._timeToLive){
			this.status = 'dead';
		} else {
			this._r = this._r - this._r / this._animationDuration * dT;
			if (this._r < 0) this._r = 0;
			this._font = this._font - this._font / this._animationDuration * dT;
		}
	}
}	
Bubble.prototype.draw = function(){
	app.ctx.beginPath();
	app.ctx.fillStyle = this._color;
	app.ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);
	app.ctx.closePath();
	app.ctx.fill();

	app.ctx.font = this._font+"px Verdana";
	app.ctx.fillStyle = "black";
	app.ctx.textAlign = 'center'
	app.ctx.fillText(this.air, this._x, this._y);
}

function GoodBubble(timeToLive){
	Bubble.call(this, timeToLive);
	this._color = "#98AFC7";
}
GoodBubble.prototype = Object.create(Bubble.prototype);
GoodBubble.prototype.constructor = GoodBubble;


function EvilBubble(timeToLive){
	Bubble.call(this, timeToLive);
	this.air = -this.air;
	this._color = "red";
}
EvilBubble.prototype = Object.create(Bubble.prototype);
EvilBubble.prototype.constructor = EvilBubble;
EvilBubble.prototype.explode = function(){
	this._color = '#680000';
	this.startDissapearnig();
}