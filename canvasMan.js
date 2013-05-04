function CanvasMan(x, y) {
	this.x = x;
	this.y = y;
	this.canvas = document.createElement("canvas");
	this.canvas.setAttribute("id", "canvas");
	// Wojtek: Canvas powinien byc nad scena.
	// this.canvas.setAttribute("style", "float:left;");
	this.canvas.width = this.x;
	this.canvas.height = this.y;
	document.body.insertBefore(this.canvas, document.body.firstChild);
}

CanvasMan.prototype.init = function() {
      var context = this.canvas.getContext('2d');

	  context.beginPath();
      context.rect(0, 0, this.x, this.y);
      context.fillStyle = 'gray';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();
	  this.context = context;
}

