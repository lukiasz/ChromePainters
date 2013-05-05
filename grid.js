function Grid(param) {
	param = param || {};
	this.scene = param.scene || {};
	this.sizex = param.sizex ;
	this.sizey = param.sizey ;
	}

Grid.prototype.init = function() {

	var vertexShader = document.getElementById( "vshader" ).textContent;
	var fragmentShader = document.getElementById( "fshader" ).textContent;
	
	this.texture = new THREE.Texture(canvas);
					this.texture.needsUpdate = true;
	
	var tex2 = THREE.ImageUtils.loadTexture("images/tex.jpg");
	tex2.wrapS = tex2.wrapT = THREE.RepeatWrapping;
	var uniforms = { 
	texture1: { type:"t", value: this.texture },
	texture2: { type:"t", value: tex2 },
	textRepeat: {
        type: 'f',
        value: 2
    }
	}
	var shaderMaterial =
	new THREE.ShaderMaterial({
	uniforms:  uniforms,
    vertexShader:   vertexShader,
    fragmentShader: fragmentShader
  });

	// Junior task 2: Stworzenie obramowania planszy tak, ¿eby by³y
	// "bandy" od ktorych pozniej odbijac sie beda pedzle. Niech beda to 
	// cztery prostopadlosciany (albo jeden wyswietlany 4x).
	// Moze to byc osobny obiekt w osobnym pliku albo gdzies tutaj.
	// W painterModel poki co jest tworzenie prostopadloscianu
  
	this.floorGeometry = new THREE.PlaneGeometry(this.sizex, this.sizey, 1, 1);
	this.floor = new THREE.Mesh(this.floorGeometry, shaderMaterial);
	this.floor.material.side = THREE.DoubleSide;
	this.floor.position.y = -0.5;
	this.floor.rotation.x = Math.PI / 2;
	this.scene.add(this.floor);
}

Grid.prototype.refresh = function() {
this.texture.needsUpdate = true;
}