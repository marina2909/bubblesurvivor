var app = {
	canvasWidth: 860,
	canvasHeight: 520,
	bulletRadius: 4,
	energyWidth: 22,
	
	bubbleDistance: 7,
	bulletsDistance: 300,
	bubbleTypes: ['good', 'evil', 'point'],
	bubbleProbabilities: [0.3, 0.6, 0.1],
	blackHoleOccurency: 25,
	bulletExplosionRadius: 10,
	distanceFromBlackHole: 70,
	
	bubbleAccStep: 0.0000025,
	levelChangeStep: 50000,
	playerSpeed: 0.3, 
	bulletSpeed: 0.3, 
	bubbleStartSpeed : 0.1,
	backgroundImgSpeed: 0.02,
	
	soundOn: true,
	volume: 0.25,
	maxEnergy: 150000
};