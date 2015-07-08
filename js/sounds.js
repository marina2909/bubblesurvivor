function Sounds(){		
	this.explosionSound = SoundPool(10, "sounds/explosion.wav", 0.2);
	this.blackholeSound = SoundPool(10, "sounds/blackhole.wav", 0.25);
	this.bubbleSound = SoundPool(10, "sounds/bubble.wav", 1);
	this.pointSound = SoundPool(10, "sounds/point.wav", 0.25);
	this.shootSound = SoundPool(10, "sounds/shoot.wav", 0.1);
	this.clockSound = SoundPool(10, "sounds/clock.wav", 0.2);
	this.dyingSound = SoundPool(10, "sounds/dying.wav", 0.2);
	this.bulletexplosionSound = SoundPool(10, "sounds/bulletexplosion.wav", 0.1);
	this.introSound = SoundPool(10, "sounds/intro.wav", 0.1, true);
}