

window.addEventListener('load', init, false);

function init() {
    createScene();
    createLights();
    createPlane();
    createStars();
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
    renderer.setPixelRatio(window.devicePixelRatio); 
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
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
  if (event.key == "d") 
    plane.mesh.position.x += Controls.xSpeed;
  if (event.key == "w") 
    plane.mesh.position.y += Controls.xSpeed;
  if (event.key == "s") 
    plane.mesh.position.y -= Controls.xSpeed;
}

var starField;
function createStars() {
  starField = new Field();
  starField.mesh.position.y = 10;
  scene.add(starField.mesh);
}

function gameloop() {
  plane.propeller.rotation.x += 0.3;
  starField.mesh.position.x -= .1;
  renderer.render(scene, camera);
  requestAnimationFrame(gameloop);
}