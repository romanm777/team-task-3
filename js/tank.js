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

Tank.prototype.turn = function (dir) {
  var oldDir = this._dir;
  this._dir = dir;

//var dirData = this.directionData();
//this._tank.css('background-image', dirData.staticPic);
}

Tank.prototype.getDir = function () {
  return this._dir;
}

Tank.prototype.move = function (dir) {
  var oldDir = this._dir;

  // turns tank
  this.turn(dir);

  // if tank has turned - return
  if(dir != oldDir)
    return;

  var dirStr,
      moveDist = 5;

  switch (dir) {
    case DIRECTION.UP:
      dirStr = "top";
      moveDist *= -1;
      break;
    case DIRECTION.RIGHT:
      dirStr = "left";
      break;
    case DIRECTION.DOWN:
      dirStr = "top";
      break;
    case DIRECTION.LEFT:
      dirStr = "left";
      moveDist *= -1;
      break;
    default:
      dirStr = "top"
  }
};

Tank.prototype._calcTurn = function (oldDir, dir) {
  var turnCoef = dir - oldDir;

  // 0
  if(oldDir == 0 && dir == 3) {
    turnCoef = -1;
  }
  else if(oldDir == 0 && dir == -3) {
    turnCoef = 1;
  }

  // 1
  if(oldDir == 1) {
    switch (dir) {
      case 0:
        turnCoef = -0;
        break;
      case 1:
        turnCoef = 1;
        break;
      case 2:
        turnCoef = 2;
        break;
      case 3:
        turnCoef = -1;
        break;
      default:

    }
  }


  return 90 * turnCoef;
}
