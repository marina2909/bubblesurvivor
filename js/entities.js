function Entities(){ 
	var timeToLiveGood = 200; 
	var timeToLiveEvil = 200;

	var goodbubbles = [];
	var evilbubbles = [];
	var onUpdate = function(){};
	var airElem = $('.points');
	var air;
	
	function update(player){
		
		air = 0;
		
		// add some bubbles, make sure they don't collide
		addBubble('good', timeToLiveGood, player);
		addBubble('evil', timeToLiveEvil, player);
		
		// update time to live
		goodbubbles.forEach(function(bubble){
			bubble.update();
			if (bubble.status == 'active' && collides(player, bubble)){
				air += bubble.air;
				bubble.startDissapearnig();
			}
		});
		
		// filter active goodbubbles
		goodbubbles = goodbubbles.filter(function(bubble){
			return bubble.status != 'dead';;
		});
		
		// check collisions between player and bubbles
		evilbubbles.forEach(function(bubble){
			bubble.update();
			if (bubble.status == 'active' && collides(player, bubble)){
				air += bubble.air;
				bubble.startDissapearnig();
			}
			app.bullets.forEach(function(bullet){
				if (bubble.status == 'active' && collides(bullet, bubble)){
					bubble.explode();
				}
			});
		});
		
		// filter active evil bubbles
		evilbubbles = evilbubbles.filter(function(bubble){
			return bubble.status != 'dead';
		});			
		
		// bullets
		app.bullets.forEach(function(bullet){
			bullet.update();
		});

		app.bullets = app.bullets.filter(function(bullet){
			return bullet.isActive();
		});
	
		app.air += air;
		onUpdate();
	}
	
	function draw(){
		goodbubbles.forEach(function(bubble){
			bubble.draw();
		});
		
		evilbubbles.forEach(function(bubble){
			bubble.draw();
		});
		
		app.bullets.forEach(function(bullet){
			bullet.draw();
		});
	}
	
	
	function addBubble(type, timeToLive, player){
		if (Math.random() < 0.1){
			
			var bubble;
			if (type == 'good'){
				bubble = new GoodBubble(timeToLive);
			} else if (type == 'evil'){
				bubble = new EvilBubble(timeToLive);
			}
			
			var col = false;
			goodbubbles.forEach(function(b){
				if (collides(b, bubble)){
					col = true;
					return;
				}
			});
			
			evilbubbles.forEach(function(b){
				if (collides(b, bubble)){
					col = true;
					return;
				}
			});
			
			if (!col && !collides(bubble, player)){
				if (type == 'good'){
					goodbubbles.push(bubble);
				} else if (type == 'evil'){
					evilbubbles.push(bubble);
				}
			}	
		}
	}
	
	function collides(a, b){
		return (Math.pow(a.getX() - b.getX(), 2) + Math.pow(a.getY() - b.getY(), 2)) 
		 < Math.pow(a.getR() + b.getR(), 2); 
	}
	
	return {
		update: update,
		draw: draw,
		setOnUpdate: function(handler){
			onUpdate = handler;
		},
		getAir: function(){
			return air;
		}
	}

}

