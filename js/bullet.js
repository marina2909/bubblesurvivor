function Bullet(speed, x, y){
	this.r = 3;
	this.color = 'red';
	this.x = x;
	this.y = y;
	
	this.getX = function(){
		return this.x;
	};
	
	this.getY = function(){
		return this.y;
	};
	
	this.getR = function(){
		return this.r;
	};
	
	this.isActive = function(){
		return this.x > 0 && this.x < app.canvasWidth &&
			this.y > 0 && this.y < app.canvasHeight;
	}
	
	this.draw = function(){
		app.ctx.beginPath();
		app.ctx.fillStyle = this.color; 
		app.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		app.ctx.closePath();
		app.ctx.fill();
	}
	
	this.update = function(){
		this.x += speed;
	}
}