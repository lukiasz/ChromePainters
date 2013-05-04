function Grid(param) {
	param = param || {};
	this.scene = param.scene || {};
	this.sizex = param.sizex || 512;
	this.sizey = param.sizey || 512;
	}

Grid.prototype.init = function() {

	var vertexShader = document.getElementById( "vshader" ).textContent;
	var fragmentShader = document.getElementById( "fshader" ).textContent;
	var uniforms = { 
	texture1: { type:"t", value: THREE.ImageUtils.loadTexture("images/tex.jpg") }
	}
	var shaderMaterial =
	new THREE.ShaderMaterial({
	uniforms:  uniforms,
    vertexShader:   vertexShader,
    fragmentShader: fragmentShader
  });

	this.floorGeometry = new THREE.PlaneGeometry(this.sizex, this.sizey, 1, 1);
	this.floor = new THREE.Mesh(this.floorGeometry, shaderMaterial);
	this.floor.material.side = THREE.DoubleSide;
	this.floor.position.y = -0.5;
	this.floor.rotation.x = Math.PI / 2;
	this.scene.add(this.floor);
}