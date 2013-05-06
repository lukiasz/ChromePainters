var container, scene, camera, renderer, controls, stats, light;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var cube;
var sphere;
var grid;
var grid3d;
var painter;
var painters =[];


var paintersManager = {
    gridSize: 512,
    amount: 1,
    init: function () {
        var colors = ['red', 'blue', 'green', 'yellow'];
        for (var i = 0; i < this.amount; i++) {
            var painterTemp = new Painter({
                startx: (this.gridSize - 200*(i-this.amount+1)) / 2,
                starty: (this.gridSize - 200*(i-this.amount+1)) / 2,
                angle: 0,
                color: colors[i],
                scene: scene,
                gridSizeX: this.gridSize,
                gridSizeY: this.gridSize
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
        if (keyboard.pressed("R")) {
            // do testow statystyk. mozna spokojnie wywalic
            var statistics = new Statistics(grid.canvas);
            statistics.getColorStats();
            debugger;
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
    // 512 na 64. Te rozmiary zawsze beda potegami dwojki a plansza bedzie
    // kwadratowa (ale to w sumie nie powinno miec znaczenia). 

    // Mozna to zrobic albo za kazdym ruchem ustawiajac na sztywno
    // wspolrzedne x,y i rotacje, albo rotacje zmieniac przy skrecie
    // tak jak jest teraz. Osie mamy tak: Y do gory, Z,X to plansza.

    // Patrz do obiektow: Painter, PainterModel, Grid i CanvasMan.
    var gridSize = 512;
    grid = new CanvasMan(gridSize, gridSize);
    grid.init();
//    painter = new Painter({
//        startx: gridSize / 2,
//        starty: gridSize / 2,
//        angle: 0,
//        color: 'green',
//        scene: scene,
//        gridSizeX: gridSize,
//        gridSizeY: gridSize
//    });
//    painter.init();

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

 

    var axes = new THREE.AxisHelper(100);
    scene.add(axes);

    scene.fog = new THREE.FogExp2(0x999900, 0.00001);
    initializeGrid();
    paintersManager.amount = 3;
    paintersManager.init();
}

function animate() {
    requestAnimationFrame(animate);
	grid3d.refresh();
    render();
    update();
}

function update() {
    // Wojtek: Potrzebowac bedziemy czegos w stylu 'managera gry/sterowania',
    // klasy, do ktorej na wejsciu podamy ilosc graczy i ktora
    // stworzy nam odpowiednia ilosc pedzli i bedzie nimi rysowac
    // gdy nacisniete zostana odpowiednie przyciski. W oryginalnym
    // battle painters nie ma przycisku 'do przodu', ale tutaj do
    // celow debuggowania dalbym go kazdemu z graczy.

    // Wyobrazam sobie to tak, ze jest ten manager, tworzony moze
    // byc jako zmienna globalna (potem sie to zmieni jak bedzie jeszcze
    // bardziej ogolna klasa zarzadzajaca menu itp.) ktory ma w sobie
    // obiekt keyboard a takze grid, canvas i wszystkie pedzle.
    // Naciskajac na rozne klawisze pedzle maluja po canvasie.
    // Wykorzystaj clock.getDelta() do wszystkich ruchow. Miejsce
    // w ktorym pojawiaja sie pedzle moze byc takie jak w Battle Painters
    // albo dowolne inne tylko zeby na siebie nie nachodzily. 
    
    paintersManager.steering();
    
	
    controls.update();
    stats.update();
}





function render() {
    renderer.render(scene, camera.camera);
}