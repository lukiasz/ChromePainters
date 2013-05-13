// Namespace. Tutaj znajduja sie wszystkie nasze obiekty
var chromePainters = chromePainters || {};

// Obiekt painter2d. spec to parametr.
chromePainters.painter2d = function(spec) {
	
	// rzeczy podpiete do that sa publiczne. Gdybysmy dziedziczyli
	// po jakims obiekcie, to tutaj wlasnie bysmy go tworzyli.
	var that = {};
	
	// rzeczy podpiete do my sa prywatne.
	var my = {};
	my.xpos = spec.xpos;
	my.ypos = spec.ypos;
	my.angle = spec.angle;
	my.color = spec.color;
	
	// funkcja prywatna. Takze moglaby byc podpieta od razu do 'my',
	// ale bez podpinania mozemy jej uzywac w obrebie tego obiektu
	// z poziomu innych funkcji bez uzywania slowa kluczowego this.
	var goForward = function(step) {
		spec.context.beginPath();
		spec.context.moveTo(my.xpos + spec.gridSizeX/2, my.ypos + spec.gridSizeY/2);
		my.xpos -= step * Math.sin(my.angle);
		my.ypos -= step * Math.cos(my.angle);

		spec.context.lineTo(my.xpos + spec.gridSizeX/2, my.ypos + spec.gridSizeY/2);
		spec.context.lineWidth = 15;
		spec.context.strokeStyle = my.color;
		spec.context.lineCap = 'round';
		spec.context.stroke();
	};
	
	var turnLeft = function(angle) {
		my.angle += angle;
	};
	
	// przypisanie ponizszych rzeczy do that (a nastepnie zwrocenie that)
	// czyni te skladniki skladnikami publicznymi.
	that.goForward = goForward;
	that.turnLeft = turnLeft;
	return that;
};
