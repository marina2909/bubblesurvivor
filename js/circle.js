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
	this.setY = function(y){
		this._y = y; 
	}
	
	this.getR = function(){
		return this._r; 
	}
	this.getX = function(){
		return this._x; 
	}
	this.getY = function(){
		return this._y; 
	}
}
