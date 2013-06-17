 function Camera (param) {
	param = param || {};
	this.x = param.x || 0;
	this.y = param.y || 0;
	this.z = param.z || 0;
	this.viewAngle = param.viewAngle;
	this.aspect = param.aspect;
	this.near = param.near;
	this.far = param.far;
	this.scene = param.scene;
}

Camera.prototype.init = function () {
	this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.aspect, this.near, this.far);
	this.scene.add(this.camera);
    this.camera.position.set(this.x, this.y, this.z);
    this.camera.lookAt(this.scene.position);
	}
	
Camera.prototype.setPosition = function (x,y,z) {
	this.x = x;
	this.y = y;
	this.z = z;
    this.camera.position.set(this.x, this.y, this.z);
    this.camera.lookAt(this.scene.position);
	}
	
Camera.prototype.update = function () {
	var pos = new Date().getTime();
	this.x = this.x + Math.cos(pos/5000.0) * 0.2;// * 0.5;
	this.y = this.y + Math.sin(pos/7000.0) * 0.2;
	this.z = this.z + Math.cos(pos/3000.0) * 0.2;// * 0.5;
    this.camera.position.set(this.x, this.y, this.z);
    this.camera.lookAt(this.scene.position);
	}