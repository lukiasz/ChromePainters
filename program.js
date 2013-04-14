//////////	
// MAIN //
//////////

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;
var sphere;
// initialization
init();

// animation loop / game loop
animate();
			
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
	// scene.add(ambientLight);
	
	//////////////
	// GEOMETRY //
	//////////////
		
	// most objects displayed are a "mesh":
	//  a collection of points ("geometry") and
	//  a set of surface parameters ("material")	

	// Sphere parameters: radius, segments along width, segments along height
	var sphereGeometry = new THREE.SphereGeometry( 50, 32, 16 ); 
	// use a "lambert" material rather than "basic" for realistic lighting.
	//   (don't forget to add (at least one) light!)
	var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} ); 
	sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.set(100, 50, -50);
	scene.add(sphere);
	
	

	// create a set of coordinate axes to help orient user
	//    specify length in pixels in each direction
	var axes = new THREE.AxisHelper(100);
	scene.add( axes );
	
	///////////
	// FLOOR //
	///////////
	
	// note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	// DoubleSide: render texture on both sides of mesh
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	
	/////////
	// SKY //
	/////////
	
	// recommend either a skybox or fog effect (can't use both at the same time) 
	// without one of these, the scene's background color is determined by webpage background

	// make sure the camera's "far" value is large enough so that it will render the skyBox!
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	// BackSide: render faces from inside of the cube, instead of from outside (default).
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	
	// scene.add(skyBox);
	
	// fog must be added to scene before first render
	scene.fog = new THREE.FogExp2( 0x999900, 0.00005 );
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
	if ( keyboard.pressed("W") )
		sphere.translateZ( -moveDistance );
	if ( keyboard.pressed("S") )
		sphere.translateZ(  moveDistance );
	if ( keyboard.pressed("Q") )
		sphere.translateX( -moveDistance );
	if ( keyboard.pressed("E") )
		sphere.translateX(  moveDistance );	

	// rotate left/right/up/down
	var rotation_matrix = new THREE.Matrix4().identity();
	if ( keyboard.pressed("A") )
		rotation_matrix = new THREE.Matrix4().makeRotationY(rotateAngle);
	if ( keyboard.pressed("D") )
		rotation_matrix = new THREE.Matrix4().makeRotationY(-rotateAngle);
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