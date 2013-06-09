var chromePainters = chromePainters || {};

chromePainters.timer = function(spec) {
	var that = {};
	var my = {};
	spec = spec || {};
	my.callbackFinish = spec.callbackFinish;
	my.elem = document.getElementById('timerGui');
	that.progress = 0;
	that.addBonus = 0;
	
	var start = function(interval, gameLength) {
		my.interval = interval || 1000;
	
		// gameLength = 4 segmenty po 5 okresow interval
		my.gameLength = gameLength || 4;
		my.gameLength *= 10;
		my.gameLength -= 1;
		my.elem.innerHTML = "";
		//var that = my;
		my.timer = setInterval(function(){that.update()},my.interval);
	};

	var stop = function() {
		clearInterval(my.timer);
	};
	
	var update = function() {
		that.progress += 1;
		my.elem.innerHTML = "[";
		for (var i = 0; i < that.progress; ++i) {
			if (i % 10 === 9) {
				my.elem.innerHTML += "_";
			}	
			else {
				my.elem.innerHTML += "#";
			}
		}
		
		for (i = 0; i < my.gameLength - that.progress; ++i) {
			my.elem.innerHTML += "_";
			
		}
		my.elem.innerHTML += "]";
		
		if((that.progress-1) % 10 === 9) {
			that.addBonus=1;
		}
			
		if (that.progress === my.gameLength) {
			// TODO: Wojtek wyœwietlanie statystyk
			alert("koniec gry, statystyki");
			my.stop();
		}
	};
	
	that.update = update;
	that.stop = stop;
	that.start = start;
	return that;
};