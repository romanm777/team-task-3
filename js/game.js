$(document).ready(function () {
  var game = new Game();

  document.body.onkeydown = function (e) {
    game.onKeyDown(e);
  }

  document.body.onkeyup = function (e) {
    game.onKeyUp(e);
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
    "background-color": "grey"
  });

  this._battlefield = new Battlefield(700, 700);
  var pos = this._battlefield.getStartPosition(TANK_DIMS.WIDTH, TANK_DIMS.HEIGHT);

  // init position and // callback to check if move is possible
  this._tank = new Tank(pos, this._battlefield);
}

Game.prototype.onKeyDown = function (e) {
  if (e.keyCode == KEYCODE_LEFT) {
    this._tank.move(DIRECTION.LEFT);
  }
  else if (e.keyCode == KEYCODE_RIGHT) {
    this._tank.move(DIRECTION.RIGHT);
  }
  else if (e.keyCode == KEYCODE_UP) {
    this._tank.move(DIRECTION.UP);
  }
  else if (e.keyCode == KEYCODE_DOWN) {
    this._tank.move(DIRECTION.DOWN);
  }
}

Game.prototype.onKeyUp = function (e) {
  if (e.keyCode == KEYCODE_LEFT) {
    this._tank.stopMove(DIRECTION.LEFT);
  }
  else if (e.keyCode == KEYCODE_RIGHT) {
    this._tank.stopMove(DIRECTION.RIGHT);
  }
  else if (e.keyCode == KEYCODE_UP) {
    this._tank.stopMove(DIRECTION.UP);
  }
  else if (e.keyCode == KEYCODE_DOWN) {
    this._tank.stopMove(DIRECTION.DOWN);
  }
}
