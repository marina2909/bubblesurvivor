function Entity(){
	this._w = 0;
	this._h = 0;
	this._r = 0;
	this._x = 0;
	this._y = 0;
	
	this.getX = function(){
		return this._x;
	};
	
	this.getY = function(){
		return this._y;
	};
	
	this.getR = function(){
		return this._r;
	};
	
	this.getW = function(){
		return this._w;
	}
	
	this.getH = function(){
		return this._h;
	}
	
	this.setR = function(r){
		this._r = r; 
	}
	
	this.setX = function(x){
		this._x = x; 
	}
	
	this.setY = function(y){
		this._y = y; 
	}
	
}
Entity.prototype.update = function(dt){
}

Entity.prototype.draw = function(dt){
}

