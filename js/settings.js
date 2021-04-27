var Colors = {
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

var Controls = {
  xSpeed: 3,
  radius: 600,
  defaultHeight: 100,
  bottomHeight: 80,
  starSpeed: 0.5,
  collisionDistance: 10,
  score: 0,
  paused: false,
  lives: 5,
  bulletSize:5
}

var current = 0;
var previous = new Date().getTime();
var starTime = new Date().getTime();
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
