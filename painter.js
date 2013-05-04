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
    // Inicjalizacja pedzla 3d

    this.model3d = new PainterModel({
        startx: this.xpos,
        starty: this.ypos,
        angle: this.angle,
        colorHex: "0x8888ff",
        scene: param.scene
    });
}

Painter.prototype.init = function () {
    this.model3d.init();

}

Painter.prototype.goForward = function (length, context) {
    context.beginPath();
    context.moveTo(this.xpos, this.ypos);

    this.xpos += length * Math.cos(this.angle);
    this.ypos += length * Math.sin(this.angle);

    context.lineTo(this.xpos, this.ypos);
    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.lineCap = 'round';
    context.stroke();

    this.model3d.goForward(length);
}

Painter.prototype.turnLeft = function (angle) {
    this.model3d.turnLeft(angle);
    this.angle += angle;
    this.angle = this.angle;
}