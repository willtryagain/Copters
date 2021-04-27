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
        enemy.mesh.position.y = Math.cos(Math.random())*HEIGHT/2;
        enemy.mesh.position.x =  Math.sin(Math.random())*WIDTH/2 ;
        this.mesh.add(enemy.mesh);
        this.activeList.push(enemy);
    }
}

EnemyFleet.prototype.motion = function() {
    for (let index = 0; index < this.activeList.length; index++) {
        var enemy = this.activeList[index];
        enemy.angle += gameSpeed * deltaTime * 0.06*Math.cos(Math.random());
        if (enemy.angle > Math.PI*2) 
            enemy.angle -= Math.PI*2;
        enemy.mesh.rotation.z += Math.random() * .1;
        enemy.mesh.rotation.y += Math.random() * .1;
        var dvec = plane.mesh.position.clone().sub(enemy.mesh.position.clone());
        var distance = dvec.length();
        
        if (distance < Controls.collisionDistance) {
            this.mesh.remove(enemy.mesh);
            console.log("enemy d", distance);
            // ambientLight.intensity = 2;
            decreaseLives();
            // test i--;
        } 


        for (let index = 0; index < plasmaBalls.length; index++) {
            const ball = plasmaBalls[index];
            dvec = ball.position.clone().sub(enemy.mesh.position.clone());
            distance = dvec.length();
            if (distance < 10) {
                this.mesh.remove(enemy.mesh);
                console.log("hit d", distance);
                // ambientLight.intensity = 2;
                // decreaseLives();
                // test i--;
                break;
            } 
            
        }




        // else if (enemy.angle > Math.PI)
        //     this.mesh.remove(enemy.mesh);
    }
}