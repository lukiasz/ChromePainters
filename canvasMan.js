function CanvasMan(x, y) {
	this.x = x || 512;
	this.y = y || 512;
	this.canvas = document.createElement("canvas");
	this.canvas.setAttribute("id", "canvas");
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
      context.lineWidth = 3;
      context.strokeStyle = 'black';
      context.stroke();
	  this.context = context;
      /*context.beginPath();
      context.moveTo(10, this.canvas.height / 2);
      context.lineTo(this.canvas.width - 20, this.canvas.height / 2);
      context.lineWidth = 20;
      context.strokeStyle = '#0000ff';
      context.lineCap = 'round';
      context.stroke();*/
}

