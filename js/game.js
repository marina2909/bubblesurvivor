
var app = {
	canvasWidth: 580,
	canvasHeight: 580,
	animationDuration: 300,
	bubbleDistance: 2.5,
	/*bubbleTypes: ['good', 'evil', 'point', 'deadevil'],
	bubbleProbabilities: [0.3, 0.5, 0.15, 0.05],*/
	bubbleTypes: ['good', 'evil', 'point'],
	bubbleProbabilities: [0.1, 0.8, 0.1],
	remainTime: 100,
	points: 0,
	t0: performance.now(),
	t: 0,
	bulletTime: -500,
	frameRate: 20,
	isBubbleAdded: false,
	count: 0
};

app.nextY = 0;
app.currentY = 0;

var entities = new Entities();

function load(){
	
	//load canvas
	app.canvas = document.getElementById('canvas'); 
	app.ctx = app.canvas.getContext('2d');
	
	var infobar  = new InfoBar(app.remainTime, app.points);	

	var lastSecondTime = performance.now();
	var interval = setInterval(function(){	
		
		// counts time form beginning of game
		app.t = performance.now() - app.t0;	
		if (app.remainTime <= 0) clearInterval(interval);	
		if ((app.t - lastSecondTime) > 1000){ 
			app.remainTime--;
			lastSecondTime = app.t;
		}

		var dt = performance.now() - app.t;
		update(dt);
		draw();
	}, app.frameRate);

	function update(dt){
		app.count++;
		// limit bubble speed to 2.5 so it doesn't get too fast
		if (app.count%100 == 0 && app.bubbleSpeed < 2.5) {
			//app.bubbleSpeed += 0.01;
			
			/*if (app.bubbleProbabilities[0] > 0.1){
				app.bubbleProbabilities[0] -= 0.01;
				app.bubbleProbabilities[1] += 0.005;
				app.bubbleProbabilities[2] += 0.003;
				app.bubbleProbabilities[3] += 0.002;
			}*/
		}
		 
		
		

		entities.addNewBubble();

		entities.filter();
		
		// handle black hole gravitational field
		entities.handleBlackHole(dt);	
		
		entities.handleBubbleCollision(dt);
		
		entities.updatePositions(dt);
		
	}       
	
	function draw(){
		app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
		var style = window.getComputedStyle(app.canvas);
		var x = parseInt(style.getPropertyValue('background-position-x')) - 1;
		app.canvas.style.backgroundPosition = "" + x + "px";
		
		entities.draw();
	
		infobar.setPoints(app.points);
		infobar.setTime(app.remainTime);
	}
	
	                                                                       
}


