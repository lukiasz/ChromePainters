function Statistics(canvas) {
    this.canvas = canvas;
    this.stats = [];
}

Statistics.prototype.init = function() {
      var context = this.canvas.getContext('2d');
}

Statistics.prototype.getColorStats = function () {
    var context = this.canvas.getContext('2d');
    var imgd = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    var pix = imgd.data;
    var statsTemp = [];
    for (var i = 0, n = pix.length; i < n; i += 4) {
        // podmiana kolorow na wartosci przeciwne.
        // zamiast tego potrzebujemy zrobic statystyki
        // kolorow. Najprosciej byloby wykorzystac
        // jakis hashtable jesli cos takiego istnieje.

        var index = pix[i] + '.' + pix[i + 1] + '.' + pix[i + 2];
        if ((index !== '255.255.255') && (index !== '0.0.0')) {
            statsTemp[index] = statsTemp[index] + 1 || 1;
        }
        //this.stats[pix[i] + '.' + pix[i + 1] + '.' + pix[i + 2]] += 1;
        //        pix[i] = 255 - pix[i]; // r
        //        pix[i + 1] = 255 - pix[i + 1]; // g
        //        pix[i + 2] = 255 - pix[i + 2]; // b
        // i+3 - kanal alfa
    }
    var full = (this.canvas.width) * (this.canvas.height) - (this.canvas.height - 1) * 2 - (this.canvas.width - 1) * 2;
    var iterator = 0;
    for (var key in statsTemp) {
        if (statsTemp.hasOwnProperty(key)) {
            if (statsTemp[key] > 200) {
                this.stats[iterator] = { color: key, percentage: statsTemp[key] * 100 / full };
                iterator++;
            }
        }
    }

    // 

    context.putImageData(imgd, 0, 0);
    console.log(this.stats);
    return this.stats;
    // return { first: { color: red, percentage: 30.3 }, second: .... }

}

