var app = {
	canvasWidth: 580,
	canvasHeight: 580,
	animationDuration: 300,
	bubbleSpeed: 2,
	playerStep: 7,
	bulletSpeed: 20,
	
	probabilityGood: 0.05,
	probabilityEvil: 0.15,
	probabilityPoint: 0.03,
	probabilityDead: 0.03,
	bubbleTypes: ['good', 'evil', 'point', 'deadevil'],
	bubbleProbabilities: [0.2, 0.5, 0.1, 0.2],
	
	goodAirMin: 1,
	goodAirMax: 10,
	evilAirMin: 10,
	evilAirMax: 20,
	
	air: 20,
	points: 0,
	t0: performance.now(),
	t: 0
};


function load(){
	
	handleInputs();
	
	app.canvas  = document.createElement('canvas');
	app.canvas.width = app.canvasWidth;
	app.canvas.height = app.canvasHeight;
	document.body.appendChild(app.canvas);
	app.ctx = app.canvas.getContext('2d');
	
	var entities = Entities();
	var infobox = InfoBox();
	
	var tPrevious = 0;
	var interval = setInterval(function(){
		app.t = performance.now() - app.t0;
		if (app.air > 0) {
			update();
			render();
		} else {
			clearInterval(interval);
		}
	}, 20);
	
	
	function update(){
		app.count++;
		if (app.t - tPrevious > 1000){ 
			app.air--;
			tPrevious = app.t;
		}
		/*if (app.count%100 == 0) {
			app.probabilityGood *= 1.01;
			app.probabilityEvil *= 1.02;
			app.probabilityPoint *= 1.02;
			//if (app.bubbleSpeed < 5) app.bubbleSpeed += 0.2;
			console.log(app.bubbleSpeed);
		}*/
		
		entities.update();	
		infobox.setTime(app.air);
		infobox.setPoints(app.points);
	}
	
	 
	function render(){
		app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
		entities.draw();
		style = window.getComputedStyle(app.canvas);
		var x = parseInt(style.getPropertyValue('background-position-x')) - 1;
		app.canvas.style.backgroundPosition = ""+x+"px";
	}

};