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

var model;

PainterModel.prototype.init = function () {
    // Justyna: Tutaj powinno byc wczytanie modelu pedzla;
    // zajmij sie tym w pierwszej kolejnosci, animacje zostaw
    // na pozniej. ThreeJS ma jakies loadery modelow, to powinno
    // byc stosunkowo proste

	 var x = this.xpos;
	 var y = this.ypos;

			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load( './models/' + this.brushColor + 'Brush.dae', function ( collada ) {

				model = collada.scene;
				model.doublesided = true;
				model.scale.x = model.scale.y = model.scale.z = 4;
				model.position.set(x,50,y);
				model.updateMatrix();
		
				this.scene.add(model);
				});
				this.brush = model;
		
	
    /*var sphereGeometry = new THREE.CubeGeometry(50, 32, 16);

    // Justyna: zerknij tez przy okazji, czemu kolor mi nie dziala
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: this.colorHex
    });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphere.position.set(this.xpos, 50, this.ypos);

    this.scene.add(this.sphere);*/

}

PainterModel.prototype.goForward = function (length) {
    // Justyna: tutaj gdzies powinna byc animacja pedzla
	
	 if(this.brushColor === 'green')
	 {
		 this.brush = this.scene.children[7];
	 }
	 else if(this.brushColor === 'red')
	 {
		 this.brush = this.scene.children[5];
	 }
	 else if(this.brushColor === 'blue')
	 {
		this.brush = this.scene.children[6];
	 }
	
    this.brush.translateZ(length);
}

PainterModel.prototype.turnLeft = function (angle) {
    // Justyna: tutaj tez animacja skretu pedzla
	
     if(this.brushColor === 'green')
	 {
		 this.brush = this.scene.children[7];
	 }
	 else if(this.brushColor === 'red')
	 {
		 this.brush = this.scene.children[5];
	 }
	 else if(this.brushColor === 'blue')
	 {
		this.brush = this.scene.children[6];
	 }
	 
    var rotation_matrix = new THREE.Matrix4().makeRotationY(angle);
    this.brush.matrix.multiply(rotation_matrix);
    this.brush.rotation.setEulerFromRotationMatrix(this.brush.matrix);

}