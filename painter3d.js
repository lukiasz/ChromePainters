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
			model.scale.x = model.scale.y = model.scale.z = 4;
			model.position.set(self.xpos, 32, self.ypos);
			model.material = new THREE.MeshPhongMaterial();
			model.material.side = THREE.DoubleSide;
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
