var draw = function(){
	
	var background = loadImg("img/bcg.png");
	var backgroundWidth = app.canvasWidth - app.energyWidth;
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
		
		entities.vanishings.forEach(function(explosion){
			explosion.draw();
		});
		
	}
	
	return function(totalTime){
	
		var x = (totalTime*app.backgroundImgSpeed ) % backgroundWidth;
		app.ctx.drawImage(background, app.energyWidth - x, 0);
		app.ctx.drawImage(background, app.canvasWidth - x, 0);
     
		_drawEntities();
		energy.draw();
		
		app.ctx.fillText(gameState.points, app.pointsX, app.pointsY);

		app.ctxMain.drawImage(app.canvas,0,0); 
		
	}
}();