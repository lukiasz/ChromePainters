function Statistics(canvas) {
	this.canvas = canvas;
}

Statistics.prototype.init = function() {
      var context = this.canvas.getContext('2d');
}

Statistics.prototype.getColorStats = function() {
	var context = this.canvas.getContext('2d');
	var imgd = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
	var pix = imgd.data;

	for (var i = 0, n = pix.length; i < n; i += 4) {
	
		// podmiana kolorow na wartosci przeciwne.
		// zamiast tego potrzebujemy zrobic statystyki
		// kolorow. Najprosciej byloby wykorzystac
		// jakis hashtable jesli cos takiego istnieje. 
		
		pix[i  ] = 255 - pix[i  ]; // r
		pix[i+1] = 255 - pix[i+1]; // g
		pix[i+2] = 255 - pix[i+2]; // b
		// i+3 - kanal alfa
	}

	// 
	context.putImageData(imgd, 0,0);
	
	// return { first: { color: red, percentage: 30.3 }, second: .... }

}

