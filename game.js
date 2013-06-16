﻿var chromePainters = chromePainters || {};

chromePainters.game = function(spec) {
	var that = {};
	var my = {};
	
	my.camera;
	my.scene;
	my.bgScene;
	my.BgCam;
	my.renderer;
	my.stats;
	my.light;
	my.background;
	my.timer;
	my.grid3d;
	my.grid;
	my.paintersManager;
	my.controls;
	my.bonus;
	my.audioManager;
	my.statistics;
	my.gui;
    my.collisionManager;
	my.indexOfPainter;
	
	var init = function() {
		
		my.indexOfPainter = 0;
		my.audioManager = new chromePainters.audioManager({
			menuMusic: 'song1.ogg',
			gameMusic: 'song2.ogg',
			bonusSound: 'bonus.ogg',
			collisionSound: 'collision.ogg',
			endSound: 'end.ogg'});
		my.audioManager.init();
		
		
		my.scene = new THREE.Scene();
		
		var SCREEN_WIDTH = window.innerWidth,
			SCREEN_HEIGHT = window.innerHeight;
		var VIEW_ANGLE = 45,
			ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
			NEAR = 0.1,
			FAR = 20000;
		
		my.camera = new Camera({
			x: 0,
			y: 900,
			z: -100,
			viewAngle: VIEW_ANGLE,
			aspect: ASPECT,
			near: NEAR,
			far: FAR,
			scene: my.scene
			});
		my.camera.init();
		

		// create and start the renderer; choose antialias setting.
		if (Detector.webgl)
			my.renderer = new THREE.WebGLRenderer({
				antialias: true
			});
		else
			my.renderer = new THREE.CanvasRenderer();

		my.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		container = document.createElement('div');
		container.setAttribute("id", "gameContainer");

		document.body.appendChild(container);
		container.appendChild(my.renderer.domElement);
		THREEx.WindowResize(my.renderer, my.camera.camera);
		THREEx.FullScreen.bindKey({
			charCode: 'm'.charCodeAt(0)
		});

		my.controls = new THREE.TrackballControls(my.camera.camera);


		my.stats = new Stats();
		my.stats.domElement.style.position = 'absolute';
		my.stats.domElement.style.bottom = '0px';
		my.stats.domElement.style.zIndex = 100;
		container.appendChild(my.stats.domElement);

		my.light = new Light({
			x: 0,
			y: 250,
			z: 0,
			pointLightValue: 0xffffff,
			ambientLightValue: 0x111111,
			scene: my.scene
		});
		
		my.light.init();

		// T�o
		var bgTexture = THREE.ImageUtils.loadTexture("images/background.jpg");
		my.background = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 2, 0),
			new THREE.MeshBasicMaterial({map: bgTexture})
		);

		// Render t�a jest niezale�ny od pozycji kamery
		my.background.material.depthTest = false;
		my.background.material.depthWrite = false;

		my.bgScene = new THREE.Scene();
		my.bgCam = new THREE.Camera();
		my.bgScene.add(my.bgCam);
		my.bgScene.add(my.background);
		

		my.scene.fog = new THREE.FogExp2(0x999900, 0.00001);
		
		
		var gridSize = 512;
		my.grid = new CanvasMan(gridSize, gridSize);
		my.grid.init();

		my.grid3d = new Grid({
			scene: my.scene,
			sizex: gridSize,
			sizey: gridSize
		});
		my.grid3d.init();
		
		my.statistics = new chromePainters.statistics(my.grid.canvas);
		my.statistics.init();
		
		
		that.playersAmount = that.playersAmount||4;
		my.paintersManager = new chromePainters.paintersManager({
			gridSize: gridSize,
			amount: that.playersAmount,
			grid: my.grid,
			scene: my.scene,
			statistics: my.statistics,
			gui: my.gui
		});

		my.paintersManager.init();
		
		my.bonus = new chromePainters.bonus({
			scene: my.scene,
			gridSizeX: gridSize,
		    gridSizeY: gridSize
		 });
		my.bonus.init();
		
		my.timer = new chromePainters.timer({
		callbackFinish: function() { 
			my.audioManager.stopGameMusic();
			my.gui.statistics.display(my.statistics.getColorStats(that.playersAmount));
			my.audioManager.playEndSound();
			setTimeout(my.audioManager.turnOnMenuMusic,5000);
			}});
		my.timer.start(1000, 5);
		
		my.audioManager.turnOnGameMusic();

        my.collisionManager = new chromePainters.collisionManager({
            paintersManager: my.paintersManager,
            gridSize: gridSize,
            bonus: my.bonus,
            audioManager: my.audioManager
        });
	
		//var counter    = new SPARKS.SteadyCounter( 500 );
		//var emitter   = new SPARKS.Emitter( counter );
		//emitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone( new THREE.Vector3( 50, 19, 50 ) ) ) );
		//emitter.addInitializer( new SPARKS.Lifetime( 1, 15 ));
		//emitter.start();
		//my.scene.add(emitter);
	};
	
	var animate = function() {
		requestAnimationFrame(animate);
		my.grid3d.refresh();
		render();
		update();
	};
	
	var update = function() {
        // Jezeli zaszla kolizja pedzel-bonus zwraca index pedzla else -1.
        var painterIndex = my.collisionManager.bonusCollision();

		
					
		if(my.timer.addBonus === 1) { 
			my.timer.addBonus = 0;	
			//deaktywacja poprzedniego bonusu
			if(my.bonus.width === -1) {
			my.paintersManager.setLineWidth({
											index: my.indexOfPainter,
											width: 40 });
			}
			else if(my.bonus.oneColor === -1) {
				my.paintersManager.setOwnColor();
			}
			else if(my.bonus.speed === -1) {
				my.paintersManager.setSpeed({
											index: my.indexOfPainter,
											speed: 4 });
			}
			else if(my.bonus.stopOthers === -1) {
				my.paintersManager.setStopOthers({
												startAll: my.indexOfPainter,
												speed: 4 });
			}
			my.bonus.deactivateBonus();
			my.bonus.removeBonus();	//usuni�cie ze sceny
			my.bonus.loadBonus();
		}
		//nowy bonus
		if(painterIndex != -1) {
			my.bonus.removeBonus();
			my.indexOfPainter = painterIndex;
			if(my.bonus.width === 1) {
				my.paintersManager.setLineWidth({
												index: painterIndex,
												width: 60 });
				my.bonus.checkBonus();
			}
			else if(my.bonus.oneColor === 1) {
				my.paintersManager.setOneColor({
												index: painterIndex });
				my.bonus.checkBonus();
			}
			else if(my.bonus.speed === 1) {
				my.paintersManager.setSpeed({
												index: painterIndex,
												speed: 8 });
				my.bonus.checkBonus();
			}
			else if(my.bonus.stopOthers === 1) {
				my.paintersManager.setStopOthers({
												index: painterIndex,
												speed: 0 });
				my.bonus.checkBonus();
			}
		}
		my.paintersManager.steering();
		my.controls.update();
		my.stats.update();
        my.collisionManager.collision();

	};
	
	var render = function() {
		my.renderer.autoClear = false;
		my.renderer.clear();
		my.renderer.render(my.bgScene, my.bgCam);
		my.renderer.render(my.scene, my.camera.camera);
	};
	
	my.gui= new chromePainters.gui(that);
	
	that.playersAmount;
	that.menu = my.gui.menu;
	that.update = update;
	that.animate = animate;
	that.init = init;
	
	return that;
}
