function Grid(param) {
	param = param || {};
	this.scene = param.scene || {};
	this.sizex = param.sizex ;
	// oœ "Y" w canvasie to oœ "Z" w œwiecie 
	this.sizey = param.sizey ;
	}

	Grid.prototype.init = function () {
		this.initStakes();
		this.initSurface();
	}

	Grid.prototype.initSurface = function() {
		var vertexShader = document.getElementById("vshader").textContent;
		var fragmentShader = document.getElementById("fshader").textContent;

		this.texture = new THREE.Texture(canvas);
		this.texture.needsUpdate = true;

		var surfaceTexture = THREE.ImageUtils.loadTexture("images/tex.jpg");
		surfaceTexture.wrapS = surfaceTexture.wrapT = THREE.RepeatWrapping;
		var uniforms = {
			texture1: { type: "t", value: this.texture },
			texture2: { type: "t", value: surfaceTexture },
			textRepeat: {
				type: 'f',
				value: 2
			}
		}
		var shaderMaterial =
			new THREE.ShaderMaterial({
				uniforms: uniforms,
				vertexShader: vertexShader,
				fragmentShader: fragmentShader
		});

		//var floorMaterial = new THREE.MeshPhongMaterial( { map: tex2, side: THREE.DoubleSide } );

		this.floorGeometry = new THREE.PlaneGeometry(this.sizex, this.sizey, 1, 1);
		this.floor = new THREE.Mesh(this.floorGeometry, shaderMaterial);
		this.floor.material.side = THREE.DoubleSide;
		this.floor.position.y = -0.5;
		this.floor.position.x = 0;
		this.floor.position.z = 0;
		this.floor.rotation.x = Math.PI / 2;
		this.scene.add(this.floor);
	}
	
	Grid.prototype.initStakes = function() {
		var stakeSizeX = 5;
		var stakeSizeY = 25;
		var stakeSizeZ = 5;
		var stakeGeometry = new THREE.CubeGeometry(stakeSizeX, stakeSizeY, stakeSizeZ);
		var stakeMaterial = new THREE.MeshPhongMaterial( { color: "#7c5033"} );
			
		var gapBetweenStakes = 16;
		
		for (var x = -this.sizex/2 + gapBetweenStakes;
				x <= this.sizex/2 - gapBetweenStakes; x+=gapBetweenStakes)
		{
			var stake = new THREE.Mesh(stakeGeometry, stakeMaterial);
			stake.position.set(x, stakeSizeY/2, -this.sizey/2 + stakeSizeZ/2);
			this.scene.add(stake);
			
			var stake = new THREE.Mesh(stakeGeometry, stakeMaterial);
			stake.position.set(x, stakeSizeY/2, this.sizey/2 - stakeSizeZ/2);
			this.scene.add(stake);
		}
		
		for (var z = -this.sizey/2 + gapBetweenStakes;
				z <= this.sizey/2 - gapBetweenStakes; z+=gapBetweenStakes)
		{
			var stake = new THREE.Mesh(stakeGeometry, stakeMaterial);
			stake.position.set(-this.sizex/2 + stakeSizeX/2, stakeSizeY/2, z);
			this.scene.add(stake);
			
			var stake = new THREE.Mesh(stakeGeometry, stakeMaterial);
			stake.position.set(this.sizex/2 - stakeSizeX/2, stakeSizeY/2, z);
			this.scene.add(stake);
		}
	}
	
	Grid.prototype.refresh = function() {
		this.texture.needsUpdate = true;
	}