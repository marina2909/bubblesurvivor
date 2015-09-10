function Sounds(){		
	this.explosionSound = SoundPool(10, "sounds/explosion.mp3", 0.2);
	this.blackholeSound = SoundPool(10, "sounds/blackhole.mp3", 0.25);
	this.bubbleSound = SoundPool(10, "sounds/bubble.mp3", 1);
	this.pointSound = SoundPool(10, "sounds/point.mp3", 0.25);
	this.shootSound = SoundPool(10, "sounds/shoot.mp3", 0.1);
	this.clockSound = SoundPool(10, "sounds/clock.mp3", 0.2);
	this.dyingSound = SoundPool(10, "sounds/dying.mp3", 0.2);
	this.bulletexplosionSound = SoundPool(10, "sounds/bulletexplosion.mp3", 0.1);
	this.introSound = SoundPool(10, "sounds/intro.mp3", 0.1, true);
}