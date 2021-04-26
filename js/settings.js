var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
  gold:0xffd700
};

var Controls = {
  xSpeed: 5,
  radius: 600,
  defaultHeight: 100,
  bottomHeight: 80,
  starSpeed: 0.5,
  collisionDistance: 15,
  score: 0,
  paused: false,
}

var current = 0;
var previous = new Date().getTime();
var deltaTime = 0;
var distance = 0;
var planeX = 0;
var planeY = 0;
var planeSpeed = 0;
var gameSpeed = 0;