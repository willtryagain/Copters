
var Plane = function() {
	this.mesh = new THREE.Object3D();
	var cockpitGeometry = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
	var cockpitMat = new THREE.MeshPhongMaterial({color: Colors.cockpit, shading: THREE.FlatShading});
	var cockpit = new THREE.Mesh(cockpitGeometry, cockpitMat);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	cockpit.position.set(15, 0, 0);
	this.mesh.add(cockpit);
  
	var engineGeometry = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
	var engineMat = new THREE.MeshPhongMaterial({color: Colors.metal, shading: THREE.FlatShading});
	var engine = new THREE.Mesh(engineGeometry, engineMat);
	engine.position.x = 40;
	engine.castShadow = true;
	engine.receiveShadow = true;
  
	var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
	var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.metal, shading:THREE.FlatSObject3dhading});
	var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-60,25,0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);
  
	var barGeometry = new THREE.BoxGeometry(130,8,8,1,1,1);
	var wingMat = new THREE.MeshPhongMaterial({color:Colors.metal, shading:THREE.FlatShading});
	var wing = new THREE.Mesh(barGeometry, wingMat);
	wing.castShadow = true;
	wing.position.set(-10, 10, 0)
	wing.receiveShadow = true;
	this.mesh.add(wing);
  
	var propellerGeometry = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
	var propellerMat = new THREE.MeshPhongMaterial({color:Colors.metal, shading:THREE.FlatShading});
	this.propeller = new THREE.Mesh(propellerGeometry, propellerMat);
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;
  
	var bladeGeometry = new THREE.BoxGeometry(140,1,20,1,1,1);
	var bladeMat = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
  
	var blade = new THREE.Mesh(bladeGeometry, bladeMat);
	blade.position.set(8, 0, 0);
	blade.castShadow = true;
	blade.receiveShadow = true;
	this.propeller.add(blade);
	this.propeller.position.set(40, 30, 0);
	this.mesh.add(this.propeller);
}

function createPlane() {
	plane = new Plane();
	plane.mesh.scale.set(0.25, 0.25, 0.25);
	plane.mesh.position.set(0, HEIGHT/10, 0);
	scene.add(plane.mesh);
}
  

function updatePlane() {
	var deltaX  = Math.abs(curPlaneX - planeX);
	var deltaY  = Math.abs(curPlaneY - planeY);
	planeSpeed = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
	planeX = curPlaneX;
	planeY = curPlaneY;
	gameSpeed = Math.max(gameSpeed, planeSpeed * 10);
} 