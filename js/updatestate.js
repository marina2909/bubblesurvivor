var updateState = (function(){

	var _newBubble;

	function _generateBubble(){
		var sum = 0;
		var rand = Math.random();
		var prev = 0;
		for (var i=0; i<app.bubbleTypes.length; i++){
			sum += app.bubbleProbabilities[i];
			if (rand >=prev && rand <= sum){
				var bubbleType = app.bubbleTypes[i];
				if (bubbleType == 'good'){
					return new GoodBubble();
				} else if (bubbleType == 'evil'){
					return new EvilBubble();
				} else if (bubbleType == 'point'){
					return new PointBubble();
				} 
			}
			prev = sum;
		}
	};
	
	function _isCollision(){
		var isCollision = false;
		entities.bubbles.forEach(function(b){
			var distance = app.bubbleDistance;
			if(_newBubble instanceof BlackHole){
				distance = app.distanceFromBlackHole;
			} 
			if (Math.pow(_newBubble.getX() - b.getX(), 2) + Math.pow(_newBubble.getY() - b.getY(), 2) < 
				Math.pow(distance + b.getRCollision() + _newBubble.getRCollision(), 2))
			{
				isCollision = true;
				return;
			}
		}, this);

		entities.blackHoles.forEach(function(b){
			if (Math.pow(_newBubble.getX() - b.getX(), 2) + Math.pow(_newBubble.getY() - b.getY(), 2) < 
				Math.pow(app.distanceFromBlackHole + b.getRCollision() + _newBubble.getRCollision(), 2))
			{
				isCollision = true;
				return;
			}
		}, this);			
		return isCollision;
	}

	function _addNewBubble(){

		if (_newBubble == null){  
			if (gameState.totalBubbles % app.blackHoleOccurency != 0){
				_newBubble = _generateBubble();
			} else {
				_newBubble = new BlackHole();
			}
		}
		
		if (!_isCollision()){
			if (_newBubble instanceof BlackHole){
				entities.blackHoles.push(_newBubble);
			} else {
				entities.bubbles.push(_newBubble);
			}
			gameState.totalBubbles++;
			_newBubble = null;
		}
	};
	
	function _filter(){
		entities.bubbles = entities.bubbles.filter(function(bubble){
			return bubble._status != 'dead' && bubble.isInside();
		});	

		entities.blackHoles = entities.blackHoles.filter(function(bubble){
			return bubble.getStatus() != 'dead' && bubble.isInside();
		});	
		
		entities.bullets = entities.bullets.filter(function(bullet){
			return bullet.isInside();
		});

		entities.explosions = entities.explosions.filter(function(explosion){
			return explosion.isInside() && explosion.getStatus() != 'dead';
		});	
		
	}
	
	
	var _shootBullet = function(){
		var _bulletLastFire = 0; 
		return function(){		
			// make sure distance between 2 bullets is bigger then bullet distance
			var timestamp = performance.now();
			if (timestamp - _bulletLastFire > app.bulletsDistance){
				entities.bullets.push(
					new Bullet(entities.player.getX() + entities.player.getW()/2 + app.bulletRadius, entities.player.getY()));
				_bulletLastFire = timestamp;
				sounds.shootSound.play();
			}
		}
	}();

	
	return function(dt, keysDown){
	
		// change the level and speed
		gameState.bubbleSpeed += app.bubbleSpeedStep;
		app.level = Math.floor((performance.now() - gameState.startTime)/app.levelChangeStep);
		
		entities.player.updatePosition(dt, entities, keysDown);

		entities.blackHoles.forEach(function(blackHole){
			blackHole.updatePosition(dt, entities);
		});
		
		entities.bubbles.forEach(function(bubble){
			bubble.updatePosition(dt, entities);
		});
		
		entities.bullets.forEach(function(bullet){
			bullet.updatePosition(dt, entities);
		});	
		
		entities.explosions.forEach(function(explosion){
			explosion.updatePosition(dt, entities);
		});		
		
		
		entities.bubbles.filter(function(bubble){
			return bubble.getStatus() == 'active';
		}).forEach(function(bubble){
			entities.bullets.forEach(function(bullet){
				if (!(bubble instanceof PointBubble) && bubble.collides(bullet)){
					bubble.setStatus('dead');
					entities.explosions.push(new BubbleExplosion(bubble.getX(), bubble.getY(), bubble.getR()));
					sounds.explosionSound.play();
				}
			});
			if (bubble.collides(entities.player)){
				bubble.implode();
				if (bubble instanceof GoodBubble){
					sounds.bubbleSound.play();
					gameState.energy += bubble.getAir() * 1000;
				} else if (bubble instanceof EvilBubble){
					sounds.bubbleSound.play();
					gameState.energy -= bubble.getAir() * 1000;
				} else if (bubble instanceof PointBubble){
					sounds.pointSound.play();
					gameState.points += bubble.getPoints();
				}
			
				gameState.energy = (gameState.energy > app.maxEnergy) ? app.maxEnergy : gameState.energy; 
				
				if (gameState.energy <= 0){
					sounds.dyingSound.play();
					entities.player.startDissapearnig();
				}
				energy.makeSound();
			}			
		});	
		
		entities.bullets.filter(function(bullet){
			return bullet.collides(entities.player);
		}).forEach(function(bullet){
			entities.explosions.push(new BulletExplosion(bullet.getX(), bullet.getY(), app.bulletExplosionRadius));
			gameState.energy -= 1000;
			sounds.bulletexplosionSound.play();
		});
		
		
		entities.blackHoles.forEach(function(blackHole){
			
			
			entities.bullets = entities.bullets.filter(function(bullet){
				return !blackHole.collides(bullet);
			});
				
			if (blackHole.collides(entities.player) && (entities.player.getStatus() == 'active')){
				entities.player.startDissapearnig(blackHole);
				sounds.blackholeSound.play();
				gameState.energy = 0;
			}		
		});
		
		if (keysDown['space']) _shootBullet();

		_addNewBubble();
		
		_filter();	
	}
})();       
