function Entity(){
	this._w = 0;
	this._h = 0;
	this._r = 0;
	this._x = 0;
	this._y = 0;
	this._status = 'active';
	
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
	
	this.setW = function(w){
		this._w = w; 
	}
	
	this.setH = function(h){
		this._h = h; 
	}
	
}
Entity.prototype.updatePosition = function(dt, entities){
}

Entity.prototype.draw = function(dt, entities){
}

Entity.prototype.collides = function(a){
	throw "entity.collides is not implemented";
}
Entity.prototype.isInside = function(){
	return (this._x + this._r) >= 0;
}

Entity.prototype.getStatus = function(){
	return this._status;
}
Entity.prototype.setStatus = function(status){
	return this._status = status;
}
Entity.prototype.getRCollision = function(){
	return this._r;
}

/*

	F	G    1     C    dv                      C                C
a =	- = - * --- = --- = --  ===> dv = a * dt = --- * dt => dd = --- * dt^2 
	m	m   d^2   d^2   dt                     d^2              d^2   

 dx     dd                  dd                dt^2
----- = ---	=> dx = diffx * --- = C * diffx * ----   
diffx	 d                  d                  d^3
	                                           
*/

Entity.prototype.getNewPosition = function(x1, y1, vx1, vy1, dt, gravConst){
	var gravvX = 0;
	var gravvY = 0;
	
	if (gravConst != 0){
		entities.blackHoles.forEach(function(blackHole){	
			var diffX = blackHole.getX() - x1;
			var diffY = blackHole.getY() - y1;
			var d = Math.sqrt(diffX*diffX + diffY*diffY);
			gravvX += gravConst * diffX * dt / Math.pow(d, 3);
			gravvY += gravConst * diffY * dt / Math.pow(d, 3);	
		});
	}
		
	var vx = vx1 + gravvX;
	var vy = vy1 + gravvY; 	
	var x2 = x1 + vx*dt;  
	var y2 = y1 + vy*dt;
	
	return {
		vx: vx,
		vy: vy,
		x: x2,
		y: y2
	}
}


	
