Star = function() {
  this.mesh = new THREE.Object3D();
  this.mesh.name = "cloud";
  var geom = new THREE.BoxGeometry(20,20,20, 1, 1, 1);
  var mat = new THREE.MeshPhongMaterial({
    color:Colors.gold,
  });
  var m = new THREE.Mesh(geom.clone(), mat);
  m.position.set(0, 0, 0);
  this.mesh.add(m);
}

Field = function() {
  this.mesh = new THREE.Object3D();
  this.n = 2;
  this.stars = [];
  for(var i=0; i<this.n; i++){
    var s = new Star();
    this.stars.push(s);
    this.mesh.add(s.mesh);
  }
}