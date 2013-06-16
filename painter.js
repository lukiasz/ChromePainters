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
	my.speed = 4;
    my.hasBonus = false;

	var init = function() {
		my.model3d = new chromePainters.painter3d({
			xpos: my.xpos,
			ypos: my.ypos,
			angle: my.angle,
			brushColor: my.color,
			scene: my.scene
		});
		my.model3d.init();

        that.collisionSphere = my.model3d.collisionSphere;
		my.model2d = chromePainters.painter2d({
			context: my.context,
			xpos: -my.xpos,
			ypos: -my.ypos,
			angle: my.angle,
			color: my.color,
			gridSizeX: my.gridSizeX,
			gridSizeY: my.gridSizeY
		});
	};
	
	var goForward = function(step) {
		my.model2d.goForward(step*my.speed);
		my.model3d.goForward(step*my.speed);
	};
    var knockback = function(vect) {
        my.model3d.knockback(vect);
        my.model2d.knockback(vect);
    }
    var wallblock = function(vect) {
        my.model3d.wallblock(vect);
        my.model2d.wallblock(vect);
    }
	
	var turnLeft = function(angle) {
		my.model3d.turnLeft(angle*my.speed);
		my.model2d.turnLeft(angle*my.speed);
	};

	var setLineWidth = function(width) {
		my.model2d.setLineWidth(width);
	};
	
	var setOneColor = function(color) {
		my.model2d.setOneColor(color);
	};
	
	var setSpeed = function(speed) {
		my.speed = speed;
	};
	
	var setOwnColor = function() {
		my.model2d.setOwnColor();
	};

    var setHasBonus = function(bool) {
        my.hasBonus = bool;
    }
    var getHasBonus = function() {
        return my.hasBonus;
    }
	
	that.init = init;
	that.goForward = goForward;
    that.knockback = knockback;
    that.wallblock = wallblock;
	that.turnLeft = turnLeft;
	that.setLineWidth = setLineWidth;
	that.setOneColor = setOneColor;
	that.setSpeed = setSpeed;
	that.setOwnColor = setOwnColor;
    that.setHasBonus = setHasBonus;
    that.getHasBonus = getHasBonus;


	return that;
};
