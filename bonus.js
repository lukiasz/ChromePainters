var chromePainters = chromePainters || {};

chromePainters.bonus = function(spec) {
	var that = {};
	var my = {};
	
	my.xpos = spec.xpos || 0;
	my.ypos = spec.ypos || 0;
	my.color = spec.color || 0x000000;
	my.speed = spec.speed || 0;
	my.width = spec.width || 0;
	my.oneColor = spec.oneColor || 0;
	my.scene = spec.scene;
	my.gridSizeX = spec.gridSizeX;
	my.gridSizeY = spec.gridSizeY;
	
	var init = function() {
		var material = new THREE.MeshBasicMaterial({color: my.color, opacity: 1});
		my.bonus = new THREE.Mesh(new THREE.CubeGeometry(25,25,25), material);
		my.bonus.position.set(my.xpos, 15, my.ypos);
		//my.scene.add(my.bonus);
		//addBonus();
	};
	
	var setBonusType = function() {
		var BonusType = parseInt((Math.random()*10) % 3);
		if(BonusType === 0)
		{
			my.speed = 1;
			my.color = new THREE.Color().setHex(0xFF0000);
		}
		else if(BonusType === 1)
		{
			my.width  = 1;
			my.color = new THREE.Color().setHex(0x00FF00);
		}
		else
		{
			my.oneColor = 1;
			my.color = new THREE.Color().setHex(0x0000FF);
		}
		my.bonus.material.color = my.color;
	};
	
	var  setCoordinates = function() {
		my.xpos = (Math.random()*1000) % (my.gridSizeX-my.gridSizeX/2);
		my.ypos = (Math.random()*1000) % (my.gridSizeY-my.gridSizeY/2);
		my.bonus.position.set(my.xpos, 15, my.ypos);
	};

	var addBonus = function() {
		my.scene.add(my.bonus);
	};
	
	var loadBonus = function() {
		setBonusType();
		setCoordinates();
		addBonus();
	};
	
	var activateBonus = function() {
		if(my.speed === 1)
		{
			my.speed = -1;
		}
		else if(my.width === 1)
		{
			my.width  = -1;
		}
		else if(my.oneColor === 1)
		{
			my.oneColor = -1;
		}
	}
	
	var checkBonus = function() {
		if(my.speed === 1 || my.width === 1 || my.oneColor ===1) {
			activateBonus();
		}
	}
	that.init = init;
	that.setBonusType = setBonusType;
	that.setCoordinates = setCoordinates;
	that.addBonus = addBonus;
	that.loadBonus = loadBonus;
	that.activateBonus = activateBonus;
	that.checkBonus = checkBonus;
	return that;
};
