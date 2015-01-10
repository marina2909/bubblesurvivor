function Entities(){ 
	var bubbles = [];
	var bullets = [];
	var player = Player();
	var bulletTime =  -500;
	var air;
	
	player.setOnShoot(function(x, y){
		if ((app.t - bulletTime) > 500){
			bullets.push(new Bullet(app.bulletSpeed, x, y));
			bulletTime = app.t;
		}
	});
	
	function getRandomInt(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	};
	
	
	var bubble;
	var isBubblePushed = true;
	function update(){
		player.update();
		air = 0;
		
		if (isBubblePushed){  // generate bubble
			bubble = generateBubble();
			isBubblePushed = false;
		}
		
		var isCollision = false;
		bubbles.forEach(function(b){
			if (collides(b, bubble)){
				isCollision = true;
				return;
			}
		});	
		
		if (!isCollision){
			bubbles.push(bubble);
			isBubblePushed = true;
		}
		
		// check collisions between player and bubbles and bullets
		handleBubbleCollision();
		
		// filter bubbles
		bubbles = bubbles.filter(function(bubble){
			return bubble.status != 'dead';
		});	
		
		// update bullets
		bullets.forEach(function(bullet){
			bullet.update();
		});

		// filter bullets
		bullets = bullets.filter(function(bullet){
			return bullet.isActive();
		});
	
		app.air += air;
	}
	
	function generateBubble(){
		var sum = 0;
		for (var i=0; i<app.bubbleTypes.length; i++){
			sum += app.bubbleProbabilities[i];
			if (Math.random() < sum){
				var bubbleType =  app.bubbleTypes[i];
				var b;
				if (bubbleType == 'good'){
					b = new GoodBubble();
				} else if (bubbleType == 'evil'){
					b = new EvilBubble();
				} else if (bubbleType == 'point'){
					b = new PointBubble();
				} else if (bubbleType == 'deadevil'){
					b = new DeadEvilBubble();
				}
				return b;
			}
		}
	}
	
	function draw(){
		bubbles.forEach(function(bubble){
			bubble.draw();
		});

		bullets.forEach(function(bullet){
			bullet.draw();
		});
		
		player.draw();	
	}
	
	function handleBubbleCollision(){
		bubbles.forEach(function(bubble){
			bubble.update();
			if (bubble.status == 'active' && collides(player, bubble)){
				if (bubble instanceof PointBubble)
					app.points += 1;
				else if (bubble instanceof DeadEvilBubble)
					app.air = 0; // end the game
				else
					air += bubble.air;
				bubble.startDissapearnig();
			}
			bullets.forEach(function(bullet){
				if (bubble.status == 'active' && collides(bullet, bubble)){
					bubble.explode();
				}
			});
		});
	}
	
	function collides(a, b){
		return (Math.pow(a.getX() - b.getX(), 2) + Math.pow(a.getY() - b.getY(), 2)) 
		 < Math.pow(a.getR() + b.getR(), 2); 
	}
	
	return {
		update: update,
		draw: draw,
		getAir: function(){
			return air;
		}
	}

}

