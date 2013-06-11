var chromePainters = chromePainters || {};

chromePainters.paintersManager = function(spec) {
	var that = {};
	var my = {};
	
	my.gui = spec.gui;
	my.statistics = spec.statistics;
	my.gridSize = spec.gridSize;
    my.amount = spec.amount;
	my.grid = spec.grid;
	my.scene = spec.scene;
	my.keyboard;
	my.clock;
	my.painters = [];
	
	var colors = ['red', 'blue', 'green', 'yellow'];
	var init = function() {
		my.clock = new THREE.Clock();
		my.keyboard = new THREEx.KeyboardState();	
        for (var i = 0; i < my.amount; i++) {
            var painterTemp = new chromePainters.painter({
                xpos: 0,
                ypos: 0,
                angle: 0,
                color: colors[i],
                scene: my.scene,
                gridSizeX: my.gridSize,
                gridSizeY: my.gridSize,
				context: my.grid.context,
            });
            painterTemp.init();
            my.painters[i] = painterTemp;
        }
	};
	
	var steering = function() {
		var steeringKeys = [['W', 'A', 'S', 'D'], ["I", "J", "K", "L"], ["up", "left", "down", "right"]];
        var delta = my.clock.getDelta();
        var moveDistance = 200 * delta; // 200 pixels per second
        var rotateAngle = Math.PI / 1.5 * delta; // pi/2 radians (90 degrees) per second
        var j = 0;
        for (var i = 0; i < my.amount; i++) {

            if (my.keyboard.pressed(steeringKeys[i][0])) { //up
                my.painters[i].goForward(1, my.grid.context);
            }
            if (my.keyboard.pressed(steeringKeys[i][2])) { //down
                my.painters[i].goForward(-1, my.grid.context);
            }

            // rotate left/right/up/down
            var rotation_matrix = new THREE.Matrix4().identity();
            if (my.keyboard.pressed(steeringKeys[i][1])) { //left
                my.painters[i].turnLeft(0.1);
                rotation_matrix = new THREE.Matrix4().makeRotationY(rotateAngle);
            }
            if (my.keyboard.pressed(steeringKeys[i][3])) { //right
                my.painters[i].turnLeft(-0.1);
                rotation_matrix = new THREE.Matrix4().makeRotationY(-rotateAngle);
            }
        }


        //-----------------Debugging-----------------------------
        if (my.keyboard.pressed("r")) {
            // do testow statystyk. mozna spokojnie wywalic
			my.gui.statistics.display(my.statistics.getColorStats());
            //debugger;
        }
        if (my.keyboard.pressed("F"))
            rotation_matrix = new THREE.Matrix4().makeRotationX(-rotateAngle);
        if (my.keyboard.pressed("A") || my.keyboard.pressed("D") ||
                my.keyboard.pressed("R") || my.keyboard.pressed("F")) {
            //sphere.matrix.multiply(rotation_matrix);
            //sphere.rotation.setEulerFromRotationMatrix(sphere.matrix);
        }
    };
	
	var setLineWidth = function(spec) {
		my.painters[spec.index].setLineWidth(spec.width);
	};
	
	var setOneColor = function(spec) {
		for (var i = 0; i < my.amount; i++) {
			my.painters[i].setOneColor(colors[spec.index]);
		}
	};
	
	var setSpeed = function(spec) {
		my.painters[spec.index].setSpeed(spec.speed);
	};
	
	var setStopOthers = function(spec) {
		var index = spec.index || 0;
		var startAll = spec.startAll || 0;
		for (var i = 0; i < my.amount; i++) {
			if(i != index || startAll === 1) {
				my.painters[i].setSpeed(spec.speed);
			}
		}
	};
	
	var setOwnColor = function() {
		for (var i = 0; i < my.amount; i++) {
			my.painters[i].setOwnColor();
		}
	};

	that.steering = steering;
	that.init = init;
	that.setLineWidth = setLineWidth;
	that.setOneColor = setOneColor;
	that.setSpeed = setSpeed;
	that.setStopOthers = setStopOthers;
	that.setOwnColor = setOwnColor;
	return that;
};