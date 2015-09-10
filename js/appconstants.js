var app = {
	canvasWidth: 820,
	canvasHeight: 519,
	bulletRadius: 4,
	energyWidth: 24,
	
	
	bubbleDistance: 7,
	bulletsDistance: 300,
	bulletGravConstant : 50,
	bubbleProbabilities: [0.3, 0.6, 0.1], // good, evil, point bubbles
	blackHoleOccurency: 25,
	bulletExplosionRadius: 10,
	distanceFromBlackHole: 70,
	pointsX: 35,
	pointsY: 500,
	
	bubbleAccStep: 0.0000025,
	levelChangeStep: 50000,
	playerSpeed: 0.3, 
	bulletSpeed: 0.3, 
	bubbleStartSpeed : 0.25,
	numberOfGoodEvilImages: 4,
	backgroundImgSpeed: 0.1,
	
	volume: 1,
	maxEnergy: 150000,
	
	playerGravConst: 55,
	
	
	slipperWidth: 32,
	sliderWidth: 200
};