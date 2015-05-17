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
			if (Math.pow(_newBubble.x - b.x, 2) + Math.pow(_newBubble.y - b.y, 2) < 
				Math.pow(distance + b.getRCollision() + _newBubble.getRCollision(), 2))
			{
				isCollision = true;
				return;
			}
		}, this);

		entities.blackHoles.forEach(function(b){
			if (Math.pow(_newBubble.x - b.x, 2) + Math.pow(_newBubble.y - b.y, 2) < 
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
			return bubble.isInside();
		});	

		entities.blackHoles = entities.blackHoles.filter(function(bubble){
			return  bubble.isInside();
		});	
		
		entities.bullets = entities.bullets.filter(function(bullet){
			return bullet.isInside();
		});

		entities.explosions = entities.explosions.filter(function(explosion){
			return explosion.isInside();
		});
		
	}
	
	
	var _shootBullet = function(){
		var _bulletLastFire = 0; 
		return function(){		
			// make sure distance between 2 bullets is bigger then bullet distance
			var timestamp = performance.now();
			if (timestamp - _bulletLastFire > app.bulletsDistance){
				entities.bullets.push(
					new Bullet(entities.player.x + entities.player.w/2 + app.bulletRadius, entities.player.y));
				_bulletLastFire = timestamp;
				sounds.shootSound.play();
			}
		}
	}();

	
	return function(dt, keysDown){
	
		// change the level and speed
		gameState.bubbleSpeed += app.bubbleSpeedStep;
		app.level = Math.floor((performance.now() - gameState.startTime)/app.levelChangeStep);
		
		if (entities.player != null){
			entities.player.updatePosition(dt, entities, keysDown);
		}
		
		entities.blackHoles.forEach(function(blackHole){
			blackHole.updatePosition(dt, entities);
		});
		
		entities.bubbles.forEach(function(bubble){
			bubble.updatePosition(dt, entities);
		});
		
		entities.bullets.forEach(function(bullet){
			bullet.updatePosition(dt, entities);
		});	
		
		entities.explosions = entities.explosions.filter(function(explosion){
			return explosion.updatePosition(dt, entities);
		});		
		
		
		entities.bubbles = entities.bubbles.map(function(bubble){
			var b = bubble;
			entities.bullets.forEach(function(bullet){
				if (!(bubble instanceof PointBubble) && bubble.collides(bullet)){
					entities.explosions.push(new BubbleVanish(bubble.x, bubble.y, bubble.r, 'explode'));
					sounds.explosionSound.play();
					b = null;
				}
			});
			return b;
		}).filter(function(bubble){
			return bubble != null;
		});
		
		
		entities.bubbles = entities.bubbles.map(function(bubble){
			var b = bubble;
			if (bubble.collides(entities.player)){
				b = null;
				var type = 'good';
				if (bubble instanceof GoodBubble){
					sounds.bubbleSound.play();
					gameState.energy += bubble.getEnergy() * 1000;
				} else if (bubble instanceof EvilBubble){
					sounds.bubbleSound.play();
					gameState.energy -= bubble.getEnergy() * 1000;
					type = 'evil';
				} else if (bubble instanceof PointBubble){
					sounds.pointSound.play();
					gameState.points += bubble.getPoints();
					type = 'point';
					entities.explosions.push(new PointVanish(bubble.x, bubble.y, bubble.r, bubble.getPoints()));
				}
				entities.explosions.push(new BubbleVanish(bubble.x, bubble.y, bubble.r, type));
				gameState.energy = (gameState.energy > app.maxEnergy) ? app.maxEnergy : gameState.energy; 
				
				if (gameState.energy <= 0){
					entities.explosions.push(new PlayerVanish(entities.player.x, entities.player.y, 
					entities.player.w, entities.player.h));
					entities.player = null;
					sounds.dyingSound.play();
				}
				energy.makeSound();
			}	
			return b;
		}).filter(function(bubble){
			return bubble != null;
		});

		
		entities.bullets.filter(function(bullet){
			return bullet.collides(entities.player);
		}).forEach(function(bullet){
			entities.explosions.push(new BulletVanish(bullet.x, bullet.y, app.bulletExplosionRadius));
			gameState.energy -= 1000;
			sounds.bulletexplosionSound.play();
		});
		
		
		entities.blackHoles.forEach(function(blackHole){
			
			entities.bullets = entities.bullets.filter(function(bullet){
				return !blackHole.collides(bullet);
			});
				
			if (blackHole.collides(entities.player)){
				entities.explosions.push(new PlayerVanish(entities.player.x, entities.player.y, 
					entities.player.w, entities.player.h, blackHole));
				entities.player = null;
				sounds.blackholeSound.play();
				gameState.energy = 0;
			}		
		});
		
		if (keysDown['space']) _shootBullet();

		_addNewBubble();
		
		_filter();	
	}
})();       
