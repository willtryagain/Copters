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
  for(var i=0; i <n; i++){
    var s = new Star();
    this.stars.push(s);
    // this.mesh.add(s.mesh);
  }
}

Field.prototype.spawnStars = function() {
    var nstars = 1 + Math.floor(Math.random()*10);
    var d = Controls.radius + Controls.defaultHeight + (-1 + Math.random() * 2) * (Controls.bottomHeight - 20);
    var h = 10*Math.random();
    for (let index = 0; index < nstars; index++) {
      var star;
      if (this.stars.length)
        star = this.stars.pop();
      else
        star = new Star();
      this.mesh.add(star.mesh);
      this.starsActivated.push(star);
      star.angle = -0.02 * index;
      star.distance = -d + Math.cos(0.5*index)*(10 + Math.random()*10);
      var sign = Math.random() < 0.5 ? -1 : 1;
      star.mesh.position.y =  Math.cos(Math.random())*HEIGHT/2 * sign;
      sign = Math.random() < 0.5 ? -1 : 1;
      star.mesh.position.x = Math.sin(Math.random())*WIDTH/2 *  sign;
      console.log(star.mesh.position.x, star.mesh.position.y)

    }
}

Field.prototype.motion = function() {
  for (let index = 0; index < this.starsActivated.length; index++) {
      var star = starsActivated[index];
      star.angle += Controls.speed * deltaTime * Controls.starSpeed;
      if (2*star.angle > Math.PI) 
        star.angle -= Math.PI/2;
      star.mesh.position.y = -Controls.radius + Math.sin(star.angle) * star.distance;
      star.mesh.position.x = Math.cos(star.angle) * star.distance;
      star.mesh.rotation.z += Math.random() * .1;
      star.mesh.rotation.y += Math.random() * .1;

      var dvec = plane.mesh.position.clone().sub(star.mesh.position.clone());
      var distance = dvec.length();
      if (distance < Controls.collisionDistance) {
          this.mesh.remove(star.mesh);
          increaseScore();
          // test i--;
      } 
      else if (star.angle > Math.PI)
          this.mesh.remove(star.mesh);

  }
}