function PainterModel(param) {
	param = param || {};
	this.xpos = param.startx || 0;
	this.ypos = param.starty || 0;
	this.angle = param.angle || 0;
	this.color = param.color || "red";
	this.scene = param.scene || {};
	this.sizex = param.sizex || 512;
	this.sizey = param.sizey || 512;
}

PainterModel.prototype.init() {


}
Painter.prototype.goForward = function(length, context) {
	context.beginPath();
    context.moveTo(this.xpos, this.ypos);
	
	this.xpos += length * Math.cos(this.angle);
	this.ypos += length * Math.sin(this.angle);
	
	context.lineTo(this.xpos, this.ypos);
	context.lineWidth = 5;
	context.strokeStyle = this.color;
	context.lineCap = 'round';
	context.stroke();
	
}

Painter.prototype.turnLeft = function(angle) {
	this.angle += angle;
}


