var draw = function(){
	
	var background = loadImg("img/bcg.png");
	var ptrn;

	function _drawEntities(){

		entities.bubbles.forEach(function(bubble){
			bubble.draw();
		});
		
		entities.blackHoles.forEach(function(blackHole){
			blackHole.draw();
		})
		
		entities.bullets.forEach(function(bullet){
			bullet.draw();
		});

		if (entities.player != null){
			entities.player.draw();
		}
		
		entities.explosions.forEach(function(explosion){
			explosion.draw();
		});
	
	}
	
	return function(totalTime){
	

		var x = (totalTime*app.backgroundImgSpeed )% 520;
		app.ctx.drawImage(background,- x,-5);
		app.ctx.drawImage(background, app.canvasWidth - x,-5);
     
		_drawEntities();
		energy.draw();

		app.ctx.fillText(gameState.points, 0.05*app.canvasWidth, 0.97*app.canvasHeight);
	}
}();