function Timer() {
	this.elem = document.getElementById('timerGui');
	this.progress = 0;
	this.addBonus = 0;
}

Timer.prototype.start = function (interval, gameLength) {
	this.interval = interval || 1000;
	
	// gameLength = 4 segmenty po 5 okresow interval
	this.gameLength = gameLength || 4;
	this.gameLength *= 10;
	this.gameLength -= 1;
	this.elem.innerHTML = "";
	var that = this;
    this.timer = setInterval(function(){that.update()},this.interval);
}

Timer.prototype.stop = function () {
    clearInterval(this.timer);
}


Timer.prototype.update = function () {
	this.progress += 1;
	this.elem.innerHTML = "[";
	for (var i = 0; i < this.progress; ++i) {
		if (i % 10 === 9) {
			this.elem.innerHTML += "_";
		}	
		else {
			this.elem.innerHTML += "#";
		}
	}
	
	for (i = 0; i < this.gameLength - this.progress; ++i) {
		this.elem.innerHTML += "_";
		
	}
	this.elem.innerHTML += "]";
	
	if((this.progress-1) % 10 === 9) {
		this.addBonus=1;
	}
		
	if (this.progress === this.gameLength) {
		// TODO: Wojtek wyœwietlanie statystyk
		alert("koniec gry, statystyki");
		this.stop();
	}
}
