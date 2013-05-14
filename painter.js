function Painter(param) {
    param = param || {};
    this.xpos = param.startx || 0;
    this.ypos = param.starty || 0;
    this.angle = param.angle || 0;
    this.color = param.color || "red";

    this.gridSizeX = param.gridSizeX;
    this.gridSizeY = param.gridSizeY;
    this.canvasSizeX = param.canvasSizeX;
    this.canvasSizeY = param.canvasSizeY;
	this.context = param.context;
    // Inicjalizacja pedzla 3d

    this.model3d = new chromePainters.painter3d({
        xpos: this.xpos,
        ypos: this.ypos,
        angle: this.angle,
		brushColor: this.color,
        scene: param.scene
    });
}

Painter.prototype.init = function () {
    this.model3d.init();
	
	this.model2d = chromePainters.painter2d({
		context: this.context,
		xpos: this.xpos,
		ypos: this.ypos,
		angle: this.angle,
		color: this.color,
		gridSizeX: this.gridSizeX,
		gridSizeY: this.gridSizeY,});
	
}

Painter.prototype.goForward = function (length, context) {
    
	this.model2d.goForward(length);
    this.model3d.goForward(length);
}

Painter.prototype.turnLeft = function (angle) {
    this.model3d.turnLeft(angle);
    this.model2d.turnLeft(angle);
}