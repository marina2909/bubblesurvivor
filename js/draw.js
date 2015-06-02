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
	
		app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
		/*app.canvas.style.backgroundPosition = -(totalTime*app.backgroundImgSpeed) + "px";*/
		
		
		/*var style = window.getComputedStyle(app.canvas);
		var x = parseInt(style.getPropertyValue('background-position-x')) - 1;
		app.canvas.style.backgroundPosition = "" + x + "px";*/
		
		/*if (ptrn == undefined){
			ptrn = app.ctx.createPattern(background, 'repeat'); 
		}
		
		app.ctx.rect(0, 0, app.canvasWidth, app.canvasHeight);
		app.ctx.fillStyle = ptrn;
		app.ctx.fill();	*/
		app.ctx.drawImage(background,0,0);
     

		_drawEntities();
		energy.draw();

		app.ctx.fillText(gameState.points, 0.05*app.canvasWidth, 0.97*app.canvasHeight);
	}
}();