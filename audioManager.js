var chromePainters = chromePainters || {};

chromePainters.audioManager = function(spec) {
	var that = {};
	var my = {};
	
	my.gameIsPlaying = false;
	my.menuIsPlaying = false;
	var init = function() {
	
		my.menuMusic = document.createElement('audio');
		var source = document.createElement('source');
		source.src = 'sounds/' + spec.menuMusic;
		my.menuMusic.appendChild(source);
		
		my.gameMusic = document.createElement('audio');
		source = document.createElement('source');
		source.src = 'sounds/' + spec.gameMusic;
		my.gameMusic.appendChild(source);

		my.collisionSound = document.createElement('audio');
		source = document.createElement('source');
		source.src = 'sounds/' + spec.collisionSound;
		my.collisionSound.appendChild(source);

		my.bonusSound = document.createElement('audio');
		source = document.createElement('source');
		source.src = 'sounds/' + spec.bonusSound;
		my.bonusSound.appendChild(source);
	};
	
	var turnOnMenuMusic = function() {
	debugger;
		if (my.gameIsPlaying) {
		
			my.gameMusic.repeat = false;
			my.gameMusic.currentTime = 0;
			my.gameMusic.pause();
			my.gameIsPlaying = false;
		}
		if (my.menuIsPlaying) {
			return;
		}
		my.menuMusic.play();
		my.menuMusic.loop = true;
		my.menuIsPlaying = true;
	};
	
	var turnOnGameMusic = function() {
		if (my.menuIsPlaying) {
			my.menuMusic.repeat = false;
			my.menuMusic.currentTime = 0;
			my.menuMusic.pause();
			my.menuMusic = false;
		}
		if (my.gameIsPlaying) {
			return;
		}
		my.menuMusic.repeat = false;
		my.menuMusic.currentTime = 0;
		my.menuMusic.pause();
		my.gameMusic.play();
		my.gameMusic.loop = true;
		my.gameIsPlaying = true;
	};
	
	var playBonusSound = function() {
		my.bonusSound.play();
	};
	
	var playCollisionSound = function() {
		my.collisionSound.play();
	};
	
	that.init = init;
	that.turnOnMenuMusic = turnOnMenuMusic;
	that.turnOnGameMusic = turnOnGameMusic;
	that.playBonusSound = playBonusSound;
	that.playCollisionSound = playCollisionSound;
	return that;
};
