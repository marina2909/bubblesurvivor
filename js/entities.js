function Entities(){ 
	var goodbubbles = [];
	var evilbubbles = [];
	var pointbubbles = [];
	var onUpdate = function(){};
	var air;
	
	function update(player){
		
		air = 0;
		
		// add some bubbles, make sure they don't collide
		addBubble('good', player, app.probabilityGood);
		addBubble('evil', player, app.probabilityEvil);
		addBubble('point', player, app.probabilityPoint);
		
		//check collisions between player and good bubbles and player and bullets
		handleBubbleCollision(player, goodbubbles);
		
		// filter active good bubbles
		goodbubbles = goodbubbles.filter(function(bubble){
			return bubble.status != 'dead';;
		});
		
		// check collisions between player evil bubbles and bubbles and bullets
		handleBubbleCollision(player, evilbubbles);
		
		// filter active evil bubbles
		evilbubbles = evilbubbles.filter(function(bubble){
			return bubble.status != 'dead';
		});	


		// check collisions between player and points and bullets
		pointbubbles.forEach(function(bubble){
			bubble.update();
			if (bubble.status == 'active' && collides(player, bubble)){
				app.points += 1;
				bubble.startDissapearnig();
			}
			app.bullets.forEach(function(bullet){
				if (bubble.status == 'active' && collides(bullet, bubble)){
					bubble.explode();
				}
			});
		});
		
		// filter active point bubbles
		pointbubbles = pointbubbles.filter(function(bubble){
			return bubble.status != 'dead';
		});	

		
		// add bullets
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
		
		pointbubbles.forEach(function(bubble){
			bubble.draw();
		});
		
		app.bullets.forEach(function(bullet){
			bullet.draw();
		});
	}
	
	
	function addBubble(type, player, probability){
		if (Math.random() < probability){
			
			var bubble;
			if (type == 'good'){
				bubble = new GoodBubble();
			} else if (type == 'evil'){
				if (Math.random() < app.probabilityDead){
					bubble = new DeadEvilBubble();
				} else {
					bubble = new EvilBubble();
				}
			} else if (type == 'point'){
				bubble = new PointBubble();
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
			
			pointbubbles.forEach(function(b){
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
				} else if (type == 'point'){
					pointbubbles.push(bubble);
				}
			}	
		}
	}
	
	
	function handleBubbleCollision(player, bubbleArray){
		bubbleArray.forEach(function(bubble){
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

