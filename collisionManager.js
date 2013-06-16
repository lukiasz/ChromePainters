var chromePainters = chromePainters || {};

chromePainters.collisionManager = function(spec) {
    var that = {};
    var my = {};

    my.paintersManager = spec.paintersManager;
    my.gridSize = spec.gridSize;
    my.bonus = spec.bonus;
    my.audioManager = spec.audioManager;
    var init = function() {


    };

    var bonusCollision = function() {
        var painters = my.paintersManager.getPainters();
        var bonusVect = my.bonus.getPosition();
        var distVect = new THREE.Vector3(0,0,0);
        for( var i = 0; i < my.paintersManager.getPaintersCount(); i++) {
            distVect.subVectors(bonusVect,painters[i].collisionSphere.center);
            var lenghttt = distVect.length();
            if (lenghttt < 20) {
                my.audioManager.playBonusSound();
                painters[i].setHasBonus(true);
                return i;
            }

        }
        return -1;
    };

    var paintersCollision = function() {
        var painters = my.paintersManager.getPainters();
        for( var i = 0; i < my.paintersManager.getPaintersCount()-1; i++) {
            for( var j = i+1; j < my.paintersManager.getPaintersCount(); j++) {
                var vect1 = new THREE.Vector3(painters[i].collisionSphere.center.x, painters[i].collisionSphere.center.y, painters[i].collisionSphere.center.z );
                var vect2 = new THREE.Vector3(painters[j].collisionSphere.center.x, painters[j].collisionSphere.center.y, painters[j].collisionSphere.center.z );
                vect1.subVectors(vect1, vect2);
                var dist = painters[i].collisionSphere.radius + painters[j].collisionSphere.radius;
                if(vect1.length() < dist) {
                    my.audioManager.playCollisionSound();
                    if( painters[i].getHasBonus() || painters[j].getHasBonus() ) {
                        my.bonus.deactivateBonus();
                        painters[i].setHasBonus(false);
                    }
                    painters[j].knockback(vect1);
                    painters[i].knockback(vect1.negate());
                }
            }
        }
    };

    var wallCollision = function() {
        var painters = my.paintersManager.getPainters();
        for( var i = 0; i < my.paintersManager.getPaintersCount(); i++) {
            var dist;

            dist = (painters[i].collisionSphere.center.x + painters[i].collisionSphere.radius) - my.gridSize/2;
            if (dist > 0)
                painters[i].knockback(new THREE.Vector3(dist,0,0));

            dist = (painters[i].collisionSphere.center.z + painters[i].collisionSphere.radius) - my.gridSize/2;
            if (dist > 0)
                painters[i].knockback(new THREE.Vector3(0,0,dist));

            dist = (painters[i].collisionSphere.center.x - painters[i].collisionSphere.radius) + my.gridSize/2  ;
            if (dist < 0)
                painters[i].knockback(new THREE.Vector3(dist,0,0));

            dist = (painters[i].collisionSphere.center.z - painters[i].collisionSphere.radius) + my.gridSize/2  ;
            if (dist < 0)
                painters[i].knockback(new THREE.Vector3(0,0,dist));
        }
    };

    var collision = function() {
        wallCollision();
        paintersCollision();
    }



    that.bonusCollision = bonusCollision;
    that.paintersCollision = paintersCollision;
    that.wallCollision = wallCollision;
    that.init = init;

    that.collision = collision;

    return that;
}
