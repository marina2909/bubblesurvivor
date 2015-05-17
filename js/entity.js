function Entity(){
	this._w = 0;
	this._h = 0;
	this._r = 0;
	this._x = 0;
	this._y = 0;
	
	this.setR = function(r){
		this._r = r; 
	}
	
	this.setX = function(x){
		this._x = x; 
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

Entity.prototype.getRCollision = function(){
	return this._r;
}

Object.defineProperty(Entity.prototype, 'x', {
	get : function(){
		return this._x;
	}
});


Object.defineProperty(Entity.prototype, 'y', {
	get : function(){
		return this._y;
	},
});

Object.defineProperty(Entity.prototype, 'r', {
	get : function(){
		return this._r;
	},
});



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
			var diffX = blackHole.x - x1;
			var diffY = blackHole.y - y1;
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


	
