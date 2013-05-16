var chromePainters = chromePainters || {};

chromePainters.painter = function(spec) {
	var that = {};
	var my = {};
	
	my.xpos = spec.xpos;
	my.ypos = spec.ypos;
	my.angle = spec.angle;
	my.color = spec.color;
	my.scene = spec.scene;
	my.gridSizeX = spec.gridSizeX;
	my.gridSizeY = spec.gridSizeY;
	my.canvasSizeX = spec.canvasSizeX;
	my.canvasSizeY = spec.canvasSizeY;
	my.context = spec.context;
	
	var init = function() {
		my.model3d = new chromePainters.painter3d({
			xpos: my.xpos,
			ypos: my.ypos,
			angle: my.angle,
			brushColor: my.color,
			scene: my.scene
		});
		my.model3d.init();
	
		my.model2d = chromePainters.painter2d({
			context: my.context,
			xpos: my.xpos,
			ypos: my.ypos,
			angle: my.angle,
			color: my.color,
			gridSizeX: my.gridSizeX,
			gridSizeY: my.gridSizeY
		});
	};
	
	var goForward = function(step) {
		my.model2d.goForward(step);
		my.model3d.goForward(step);
	};
	
	var turnLeft = function(angle) {
		my.model3d.turnLeft(angle);
		my.model2d.turnLeft(angle);
	};

	that.init = init;
	that.goForward = goForward;
	that.turnLeft = turnLeft;
	return that;
};
