var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;
var sphere;

var grid;
var grid3d;
var painter;
// initialization
init();

animate();

function initializeGrid()
{
	grid = new CanvasMan(200,200);
	grid.init();
	painter = new Painter({
		startx: 100,
		starty: 100,
		angle: 0,
		color: 'green' });
}
			
function init() 
{
	scene = new THREE.Scene();

	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;	
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);

	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	
	

	// create and start the renderer; choose antialias setting.
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	// create a div element to contain the renderer
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	container.appendChild( renderer.domElement );

	THREEx.WindowResize(renderer, camera);

	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	

	controls = new THREE.TrackballControls( camera );
	

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );

	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	var ambientLight = new THREE.AmbientLight(0x111111);
	 scene.add(ambientLight);
	

	var sphereGeometry = new THREE.CubeGeometry( 50, 32, 16 ); 
	var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} ); 
	sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.set(100, 50, -50);
	scene.add(sphere);
	

	var axes = new THREE.AxisHelper(100);
	scene.add( axes );

	grid3d = new Grid({ scene: scene, sizex: 512, sizey: 512 });
	grid3d.init();
	

	scene.fog = new THREE.FogExp2( 0x999900, 0.00005 );
	initializeGrid();
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	// delta = change in time since last call (in seconds)
	var delta = clock.getDelta(); 
	var moveDistance = 200 * delta; // 200 pixels per second
	var rotateAngle = Math.PI / 1.5 * delta;   // pi/2 radians (90 degrees) per second
	// move forwards/backwards/left/right
	if ( keyboard.pressed("W") ) {
		painter.goForward(1, grid.context);
		sphere.translateZ( -moveDistance );
		}
	if ( keyboard.pressed("S") ) {
	painter.goForward(-1, grid.context);
		sphere.translateZ(  moveDistance );
		}
	if ( keyboard.pressed("Q") ) {

		sphere.translateX( -moveDistance );
		}
	if ( keyboard.pressed("E") ) {
		sphere.translateX(  moveDistance );	
		}

	// rotate left/right/up/down
	var rotation_matrix = new THREE.Matrix4().identity();
	if ( keyboard.pressed("A") ) {
		painter.turnLeft(0.1);
		rotation_matrix = new THREE.Matrix4().makeRotationY(rotateAngle);
		}
	if ( keyboard.pressed("D") ) {
		painter.turnLeft(-0.1);
		rotation_matrix = new THREE.Matrix4().makeRotationY(-rotateAngle);
		}
	if ( keyboard.pressed("R") )
		rotation_matrix = new THREE.Matrix4().makeRotationX(rotateAngle);
	if ( keyboard.pressed("F") )
		rotation_matrix = new THREE.Matrix4().makeRotationX(-rotateAngle);
	if ( keyboard.pressed("A") || keyboard.pressed("D") || 
	     keyboard.pressed("R") || keyboard.pressed("F") )
	{
		sphere.matrix.multiply(rotation_matrix);
		sphere.rotation.setEulerFromRotationMatrix(sphere.matrix);
	}
		
	controls.update();
	stats.update();
}

function render() 
{	
	renderer.render( scene, camera );
}


