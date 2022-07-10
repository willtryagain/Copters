Enemy = function() {
    // detail increased number of vertices
    var geometry = new THREE.TetrahedronGeometry(8, 2);
    var material = new THREE.MeshPhongMaterial({
        color: 0x888c8d,
        shading: THREE.FlatShading 
    });
    this.mesh = new THREE.Mesh(geometry, material);
}

EnemyFleet = function() {
    this.mesh = new THREE.Object3D();
    this.activeList = [];
}

// , all functions have a property named prototype. 
EnemyFleet.prototype.spawnEnemies = function() {
    let count = 2;
    for (let index = 0; index < count; index++) {
        // if (enemies.length)
        //     var enemy = enemies.pop();
        // else
            let enemy = new Enemy();
        let sign = Math.random() < 0.5 ? -1 : 1;
            
        enemy.mesh.position.y = plane.mesh.position.y + sign * HEIGHT * Math.cos(Math.random())/16;
        if (Math.random() < 0.1)
            enemy.mesh.position.y = plane.mesh.position.y + sign * HEIGHT * Math.cos(Math.random())/100;

        sign = Math.random() < 0.5 ? -1 : 1;
        enemy.mesh.position.x = 20 +  Math.sin(Math.random())*WIDTH/4 ;

        this.mesh.add(enemy.mesh);
        this.activeList.push(enemy);
    }
}

function createEnemies() {
	// for (let index = 0; index < 2; index++) {
	// 	var enemy = new Enemy();
	// 	enemies.push(enemy);
	// }
	enemyFleet = new EnemyFleet();
	scene.add(enemyFleet.mesh);
}

EnemyFleet.prototype.motion = function(speed=-Math.log( Math.max(new Date().getTime() - initTime)/1000, 2)) {
    var deleted = [];
    for (let index = 0; index < this.activeList.length; index++) {
        var enemy = this.activeList[index];
        var dvec = plane.mesh.position.clone().sub(enemy.mesh.position.clone());
        enemy.mesh.translateX(speed);
        var distance = dvec.length();
        if (distance < Controls.collisionDistance) {
            deleted.push(index);
            this.mesh.remove(enemy.mesh);
            decreaseLives();
            break;
        } else {
            for (let bulletIndex = 0; bulletIndex < plasmaBalls.length; bulletIndex++) {
                const ball = plasmaBalls[bulletIndex];
                dvec = ball.position.clone().sub(enemy.mesh.position.clone());
                distance = dvec.length();
                if (distance < 10) {
                    increaseScore(false);
                    deleted.push(index);
                    this.mesh.remove(enemy.mesh);
                    break;
                } 
            }
        }
    }
    for (let index = deleted.length-1; index >= 0; index--) {
        var enemy = this.activeList[deleted[index]];
        this.activeList.splice(deleted[index], 1);
    }
}
// threejs alav