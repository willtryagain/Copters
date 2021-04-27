

window.addEventListener('load', init, false);

function init() {

    health_field = document.getElementById("health_val");
    score_field = document.getElementById("score_val");
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
  plane.mesh.position.set(0, HEIGHT/4, 0);

  scene.add(plane.mesh);
}

function takeInput(event) {
  console.log(event.key);

  keys = []


  if (event.key == "a") {
    starField.motion(Controls.xSpeed);
    curPlaneX-= Controls.xSpeed;
    enemyFleet.motion(Controls.xSpeed);
    
  }
    // plane.mesh.position.x -= Controls.xSpeed;
  if (event.key == "d") {
    starField.motion(-Controls.xSpeed);
    curPlaneX= Controls.xSpeed;
    enemyFleet.motion(-Controls.xSpeed);
  } 
   
  if (event.key == "w") 
    plane.mesh.position.y += Controls.xSpeed;
  if (event.key == "s") 
    plane.mesh.position.y -= Controls.xSpeed;
  if (event.key == "f") {
    let plasmaBall = new THREE.Mesh(new THREE.SphereGeometry(Controls.bulletSize, Controls.bulletSize, Controls.bulletSize), new THREE.MeshBasicMaterial({
      color: 0xFFA500
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

function increaseScore(star=true) {
  if (star)
    Controls.score += 10;
  else
    Controls.score += 50;
  score_field.innerHTML = Controls.score;
}

function decreaseLives() {
  Controls.lives -= 1;
  health_field.innerHTML = Controls.lives;

}

function increaseDistance() {
  distance += gameSpeed * deltaTime/1000;
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
    if (Math.floor(distance) % 89 == 0 && distance != prevDistance)  {
      // console.log("spawn");
      starField.spawnStars();
      prevDistance = distance;
    }
    if (Math.floor(distance) % 97 == 0 && distance != prevEnemyDistance)  {
      // console.log("spawn e");
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

  plane.propeller.rotation.y += 0.3;
  renderer.render(scene, camera);






  requestAnimationFrame(gameloop);
}