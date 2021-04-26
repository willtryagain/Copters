
var Plane = function() {
    this.mesh = new THREE.Object3D();
    var cockpitGeometry = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
    var cockpitMat = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
    var cockpit = new THREE.Mesh(cockpitGeometry, cockpitMat);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
  
    var engineGeometry = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    var engineMat = new THREE.MeshPhongMaterial({color: Colors.white, shading: THREE.FlatShading});
    var engine = new THREE.Mesh(engineGeometry, engineMat);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);
  
    var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
    var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35,25,0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
      this.mesh.add(tailPlane);;
  
    var wingGeometry = new THREE.BoxGeometry(40,8,150,1,1,1);
    var wingMat = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var wing = new THREE.Mesh(wingGeometry, wingMat);
    wing.castShadow = true;
    wing.receiveShadow = true;
    this.mesh.add(wing);
  
    var propellerGeometry = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    var propellerMat = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    this.propeller = new THREE.Mesh(propellerGeometry, propellerMat);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;
  
    var bladeGeometry = new THREE.BoxGeometry(1,100,20,1,1,1);
    var bladeMat = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
  
    var blade = new THREE.Mesh(bladeGeometry, bladeMat);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);
  }
  