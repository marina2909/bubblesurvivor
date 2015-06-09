var app = {
	canvasWidth: 820,
	canvasHeight: 520,
	bulletRadius: 4,
	energyWidth: 22,
	
	bubbleDistance: 7,
	bulletsDistance: 300,
	bubbleProbabilities: [0.7, 0.2, 0.1], // good, evil, point bubbles
	blackHoleOccurency: 10000,
	bulletExplosionRadius: 10,
	distanceFromBlackHole: 70,
	
	bubbleAccStep: 0.0000001,
	levelChangeStep: 50000,
	playerSpeed: 0.3, 
	bulletSpeed: 0.3, 
	bubbleStartSpeed : 0.5,
	backgroundImgSpeed: 0.02,
	
	soundOn: false,
	volume: 0.25,
	maxEnergy: 150000,
	
	playerGravConst: 55
};