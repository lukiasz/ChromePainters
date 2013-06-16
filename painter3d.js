var chromePainters = chromePainters || {};

chromePainters.painter3d = function(spec) {
	var that = {};
	var my = {};
	
	my.xpos = spec.xpos;
	my.ypos = spec.ypos;
	my.angle = spec.angle;
	my.brushColor = spec.brushColor;
	my.scene = spec.scene;
    my.collisionSphere = new THREE.Sphere(0, 20);

	
	var init = function() {
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		var self = my;
		loader.load('./models/' + self.brushColor + 'Brush.dae', function (collada) {
			var model = collada.scene;
			model.doublesided = true;
			model.scale.x = model.scale.y = model.scale.z = 4;
			model.position.set(self.xpos, 19, self.ypos);
			model.updateMatrix();
			self.scene.add(model);
			self.brush = model;
		});
	};
	
	var goForward = function(step) {
		my.brush.translateZ(step);
        my.collisionSphere.center = my.brush.position;
	};
    var knockback = function(vect) {
        my.brush.position.subVectors(my.brush.position, vect);
        my.collisionSphere.center = my.brush.position;
    }
	
	var turnLeft = function(angle) {
		my.brush.rotation.y += angle;
	};

	that.init = init;
	that.goForward = goForward;
	that.turnLeft = turnLeft;
    that.knockback = knockback;
    that.collisionSphere = my.collisionSphere;

	return that;
};
