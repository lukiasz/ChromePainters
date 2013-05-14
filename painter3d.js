var chromePainters = chromePainters || {};

chromePainters.painter3d = function(spec) {
	var that = {};
	var my = {};
	
	my.xpos = spec.xpos;
	my.ypos = spec.ypos;
	my.angle = spec.angle;
	my.brushColor = spec.brushColor;
	my.scene = spec.scene;

	
	var init = function() {
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		var self = my;
		loader.load('./models/' + self.brushColor + 'Brush.dae', function (collada) {
			var model = collada.scene;
			model.doublesided = true;
			model.scale.x = model.scale.y = model.scale.z = 4;
			model.position.set(self.xpos, 50, self.ypos);
			model.updateMatrix();
			self.scene.add(model);
			self.brush = model;
		});
	};
	
	var goForward = function(step) {
		my.brush.translateZ(step);
	};
	
	var turnLeft = function(angle) {
		my.brush.rotation.y += angle;
	};

	that.init = init;
	that.goForward = goForward;
	that.turnLeft = turnLeft;
	return that;
};

function PainterModel(param) {
    param = param || {};
    this.xpos = param.startx || 0;
    this.ypos = param.starty || 0;
    this.angle = param.angle || 0;
    this.colorHex = param.colorHex || "0x8888ff";
	this.brushColor = param.brushColor;
    this.scene = param.scene;
	this.brush = null;
}

/*PainterModel.prototype.init = function () {

    var x = this.xpos;
    var y = this.ypos;

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    var that = this;
    loader.load('./models/' + this.brushColor + 'Brush.dae', function (collada) {
        var model = collada.scene;
        model.doublesided = true;
        model.scale.x = model.scale.y = model.scale.z = 4;
        model.position.set(x, 50, y);
        model.updateMatrix();
        this.scene.add(model);
        that.brush = model;
    });



}

PainterModel.prototype.goForward = function (length) {
    // Justyna: tutaj gdzies powinna byc animacja pedzla
	
    this.brush.translateZ(length);
}

PainterModel.prototype.turnLeft = function (angle) {
    // Justyna: tutaj tez animacja skretu pedzla

//    var rotation_matrix = new THREE.Matrix4().makeRotationY(angle);
//    this.brush.matrix.multiply(rotation_matrix);
    this.brush.rotation.y += angle;

}*/