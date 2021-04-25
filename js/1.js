
var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
};

var Controls = {
  xSpeed: 1
}

window.addEventListener('load', init, false);

function init() {
    createScene();
    createLights();
    createPlane();
    // createSky();
    document.addEventListener('keypress', takeInput, false);
    
    gameloop();
}

var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;

function createScene() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}

var hemiLight, shadowLight;

function createLights() {
    hemiLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemiLight);
    scene.add(shadowLight);
}

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

var plane;
function createPlane() {
  plane = new Plane();
  plane.mesh.scale.set(0.25, 0.25, 0.25);
  plane.mesh.position.y = 100;
  scene.add(plane.mesh);
}

function takeInput(event) {
  console.log(event.key);
  if (event.key == "a") 
    plane.mesh.position.x -= Controls.xSpeed;
    // if (e.keyCode == 38) 
    //   scene.children[1].position.y += 0.2;
    // if (e.keyCode == 39) 
    //   scene.children[1].position.x += 0.2;
    // if (e.keyCode == 40) 
    //   scene.children[1].position.y -= 0.2;
    // plane.mesh.position.x -=
}


function gameloop() {
  plane.propeller.rotation.x += 0.3;
  renderer.render(scene, camera);
  requestAnimationFrame(gameloop);
}