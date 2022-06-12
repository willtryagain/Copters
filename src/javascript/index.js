// TODO: add defition for the vars
var currentTime = 0;
var previousTime = new Date().getTime();
var initTime = new Date().getTime();
var deltaTime = 0;
var distance = 0;
var planeX = 0;
var planeY = 0;
var curPlaneX = 0;
var curPlaneY = 0;
var planeSpeed = 0;
var gameSpeed = 0;
var prevDistance = 0;
var enemies = [];
var prevEnemyDistance=  0;
var plasmaBalls = [];
var health_field;
var score_field;
var mode = "";
var fallSpeed = 0.001;
var prevIndex = -1;
var prevShotTime =  new Date().getTime();
var keyMap = [];
var plane;
var starField;
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;
var Controls = {
	xSpeed: 3,
	radius: 600,
	defaultHeight: 100,
	bottomHeight: 80,
	starSpeed: 0.5,
	collisionDistance: 10,
	score: 0,
	paused: false,
	over: false,
	lives: 1,
	bulletSize:2
}
const Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
	gold:0xffd700,
	cockpit:0x484848,
	metal:0x181818
};
var KeyControl = {
	"left": 'a',
	"right": 'd',
	"up": 'w',
	"down": 's',
	"fire": ' '
};

// window listener
window.addEventListener(
	'load', 
	function() {
		health_field = document.getElementById("health_val");
		score_field = document.getElementById("score_val");
		document.addEventListener('keypress', takeInput, false);
		createScene();
		createLights();
		createPlane();
		createStars();
		createEnemies();
		gameloop();
	}, 
	false
);
window.addEventListener('keydown', (e)=>{
	if(!keyMap.includes(e.key)){
		keyMap.push(e.key);
	}
})
window.addEventListener('keyup', (e)=>{
	if(keyMap.includes(e.key)){
		keyMap.splice(keyMap.indexOf(e.key), 1);
	}
})

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

function takeInput(event) {
	if (Controls.paused)
		return;
	if (keyMap.includes(KeyControl["left"])) {
		starField.motion(Controls.xSpeed);
		curPlaneX -= Controls.xSpeed;
		enemyFleet.motion(Controls.xSpeed);
	}
	if (keyMap.includes(KeyControl["right"])) {
		starField.motion(-Controls.xSpeed);
		enemyFleet.motion(-Controls.xSpeed);
		curPlaneX += Controls.xSpeed;
	} 
	if (keyMap.includes(KeyControl["up"])) 
		plane.mesh.position.y += Controls.xSpeed;
	if (keyMap.includes(KeyControl["down"])) 
		plane.mesh.position.y -= Controls.xSpeed;
	if (keyMap.includes(KeyControl["fire"])) {
		let curTime =  new Date().getTime();
		if (curTime - prevShotTime < 100) return;
		prevShotTime = curTime;
		let plasmaBall = new THREE.Mesh(
			new THREE.SphereGeometry(Controls.bulletSize, Controls.bulletSize, Controls.bulletSize), 
			new THREE.MeshBasicMaterial({
			color: Colors.brown,
		}));
		plasmaBall.position.copy(plane.mesh.position); // start position - the tip of the weapon
		plasmaBall.quaternion.copy(camera.quaternion); // apply camera's quaternion
		scene.add(plasmaBall);
		plasmaBalls.push(plasmaBall);
	}
}

function increaseScore(star=true) {
	if (star)
		Controls.score += 10;
	else
		Controls.score += 50;
	score_field.innerHTML = Controls.score;
}

function decreaseLives() {
	// ? Add tests
	// TODO: assert life non negative
	Controls.lives -= 1;
	health_field.innerHTML = Controls.lives;
	if (Controls.lives == 0) {
		Controls.paused = true;
		Controls.over = true;
	}
}

function increaseDistance() {
	distance += gameSpeed * deltaTime/1000;
}

function gameloop() {
	currentTime = new Date().getTime();
	deltaTime = currentTime - previousTime;
	previousTime = currentTime;
	// * * control number of objs
  	if (!Controls.paused) {
		if (Math.floor(distance) % 100 == 0 && distance != prevDistance)  {
			starField.spawnStars();
			prevDistance = distance;
		}
		if (Math.floor(distance) % 200 == 0 && distance != prevEnemyDistance)  {
			enemyFleet.spawnEnemies();
			prevEnemyDistance = distance;
		}
		plasmaBalls.forEach(b => {
			b.translateX(5* 1); // move along the local z-axis
		});
		starField.motion(-Controls.xSpeed);
		increaseDistance();
		updatePlane();
	}
	else if (Controls.over) {
		plane.mesh.rotation.z += (-Math.PI/2 - plane.mesh.rotation.z) * 2 * deltaTime / 1000;
		plane.mesh.rotation.x += 3 * deltaTime/1000;
		fallSpeed *= 1.05;
		plane.mesh.position.y -=  fallSpeed * deltaTime;
		status_field =  document.getElementById("status");
		var highscore = localStorage.getItem("highscore");
		if(highscore !== null){
			if (Controls.score > highscore) 
				localStorage.setItem("highscore", Controls.score);      
		}
		else
			localStorage.setItem("highscore", Controls.score);
		
		status_field.innerHTML = "High Score " + highscore; 
	}
	if (!Controls.paused)
		enemyFleet.motion();
	starField.motion();
	plane.propeller.rotation.y += 0.3;
	renderer.render(scene, camera);
	//  requests that the browser calls a specified function to update an animation before the next repaint
	requestAnimationFrame(gameloop);
}