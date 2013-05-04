function PainterModel(param) {
    param = param || {};
    this.xpos = param.startx || 0;
    this.ypos = param.starty || 0;
    this.angle = param.angle || 0;
    this.colorHex = param.colorHex || "0x8888ff";
    this.scene = param.scene;

}

PainterModel.prototype.init = function () {
    // Justyna: Tutaj powinno byc wczytanie modelu pedzla;
    // zajmij sie tym w pierwszej kolejnosci, animacje zostaw
    // na pozniej. ThreeJS ma jakies loadery modelow, to powinno
    // byc stosunkowo proste
    var sphereGeometry = new THREE.CubeGeometry(50, 32, 16);

    // Justyna: zerknij tez przy okazji, czemu kolor mi nie dziala
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: this.colorHex
    });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphere.position.set(this.xpos, 50, this.ypos);

    this.scene.add(this.sphere);

}

PainterModel.prototype.goForward = function (length) {
    // Justyna: tutaj gdzies powinna byc animacja pedzla
    this.sphere.translateZ(length);
}

PainterModel.prototype.turnLeft = function (angle) {
    // Justyna: tutaj tez animacja skretu pedzla
    var rotation_matrix = new THREE.Matrix4().makeRotationY(angle);
    this.sphere.matrix.multiply(rotation_matrix);
    this.sphere.rotation.setEulerFromRotationMatrix(this.sphere.matrix);

    //this.sphere.rotation.setEulerFromRotationMatrix(this.sphere.matrix);
}