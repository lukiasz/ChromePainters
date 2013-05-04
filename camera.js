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