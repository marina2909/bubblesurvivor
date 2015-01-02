var app = {};
app.canvasWidth = 600;
app.canvasHeight = 600;
app.air = 10;
app.bullets = [];
app.count = 0;

$(document).ready(function(){
	var canvas  = document.createElement('canvas');
	canvas.width = app.canvasWidth;
	canvas.height = app.canvasHeight;
	canvas.style.border = '1px solid';
	document.body.appendChild(canvas);
	app.ctx = canvas.getContext('2d');
	
	var player = Player();
	var entities = Entities();
	entities.setOnUpdate(function(){
		airElem.html(app.air);
	});

	var airElem = $('.points');
	
	setInterval(function(){
		update();
		render();
	}, 30);
	
	
	function update(){
		app.count++;
		if (app.count%30 == 0) app.air--;
		
		player.update();
		entities.update(player);
	}
	
	function render(){
		app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
		player.draw();	
		entities.draw();	
		var canvas = $('canvas');
		canvas.css('background-position-x', parseInt(canvas.css('background-position-x')) - 1);
	}

});