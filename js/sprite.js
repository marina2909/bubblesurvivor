function Sprite(img, sw, sh, w, h, speed, dir, frames){
	this._img = img;
	this.speed = speed;
	this.dir = dir;
	this.frames = frames;
	this.framesLength = frames ? this.frames.length : 0;
	this._sw = sw;
	this._sh = sh;
	this._w = w;
	this._h = h;
	this._index = 0;
	this._x = 0;
	this._y = 0;
	this._sx = 0;
	this._sy = 0;
	
	this.setSx = function(sx){
		this._sx = sx;
	}
	
	this.setSy = function(sy){
		this._sy = sy;
	}

	Sprite.prototype.update = function(dt, x, y, w, h){
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
		this._index += this.speed * dt;
	}
	
	Sprite.prototype.draw = function(){
		var idx = Math.floor(this._index);
		var frame = this.frames[idx % this.framesLength];

		if (dir == 'horizontal'){
			this._sx = frame * this._sw;
		} else {
			this._sy = frame * this._sh;
		}
		app.ctx.drawImage(this._img, this._sx, this._sy, this._sw, this._sh, this._x, this._y, this._w, this._h);
	
		
		/* 						
		context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		sx	Optional. The x coordinate where to start clipping	Play it »
		sy	Optional. The y coordinate where to start clipping	Play it »
		swidth	Optional. The width of the clipped image	Play it »
		sheight	Optional. The height of the clipped image	Play it »
		x	The x coordinate where to place the image on the canvas	Play it »
		y	The y coordinate where to place the image on the canvas	Play it »
		width	Optional. The width of the image to use (stretch or reduce the image)
		height	Optional. The height of the image to use (stretch or reduce the image) 
		*/
		
	}
}