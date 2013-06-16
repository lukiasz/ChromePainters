var chromePainters = chromePainters || {};

chromePainters.collisionManager = function(spec) {
    var that = {};
    var my = {};

    my.paintersManager = spec.paintersManager;
    my.gridSize = spec.gridSize;
    my.bonus = spec.bonus;
    var init = function() {


    };

    var bonusCollision = function(spec) {
        var painters = my.paintersManager.getPainters();
        for( var i = 0; i < my.paintersManager.getPaintersCount(); i++) {

        }

    };

    var paintersCollision = function(spec) {
        var painters = my.paintersManager.getPainters();
        for( var i = 0; i < my.paintersManager.getPaintersCount()-1; i++) {
            for( var j = i+1; j < my.paintersManager.getPaintersCount(); j++) {
                var vect1 = new THREE.Vector3(painters[i].collisionSphere.center.x, painters[i].collisionSphere.center.y, painters[i].collisionSphere.center.z );
                var vect2 = new THREE.Vector3(painters[j].collisionSphere.center.x, painters[j].collisionSphere.center.y, painters[j].collisionSphere.center.z );
                vect1.subVectors(vect1, vect2);
                var dist = painters[i].collisionSphere.radius + painters[j].collisionSphere.radius;
                if(vect1.length() < dist) {
                    painters[j].knockback(vect1);
                    painters[i].knockback(vect1.negate());
                }
            }
        }
    };

    var wallCollision = function(spec) {
        var painters = my.paintersManager.getPainters();
        for( var i = 0; i < my.paintersManager.getPaintersCount(); i++) {
            if(painters[i].collisionSphere.center.x + painters[i].collisionSphere.radius > my.gridSize/2)
                painters[i].knockback(new THREE.Vector3(1,0,0));
            if(painters[i].collisionSphere.center.z + painters[i].collisionSphere.radius > my.gridSize/2)
                painters[i].knockback(new THREE.Vector3(0,0,1));
            if(painters[i].collisionSphere.center.x - painters[i].collisionSphere.radius < -my.gridSize/2)
                painters[i].knockback(new THREE.Vector3(-1,0,0));
            if(painters[i].collisionSphere.center.z - painters[i].collisionSphere.radius < -my.gridSize/2)
                painters[i].knockback(new THREE.Vector3(0,0,-1));
        }
    };

    var collision = function() {
        wallCollision();
        paintersCollision();
        bonusCollision();
    }



    that.bonusCollision = bonusCollision;
    that.paintersCollision = paintersCollision;
    that.wallCollision = wallCollision;
    that.init = init;

    that.collision = collision;

    return that;
}