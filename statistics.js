
chromePainters.statistics = function (canvas) {
    this.canvas = canvas;
    this.stats = [];
}

chromePainters.statistics.prototype.init = function() {
      this.context = this.canvas.getContext('2d');
}

chromePainters.statistics.prototype.getColorStats = function (amountOfPlayers) {
    var imgd = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    var pix = imgd.data;
    var statsTemp = [];
    for (var i = 0, n = pix.length; i < n; i += 4) {
        var index = pix[i] + '.' + pix[i + 1] + '.' + pix[i + 2];
        if ((index !== '255.255.255') && (index !== '0.0.0')) {
            statsTemp[index] = statsTemp[index] + 1 || 1;
        }
    }
    var full = (this.canvas.width) * (this.canvas.height) - (this.canvas.height - 1) * 2 - (this.canvas.width - 1) * 2;
    var iterator = 0;
	var colors = ['255.0.0', '0.0.255', '0.128.0', '255.255.0'];
	
    for (var key in statsTemp) {
        if (statsTemp.hasOwnProperty(key)) {
			for (var i =0;i<amountOfPlayers;i++)
			{
				if (key === colors[i]) {
					this.stats[iterator] = { color: key, percentage: statsTemp[key] * 100 / full };
					iterator++;
				}
			}
        }
    }

    this.context.putImageData(imgd, 0, 0);
    console.log(this.stats);
    return this.stats;
}

