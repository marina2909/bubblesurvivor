var draw = function(){

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
	
		app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
		app.canvas.style.backgroundPosition = (totalTime*app.backgroundImgSpeed) + "px";

		_drawEntities();
		energy.draw();

		app.ctx.fillText(gameState.points, 0.05*app.canvasWidth, 0.97*app.canvasHeight);
	}
}();