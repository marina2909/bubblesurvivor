var updateState = (function(){

	var _newBubble;

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
		gameState.bubbleSpeed += app.bubbleAccStep*dt;
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
		
		
		// collision between bubbles and bullets
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
		
		
		// collision between bubbles and player
		entities.bubbles = entities.bubbles.map(function(bubble){
			var b = bubble;
			if (bubble.collides(entities.player)){
				b = null;
				var type = 'good';
				if (bubble instanceof PointBubble){
					sounds.pointSound.play();
					gameState.points += bubble.getPoints();
					type = 'point';
					entities.explosions.push(new PointVanish(bubble.x, bubble.y, bubble.r, bubble.getPoints()));
				} else {
					sounds.bubbleSound.play();
					energy.add(bubble.getEnergy() );
					if (bubble instanceof EvilBubble){
						type = 'evil';
					}
				}
				entities.explosions.push(new BubbleVanish(bubble.x, bubble.y, bubble.r, type));
				
				if (energy.isEmpty()){
					entities.explosions.push(new PlayerVanish(entities.player.x, entities.player.y, 
					entities.player.w, entities.player.h));
					entities.player = null;
					sounds.dyingSound.play();
				}
			}	
			return b;
		}).filter(function(bubble){
			return bubble != null;
		});

		
		// reduce energy if there is collision with player
		entities.bullets.filter(function(bullet){
			return bullet.collides(entities.player);
		}).forEach(function(bullet){
			entities.explosions.push(new BulletVanish(bullet.x, bullet.y, app.bulletExplosionRadius));
			energy.add(-1000);
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
				energy.set(0);
			}		
		});
		
		if (keysDown['space']) _shootBullet();

		addNewBubble();
		
		_filter();	
	}
})();       
