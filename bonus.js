var chromePainters = chromePainters || {};

chromePainters.bonus = function(spec) {
	var that = {};
	var my = {};
	
	my.xpos = spec.xpos || 0;
	my.ypos = spec.ypos || 0;
	my.color = spec.color || 0x000000;
	that.speed = spec.speed || 0;
	that.width = spec.width || 0;
	that.oneColor = spec.oneColor || 0;
	that.stopOthers = spec.stopOthers || 0;
	my.scene = spec.scene;
	my.gridSizeX = spec.gridSizeX;
	my.gridSizeY = spec.gridSizeY;
	
	var init = function() {
	var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = false;

		loader.load('./models/gift.dae', function (collada) {
			my.bonus = collada.scene;
			//my.bonus.doublesided = true;
			my.bonus.scale.x = my.bonus.scale.y = my.bonus.scale.z = 12;
			my.bonus.position.set(50, 15, 50);
			my.bonus.material = new THREE.MeshPhongMaterial();
			my.bonus.material.side = THREE.DoubleSide;
			my.bonus.updateMatrix();
		});
	};
	
	var setBonusType = function() {
		var BonusType = parseInt((Math.random()*10) % 4);
		while(1)
		{
			if(BonusType === 0)
			{
				if(that.speed != -100) {
					that.speed = 1;
					my.color = new THREE.Color().setHex(0x00FF00);
					break;
				}
				else {
					BonusType++;
				}
			}
			if(BonusType === 1)
			{
				if(that.width != -100) {
					that.width  = 1;
					my.color = new THREE.Color().setHex(0xFF0000);
					break;
				}
				else {
					BonusType++;
				}
			}
			if(BonusType === 2)
			{
				if(that.oneColor != -100) {
					that.oneColor = 1;
					my.color = new THREE.Color().setHex(0x0000FF);
					break;
				}
				else {
					BonusType++;
				}
			}
			if(BonusType === 3)
			{
				if(that.stopOthers != -100) {
					that.stopOthers = 1;
					my.color = new THREE.Color().setHex(0xFF00FF);
					break;
				}
				else {
					BonusType=0;
				}
			}
		}

	};
	
	var  setCoordinates = function() {
		my.xpos = (Math.random()*1000) % my.gridSizeX-my.gridSizeX/2;
		my.ypos = (Math.random()*1000) % my.gridSizeY-my.gridSizeY/2;
		my.bonus.position.set(my.xpos, 15, my.ypos);
	};

	var addBonus = function() {
		my.scene.add(my.bonus);
	};
	
	var removeBonus = function() {
		my.scene.remove(my.bonus);
	};
	var loadBonus = function() {
		setBonusType();
		setCoordinates();
		addBonus();
	};
	
	var activateBonus = function() {	//funkcja wywo�ywana po zebraniu bonusu
		if(that.speed === 1)
		{
			that.speed = -1;
		}
		else if(that.width === 1)
		{
			that.width  = -1;
		}
		else if(that.oneColor === 1)
		{
			that.oneColor = -1;
		}
		else if(that.stopOthers === 1)
		{
			that.stopOthers = -1;
		}
	};
	
	var deactivateBonus = function() {
		if(that.speed === 1 || that.speed === -1) {	//mo�na te� nie zebra� bonusu
			that.speed = -100;
		}
		else if(that.width === 1 || that.width === -1) {	
			that.width = -100;
		}
		else if(that.oneColor === 1 || that.oneColor === -1) {	
			that.oneColor = -100;
		}
		else if(that.stopOthers === 1 || that.stopOthers === -1) {	
			that.stopOthers = -100;
		}
	};
	
	var checkBonus = function() {
		if(that.speed === 1 || that.width === 1 || that.oneColor === 1 || that.stopOthers === 1) {
			activateBonus();
		}
	};

    var getPosition = function() {
        return new THREE.Vector3(my.xpos, 19, my.ypos);
    }
	
	that.init = init;
	that.setBonusType = setBonusType;
	that.setCoordinates = setCoordinates;
	that.addBonus = addBonus;
	that.loadBonus = loadBonus;
	that.activateBonus = activateBonus;
	that.checkBonus = checkBonus;
	that.removeBonus = removeBonus;
	that.deactivateBonus = deactivateBonus;
    that.getPosition = getPosition;

	return that;
};
