function Entities(){
	var that = this;
	this._bubbles = [];
	this._bullets = [];
	this._player = new Player();
	this._bubbleCOunt = 0;
	
	this._player.shoot = function(x, y){
		// make sure distance between 2 bullets is 100
		if ((app.t - app.bulletTime) > 100){
			that._bullets.push(
			new Bullet(that._player.getX() + that._player.getW(), 
					that._player.getY() + that._player.getH()/2));
			app.bulletTime = app.t;
		}
	};
	
	this._setGravitation = function(obj, blackHole, gravConst, dt){
		var dX = blackHole.getX()-(obj.getX()+obj.getW()/2);
		var dY = blackHole.getY()-(obj.getY()+obj.getH()/2);
		var d = Math.sqrt(dX*dX+dY*dY);
		var phiX = Math.acos(dX/d);
		var phiY = Math.asin(dY/d);
		obj.gravVX = d*Math.cos(phiX)*gravConst/(d*d)*dt;
		obj.gravVY = d*Math.sin(phiY)*gravConst/(d*d)*dt;	
	}
	
	this.updatePositions = function(dt){
		
		// update player
		this._player.update(dt);
		
		// do update on all _bullets
		this._bullets.forEach(function(bullet){
			bullet.update(dt);
		});	
		
		// do update on bubbles
		this._bubbles.forEach(function(bubble){
			bubble.update(dt);
		});	
	};
	
	
	this.collides = function(a, b){
		if ((a instanceof Bubble || a instanceof Bullet) && (b instanceof Bubble || b instanceof Bullet))
			return (Math.pow(a.getX() - b.getX(), 2) + Math.pow(a.getY() - b.getY(), 2)) < Math.pow(a.getR() + b.getR(), 2); 
		else if (a instanceof Player && (b instanceof Bubble)){
			var p = a;
			var c0 = a.circles[0];
			// return false if there is no collision between circumscribed circle
			if (!((Math.pow(c0.getX() + p.getX() - b.getX(), 2) 
			 + Math.pow(c0.getY() + p.getY() - b.getY(), 2)) < 
			 Math.pow(c0.getR() + b.getR(), 2))){
				return false;
			}
			for (var i=1; i<a.circles.length; i++){
				var c = a.circles[i];
				if ((Math.pow(c.getX() + p.getX() - b.getX(), 2) 
				 + Math.pow(c.getY() + p.getY() - b.getY(), 2)) < 
				 Math.pow(c.getR() + b.getR(), 2))
					return true;
			}
			return false;
		}
	};
	this.generateBubble = function(){
		var sum = 0;
		var b;
		var rand = Math.random();
		var prev = 0;
		var sum = 0;
		for (var i=0; i<app.bubbleTypes.length; i++){
			sum+=app.bubbleProbabilities[i];
			if (rand >=prev && rand <= sum){
				var bubbleType = app.bubbleTypes[i];
				if (bubbleType == 'good'){
					return new GoodBubble();
				} else if (bubbleType == 'evil'){
					return new EvilBubble();
				} else if (bubbleType == 'point'){
					return new PointBubble();
				} /*else if (bubbleType == 'deadevil'){
					return new BlackHole();
				}*/
			}
			prev = sum;
		}
	};
	
	
	
	this.draw = function(){
		this._player.draw();
		
		// do draw on all bubbles
		this._bubbles.forEach(function(bubble){
			bubble.draw();
		});
		
		// do draw on all bullets
		this._bullets.forEach(function(bullet){
			bullet.draw();
		});
	}
	
	this.addNewBubble = function(){
	
		var bubble;
		
		// generate bubble if isBubbleAdded is false(ready for new), set 
		// isBubbleAdded to false
		if (!app.isBubbleAdded){  
			if (this._bubbleCOunt % 25 != 0){
				bubble = this.generateBubble();
			} else {
				bubble = new BlackHole();
			}	
			app.isBubbleAdded = false;
		}
		

		//check if it collides with any entity close to it
		bubble._r = bubble._r * app.bubbleDistance; 
		var isCollision = false;
		this._bubbles.forEach(function(b){
			if (this.collides(b, bubble)){
				isCollision = true;
				return;
			}
		}, this);	
		bubble._r = bubble._r / app.bubbleDistance;
		
		if (!isCollision){
			this._bubbles.push(bubble);
			this._bubbleCOunt++;
			app.isBubbleAdded = false;
		}
	};
	
	
	
	this.filter = function(){
		// filter bubbles
		this._bubbles = this._bubbles.filter(function(bubble){
			return bubble._status != 'dead' && bubble.isInside();
		});	

		// filter bullets
		this._bullets = this._bullets.filter(function(bullet){
			return bullet.isInside();
		});	
	}
	
		
	this.handleBlackHole = function(dt){
		var that = this;
		that._player.gravVX = 0;
		that._player.gravVY = 0;
		
		this._bubbles.forEach(function(bubble){	
			if (bubble instanceof BlackHole){
			
				var blackHole = bubble;
				blackHole.setR(blackHole.getR() * blackHole.getField()); 
				
				// handle gravitation between player and black hole
				if(that.collides(that._player, blackHole)){
					that._setGravitation(that._player, blackHole, 0.3, dt);
				}
				
				// handle gravitation between _bullets and black hole
				that._bullets.forEach(function(bullet){
					if(that.collides(bullet, blackHole)){
						that._setGravitation(bullet, blackHole, 1, dt);
					}
				});
				
				blackHole.setR(blackHole.getR() / blackHole.getField());
			}
			
		});	
	};
	
	this.handleBubbleCollision = function(dt){
		var that = this;
		this._bubbles.forEach(function(bubble){
			bubble.update(dt);
			if (bubble._status == 'active' && that.collides(that._player, bubble)){
				if (bubble instanceof PointBubble){
					app.points += 1;
				}
				else if (bubble instanceof BlackHole){
					app.remainTime = 0; 
				}
				else if (bubble instanceof GoodBubble){
					app.remainTime += bubble.air;
				} else if (bubble instanceof EvilBubble){
					app.remainTime -= bubble.air;
				}
				bubble.startDissapearnig();
			}
			that._bullets.forEach(function(bullet){
				if (bubble._status == 'active' && that.collides(bullet, bubble)){
					if (bubble instanceof BlackHole){
						bullet.setR(0);
						bullet.setX(2*app.canvasWidth);
						bullet.setY(2*app.canvasHeight);
					} else {
						bubble.explode();
					}
				}
			});
		});
	}
	
}