////////////////////////////////////////////////////////////////////


function Battlefield(width, height) {
  this._width = width;
  this._height = height;
  //this._walls = new Walls();

  this._left = 200;
  this._top = 50;

  this._walls = [];

  this.makeTestRoads(); // debug
}

Battlefield.prototype.getStartPosition = function (tankWidth, tankHeight) {
  this._tankWidth = tankWidth;
  this._tankHeight = tankHeight;

  var leftPos = this._width / 2 + this._tankWidth / 2;
  var topPos = this._height - this._tankHeight;

  return {
    id: "battlefield",
    left: leftPos,
    top: topPos
  };
}

Battlefield.prototype.canMove = function(leftStr, topStr, dir, offset) {
  var left = parseInt(leftStr);
  var top = parseInt(topStr);

  switch (dir) {
    case DIRECTION.UP:
      var newUp = top + offset;
      if(newUp < 0 || this.checkWalls(left, newUp)) {
        return false;
      }
      break;
    case DIRECTION.RIGHT:
      var newRight = left + this._tankWidth + offset;
      if(newRight > this._width || this.checkWalls(left + offset, top)) {
        return false;
      }
      break;
    case DIRECTION.DOWN:
      var newDown = top + this._tankHeight + offset;
      if(newDown > this._height || this.checkWalls(left, top + offset)) {
        return false;
      }
      break;
    case DIRECTION.LEFT:
      var newLeft = left + offset;
      if(newLeft < 0 || this.checkWalls(newLeft, top)) {
        return false;
      }

      break;
    default:

  }

  return true;
}

Battlefield.prototype.pixelsToPercentsHor = function (pixels) {
  var pos = $("#battlefield").position();

  // horizontal
  var perInPxHor = this._leftPerc / pos.left;
  var pxInPerHor = pos.left / this._leftPerc;

  return perInPxHor * pixels;
}

Battlefield.prototype.pixelsToPercentsVer = function (pixels) {
  var pos = $("#battlefield").position();

  // vertical
  var perInPxVer = this._topPerc / pos.top;
  var pxInPerVer = pos.top / this._topPerc;

  return perInPxVer * pixels;
}

Battlefield.prototype.percentsToPixelsHor = function (percents) {
  var pos = $("#battlefield").position();

  // horizontal
  var perInPxHor = this._leftPerc / pos.left;
  var pxInPerHor = pos.left / this._leftPerc;

  return pxInPerHor * percents;
}

attlefield.prototype.isTankInRect = function (wall, left, top, width, height) {
  if(this.isPointInRect(wall, left, top)
  || this.isPointInRect(wall, left + width, top)
  || this.isPointInRect(wall, left, top + height)
  || this.isPointInRect(wall, left + width, top + height)) {
    return true;
  }

  return false;
}

Battlefield.prototype.isPointInRect = function (wall, left, top) {
  wall.width;
  wall.height;
  // var leftPx = this.percentsToPixelsHor(wall.leftPerc);
  // var topPx = this.percentsToPixelVer(wall.topPerc);


  if((top > wall.top && top < wall.top + wall.height)
    && (left > wall.left && left < wall.left + wall.width)) {
    return true;
  }

  return false;
}
