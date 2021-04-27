Enemy = function() {
    var geometry = new THREE.TetrahedronGeometry(8, 2);
    var material = new THREE.MeshPhongMaterial({
        color: Colors.red,
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
    var count = 5;
    for (let index = 0; index < count; index++) {
        if (enemies.length)
            var enemy = enemies.pop();
        else
            var enemy = new Enemy();
        enemy.angle = -(index*0.1);
        var sign = Math.random() < 0.5 ? -1 : 1;
        enemy.mesh.position.y =  HEIGHT/4 + sign * HEIGHT * Math.cos(Math.random())/8;
        sign = Math.random() < 0.5 ? -1 : 1;
        enemy.mesh.position.x =  sign * Math.sin(Math.random())*WIDTH/2 ;
        this.mesh.add(enemy.mesh);
        this.activeList.push(enemy);
    }
}

EnemyFleet.prototype.motion = function() {
    var deleted = [];
    for (let index = 0; index < this.activeList.length; index++) {
        var enemy = this.activeList[index];
        enemy.angle += gameSpeed * deltaTime * 0.06*Math.cos(Math.random());
        if (enemy.angle > Math.PI*2) 
            enemy.angle -= Math.PI*2;
            enemy.mesh.translateX(-gameSpeed/10);
        var dvec = plane.mesh.position.clone().sub(enemy.mesh.position.clone());
        var distance = dvec.length();
        
        if (distance < Controls.collisionDistance) {
            deleted.push(index);
            this.mesh.remove(enemy.mesh);
            console.log("enemy d", distance);
            // ambientLight.intensity = 2;
            decreaseLives();
            // test i--;
        } else {
            for (let index = 0; index < plasmaBalls.length; index++) {
                const ball = plasmaBalls[index];
                dvec = ball.position.clone().sub(enemy.mesh.position.clone());
                distance = dvec.length();
                if (distance < 10 && !enemy.deleted) {
                    increaseScore(false);
                    enemy.deleted = true;
                    deleted.push(index);
                    this.mesh.remove(enemy.mesh);
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
        this.activeList.splice(deleted[index], 1);
    }
}