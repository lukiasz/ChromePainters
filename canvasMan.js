function CanvasMan(x, y) {
	this.x = x;
	this.y = y;
	this.canvas = document.createElement("canvas");
	this.canvas.setAttribute("id", "canvas");
	this.canvas.width = this.x;
	this.canvas.height = this.y;
	document.body.appendChild(this.canvas);
	//document.body.insertBefore(this.canvas, document.body.firstChild);
}

CanvasMan.prototype.init = function() {
      var context = this.canvas.getContext('2d');

	  context.beginPath();
      context.rect(0, 0, this.x, this.y);
      context.fillStyle = 'white';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();
	  this.context = context;
}

