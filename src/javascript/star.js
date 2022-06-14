Star = function() {
	var geom = new THREE.OctahedronGeometry(10);
	var mat = new THREE.MeshPhongMaterial({
		color:Colors.gold,
		shininess:100,
		specular:0xffffff,
		shading:THREE.FlatShading
	});
	this.mesh = new THREE.Mesh(geom, mat);
	this.mesh.castShadow = true;
	this.angle = 0;
	this.dist = 0;
}

Field = function(n) {
	this.mesh = new THREE.Object3D();
	this.starsActivated = [];
	this.stars = [];
	for(let i=0; i <n; i++){
		let s = new Star();
		this.stars.push(s);
	}
}

Field.prototype.spawnStars = function() {
    let nstars = 1 + Math.floor(Math.random()*10);
    for (let index = 0; index < nstars; index++) {
		let star;
		if (this.stars.length)
			star = this.stars.pop();
		else
			star = new Star();
		this.mesh.add(star.mesh);
		this.starsActivated.push(star);
		star.angle = -0.02 * index;
		let sign = Math.random() < 0.5 ? -1 : 1;
		star.mesh.position.y =  HEIGHT/4 + sign * HEIGHT * Math.cos(Math.random())/8;
		sign = Math.random() < 0.5 ? -1 : 1;
		star.mesh.position.x =  sign * Math.sin(Math.random())*WIDTH/2 ;
    }
}

function createStars() {
	starField = new Field(2);
	scene.add(starField.mesh);
}


Field.prototype.motion = function(speed=0) {
  let deleted = [];
  for (let index = 0; index < this.starsActivated.length; index++) {
		let star = this.starsActivated[index];
		star.mesh.translateX(speed);
		let dvec = plane.mesh.position.clone().sub(star.mesh.position.clone());
		let distance = dvec.length();
		if (distance < Controls.collisionDistance) {
			deleted.push(index);
			this.mesh.remove(star.mesh);
			increaseScore();
		} 
	}
	for (let index = deleted.length-1; index >= 0; index--) {
		this.starsActivated.splice(deleted[index], 1);
	}
}