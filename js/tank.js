// Represents tank object

// tank move directions
var DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
}

// tank dimensions
var TANK_DIMS = {
  WIDTH: 60,
  HEIGHT: 60
}

function Tank(startPos, battlefield) {

  this._dir = DIRECTION.UP;

  this._battlefield = battlefield;
}

Tank.prototype.directionData = function (dir) {
  var data = {};

  switch (dir) {
    case DIRECTION.UP:
      data.staticPic = "url('./img/tank_up.gif')";
      data.movePic = "url('./img/tank_move_up.gif";
      break;
    case DIRECTION.RIGHT:
      data.staticPic = "url('./img/tank_right.gif')";
      data.movePic = "url('./img/tank_move_right.gif')";
      break;
    case DIRECTION.DOWN:
      data.staticPic = "url('./img/tank_down.gif')";
      data.movePic = "url('./img/tank_move_down.gif')";
      break;
    case DIRECTION.LEFT:
      data.staticPic = "url('./img/tank_left.gif')";
      data.movePic = "url('./img/tank_move_left.gif')";
      break;
    default:
      data.staticPic = "url('./img/tank_up.gif')";
      data.movePic = "url('./img/tank_move_down.gif')";
  }

  return data;
}
