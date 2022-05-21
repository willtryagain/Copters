Enemy = function() {
    var geometry = new THREE.TetrahedronGeometry(8, 2);
    var material = new THREE.MeshPhongMaterial({
        color: 0x888c8d,
        shading: THREE.FlatShading 
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.angle = 0;
    this.ditance = 0;
}

EnemyFleet = function() {
    this.mesh = new THREE.Object3D();
    this.activeList = [];
}

EnemyFleet.prototype.spawnEnemies = function() {
    var count = 2;
    // if (this.activeList.length >= count)
    //     return;
    for (let index = 0; index < count; index++) {
        if (enemies.length)
            var enemy = enemies.pop();
        else
            var enemy = new Enemy();
        enemy.angle = -(index*0.1);
        var sign = Math.random() < 0.5 ? -1 : 1;
            
        enemy.mesh.position.y = plane.mesh.position.y + sign * HEIGHT * Math.cos(Math.random())/16;
        if (Math.random() < 0.01)
            enemy.mesh.position.y = plane.mesh.position.y + sign * HEIGHT * Math.cos(Math.random())/64;

        sign = Math.random() < 0.5 ? -1 : 1;
        enemy.mesh.position.x = 20 +  Math.sin(Math.random())*WIDTH/4 ;

        this.mesh.add(enemy.mesh);
        this.activeList.push(enemy);
    }
}


EnemyFleet.prototype.motion = function(speed=-getSpeed()) {
    var deleted = [];
    for (let index = 0; index < this.activeList.length; index++) {
        var enemy = this.activeList[index];
        enemy.angle += gameSpeed * deltaTime * 0.06*Math.cos(Math.random());
        if (enemy.angle > Math.PI*2) 
            enemy.angle -= Math.PI*2;
        
        var dvec = plane.mesh.position.clone().sub(enemy.mesh.position.clone());
        console.log(speed);
        enemy.mesh.translateX(speed);
        var distance = dvec.length();
        
        var obj = this.mesh.getObjectByProperty()


        if (distance < Controls.collisionDistance) {
            deleted.push(index);
            // this.activeList[index].deleted = true;
            this.mesh.remove(enemy.mesh);
            if (index != prevIndex) {
                decreaseLives();
                prevIndex = index;
            }
           

            // ambientLight.intensity = 2;
            
            break;
            // test i--;
        } else {
            for (let index = 0; index < plasmaBalls.length; index++) {
                const ball = plasmaBalls[index];
                dvec = ball.position.clone().sub(enemy.mesh.position.clone());
                distance = dvec.length();
                if (distance < 10) {
                    increaseScore(false);
                    enemy.deleted = true;
                    deleted.push(index);
                    this.mesh.remove(enemy.mesh);
                    // this.activeList[index].deleted = true;
                    // ambientLight.intensity = 2;
                    // decreaseLives();
                    // test i--;
                    break;
                } 
                
            }
        }
        // else if (enemy.angle > Math.PI)
        //     this.mesh.remove(enemy.mesh);
    }
    for (let index = deleted.length-1; index >= 0; index--) {
        var enemy = this.activeList[deleted[index]];
        this.mesh.remove(enemy);
        this.activeList.splice(deleted[index], 1);
    }
   
}