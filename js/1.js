

window.addEventListener('load', init, false);

function init() {
    createScene();
    createLights();
    createPlane();
    createStars();
    createEnemies();
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
  if (event.key == "f") {
    let plasmaBall = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), new THREE.MeshBasicMaterial({
      color: Colors.red
    }));
    plasmaBall.position.copy(plane.mesh.position); // start position - the tip of the weapon
    plasmaBall.quaternion.copy(camera.quaternion); // apply camera's quaternion
    scene.add(plasmaBall);
    plasmaBalls.push(plasmaBall);
  }

}

var starField;
function createStars() {
  starField = new Field(2);
  scene.add(starField.mesh);
}

function increaseScore() {
  Controls.score += 10;
}

function decreaseLives() {
  Colors.lives -= 1;
}

function increaseDistance() {
  distance += gameSpeed * deltaTime;
  console.log("gameSpeed", gameSpeed);
  console.log("distance", distance);
}

function createEnemies() {
  for (let index = 0; index < 2; index++) {
    var enemy = new Enemy();
    enemies.push(enemy);
  }
  enemyFleet = new EnemyFleet();
  scene.add(enemyFleet.mesh);
}


function gameloop() {
  current = new Date().getTime();
  deltaTime = current - previous;
  previous = current;

  if (Controls.paused == false) {
    if (Math.floor(distance) % 100 == 0 && distance != prevDistance)  {
      console.log("spawn");
      starField.spawnStars();
      prevDistance = distance;
    }
    if (Math.floor(distance) % 150 == 0 && distance != prevEnemyDistance)  {
      console.log("spawn");
      enemyFleet.spawnEnemies();
      prevEnemyDistance = distance;
    }
    plasmaBalls.forEach(b => {
      b.translateX(5* 1); // move along the local z-axis
      // b.translateZ(-10);
    });
    
    increaseDistance();
    updatePlane();
    
  }

  starField.motion();
  enemyFleet.motion();

  plane.propeller.rotation.x += 0.3;
  renderer.render(scene, camera);






  requestAnimationFrame(gameloop);
}