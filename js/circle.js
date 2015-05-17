function Circle(r, x, y){
	Entity.call(this);
	this._r = r;
	this._x = x;
	this._y = y;
	
	this.setR = function(r){
		this._r = r; 
	}
	this.setX = function(x){
		this._x = x; 
	}
	this.getR = function(){
		return this._r; 
	}
}

Circle.prototype = Object.create(Entity.prototype);
Circle.prototype.constructor = Circle;