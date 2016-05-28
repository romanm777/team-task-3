
$(document).ready(function () {
  var game = new Game();

  document.body.onkeydown = function (e) {
    game.onKeyDown(e);
  }

  document.body.onkeyup = function () {
    game.onKeyUp();
  }
});


//////////////////////////////////////////////////////
// 		Functionality

// Represents battle city game

var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40,
    KEYCODE_SPACE = 32,
    KEYCODE_ENTER = 13;

function Game() {
  $(document.body).css({
    // "display": "flex",
    // "justify-content": "center",
    "background-color": "orange"
  });

  this._battlefield = new Battlefield(700, 700);
  var pos = this._battlefield.getStartPosition(TANK_DIMS.WIDTH, TANK_DIMS.HEIGHT);

  // init position and // callback to check if move is possible
  this._tank = new Tank(pos, this._battlefield);
}

Game.prototype.onKeyDown = function (e) {
  if (e.keyCode == KEYCODE_LEFT) {
    this._tank.move(DIRECTION.LEFT);
    // rotate(tank, DIRECTION.LEFT);
    // move(tank, DIRECTION.LEFT);
    // tank.css("left", function(index) {
    //   return (parseInt(tank.css("left")) - 10) + 'px';
    // });
  }
  else if (e.keyCode == KEYCODE_RIGHT) {
    this._tank.move(DIRECTION.RIGHT);
    // rotate(tank, DIRECTION.RIGHT);
    // move(tank, DIRECTION.RIGHT);
  	// tank.style.left = (parseInt(tank.style.left) + 10) + 'px';
  }
  else if (e.keyCode == KEYCODE_UP) {
    this._tank.move(DIRECTION.UP);
    // rotate(tank, DIRECTION.UP);
    // move(tank, DIRECTION.UP);
    // tank.style.top = (parseInt(tank.style.top) - 10) + 'px';
  }
  else if (e.keyCode == KEYCODE_DOWN) {
    this._tank.move(DIRECTION.DOWN);
    // rotate(tank, DIRECTION.DOWN);
    // move(tank, DIRECTION.DOWN);
    // tank.style.top = (parseInt(tank.style.top) + 10) + 'px';
  }
}

Game.prototype.onKeyUp = function () {
  //var tank = $("#tank");

  // var curDir = tankObj.getDir();
  // tank.css({'background-image' : curDir.staticPic});
}
