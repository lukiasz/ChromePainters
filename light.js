 function Light (param) {
	param = param || {};
	this.x = param.x || 0;
	this.y = param.y || 0;
	this.z = param.z || 0;
	this.pointLightValue = param.pointLightValue;
	this.ambientLightValue = param.ambientLightValue;
	this.scene = param.scene;
}

Light.prototype.init = function () {
	this.light = new THREE.PointLight(this.pointLightValue);
	this.light.position.set(this.x, this.y, this.z);
	this.scene.add(this.light);
	
	this.ambientLight = new THREE.AmbientLight(this.ambientLightValue);
    this.scene.add(this.ambientLight);
	}
	