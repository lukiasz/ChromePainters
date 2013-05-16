var container, scene, camera, renderer, controls, stats, light;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var cube;
var sphere;
var grid;
var grid3d;
var painter;
var painters =[];
var timer;
var bgScene;
var bgCam;

var paintersManager = {
    gridSize: 512,
    amount: 1,
    init: function () {
        var colors = ['red', 'blue', 'green', 'yellow'];
        for (var i = 0; i < this.amount; i++) {
            var painterTemp = new chromePainters.painter({
                xpos: 0,
                ypos: 0,
                angle: 0,
                color: colors[i],
                scene: scene,
                gridSizeX: this.gridSize,
                gridSizeY: this.gridSize,
				context: grid.context,
            });
            painterTemp.init();
            painters[i] = painterTemp;
        }
    },
    steering: function () {
        var steeringKeys = [['W', 'A', 'S', 'D'], ["I", "J", "K", "L"], ["up", "left", "down", "right"]];
        var delta = clock.getDelta();
        var moveDistance = 200 * delta; // 200 pixels per second
        var rotateAngle = Math.PI / 1.5 * delta; // pi/2 radians (90 degrees) per second
        var j = 0;
        for (var i = 0; i < this.amount; i++) {

            if (keyboard.pressed(steeringKeys[i][0])) { //up
                painters[i].goForward(1, grid.context);
            }
            if (keyboard.pressed(steeringKeys[i][2])) { //down
                painters[i].goForward(-1, grid.context);
            }

            // rotate left/right/up/down
            var rotation_matrix = new THREE.Matrix4().identity();
            if (keyboard.pressed(steeringKeys[i][1])) { //left
                painters[i].turnLeft(0.1);
                rotation_matrix = new THREE.Matrix4().makeRotationY(rotateAngle);
            }
            if (keyboard.pressed(steeringKeys[i][3])) { //right
                painters[i].turnLeft(-0.1);
                rotation_matrix = new THREE.Matrix4().makeRotationY(-rotateAngle);
            }
        }


        //-----------------Debugging-----------------------------
        if (keyboard.pressed("r")) {
            // do testow statystyk. mozna spokojnie wywalic
            var statistics = new Statistics(grid.canvas);
            statistics.getColorStats();
            //debugger;
        }
        if (keyboard.pressed("F"))
            rotation_matrix = new THREE.Matrix4().makeRotationX(-rotateAngle);
        if (keyboard.pressed("A") || keyboard.pressed("D") ||
                keyboard.pressed("R") || keyboard.pressed("F")) {
            //sphere.matrix.multiply(rotation_matrix);
            //sphere.rotation.setEulerFromRotationMatrix(sphere.matrix);
        }
    }
};

init();
animate();

function initializeGrid() {
    // Grzesiu: Wspolrzedne na plansza 3D maja byc
    // odzwierciedleniem tych na 2D. Teraz to dziala tak, ze to, co
    // jest na canvasie nie pokrywa sie z tym co jest na planszy 3d.

    // Dobrze byloby zeby te dwa uklady mogly byc od siebie
    // niezalezne, np. canvas - 512x512, plansza 64x64 i skalowanie
    // 512 na 64. Rozmiar tekstury musi byæ potêg¹ dwójki, rozmiar samej planszy w 3d
	// niekoniecznie.

    // Mozna to zrobic albo za kazdym ruchem ustawiajac na sztywno
    // wspolrzedne x,y i rotacje, albo rotacje zmieniac przy skrecie
    // tak jak jest teraz. Osie mamy tak: Y do gory, Z,X to plansza.

    // Patrz do obiektow: Painter, PainterModel, Grid i CanvasMan.
    var gridSize = 512;
    grid = new CanvasMan(gridSize, gridSize);
    grid.init();

    grid3d = new Grid({
        scene: scene,
        sizex: gridSize,
        sizey: gridSize
    });
    grid3d.init();
}

function init() {
    scene = new THREE.Scene();

    var SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.1,
        FAR = 20000;
	
	camera = new Camera({
		x: 0,
		y: 900,
		z: -100,
		viewAngle: VIEW_ANGLE,
		aspect: ASPECT,
		near: NEAR,
		far: FAR,
		scene: scene
		});
	camera.init();
	

    // create and start the renderer; choose antialias setting.
    if (Detector.webgl)
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    else
        renderer = new THREE.CanvasRenderer();

		
	// Junior task 3: Ustawienie kamery tak zeby wszystko bylo dobrze widoczne

	// Junior task 4: Ukrywanie/pokazywanie canvasa po nacisnieciu jakiegos przycisku
	
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    // create a div element to contain the renderer

    container = document.createElement('div');
    document.body.appendChild(container);

    container.appendChild(renderer.domElement);

    THREEx.WindowResize(renderer, camera.camera);

    THREEx.FullScreen.bindKey({
        charCode: 'm'.charCodeAt(0)
    });


    controls = new THREE.TrackballControls(camera.camera);


    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);

	light = new Light({
		x: 0,
		y: 250,
		z: 0,
		pointLightValue: 0xffffff,
		ambientLightValue: 0x111111,
		scene: scene
	});
	
	light.init();

	// T³o
	var bgTexture = THREE.ImageUtils.loadTexture("images/background.jpg");
	var bg = new THREE.Mesh(
		new THREE.PlaneGeometry(2, 2, 0),
		new THREE.MeshBasicMaterial({map: bgTexture})
	);

	// Render t³a jest niezale¿ny od pozycji kamery
	bg.material.depthTest = false;
	bg.material.depthWrite = false;

	bgScene = new THREE.Scene();
	bgCam = new THREE.Camera();
	bgScene.add(bgCam);
	bgScene.add(bg);
	

    scene.fog = new THREE.FogExp2(0x999900, 0.00001);
    initializeGrid();
    paintersManager.amount = 3;
    paintersManager.init();
	timer = new Timer();
	timer.start(1000, 10);
}

function animate() {
    requestAnimationFrame(animate);
	grid3d.refresh();
    render();
    update();
}

function update() {
    paintersManager.steering();
    controls.update();
    stats.update();
}

function render() {
	renderer.autoClear = false;
	renderer.clear();
	
	// TODO £ukasz: refactor - kamera do kamery, t³o ??.
	renderer.render(bgScene, bgCam);
    renderer.render(scene, camera.camera);
}