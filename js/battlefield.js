////////////////////////////////////////////////////////////////////
var idCount = 0;

function Battlefield(params) {
  this._params = params;

  // form sizing params from input params
  var sizeParams = this.formSizeParams();

  this._battlefield = $("<div>", {id: "battlefield"});
  this._battlefield.css({
    width: sizeParams.side + "px",
    height: sizeParams.side + "px",
    minWidth: sizeParams.side + "px",
    //"background-image": "url('./img/battlefield.jpg')",
    backgroundColor: "black",
    left: sizeParams.left + "px",
    top: sizeParams.top + "px",
    position: "fixed",
    zIndex: "-2"
  });

  $(document.body).append(this._battlefield);

  // init walls
  this._walls = [];

  this.makeTestRoads(); // debug
}

Battlefield.prototype.formSizeParams = function () {
  // battlefield side
  var bfSide = this._params.wndHeight - (this._params.wndHeight * this._params.marginTopBotCoef * 2);

  return {
    side: bfSide,
    left: (this._params.wndWidth - bfSide) / 2,
    top: (this._params.wndHeight - bfSide) / 2
  };
}

Battlefield.prototype.getSize = function () {
  return {
    side: this._side,
    left: this._left,
    top: this._top
  }
}

Battlefield.prototype.setSize = function (params) {
  this._params = params;
  // form sizing params from input params
  var sizeParams = this.formSizeParams();

  $("#battlefield").css({
    width: sizeParams.side + "px",
    height: sizeParams.side + "px",
    minWidth: sizeParams.side + "px",
    left: sizeParams.left + "px",
    top: sizeParams.top + "px"
  });

  this.setWallSize(sizeParams);
}

Battlefield.prototype.setWallSize = function (sizeParams) {
  this._walls.forEach(function(wall) {
    var $wall = $("#" + wall.id);
    $wall.css({
      width: wall.widthCoef * sizeParams.side + "px",
      height: wall.heightCoef * sizeParams.side + "px",
      left: sizeParams.left + wall.leftCoef * sizeParams.side + "px",
      top: sizeParams.top + wall.topCoef * sizeParams.side + "px"
    });
  });
}

var TRIDENT_PLACE_COEF = 0.25;

Battlefield.prototype.getTankStartPos = function (tankWidth, tankHeight) {
  this._tankWidth = tankWidth;
  this._tankHeight = tankHeight;

  var sizeParams = this.formSizeParams();

  var withoutTrident = sizeParams.side - sizeParams.side * TRIDENT_PLACE_COEF;
  var leftPos = (withoutTrident / 2 - this._tankWidth) + sizeParams.left;
  var topPos = sizeParams.side - this._tankHeight;

  return {
    id: "battlefield",
    left: leftPos,
    top: topPos
  };
}

Battlefield.prototype.canMove = function(leftStr, topStr, dir, offset) {
  var left = parseFloat(leftStr);
  var top = parseFloat(topStr);

  var sizeParams = this.formSizeParams();

  switch (dir) {
    case DIRECTION.UP:
      var newUp = top + offset;
      if(newUp < 0 || this.checkWalls(left, newUp)) {
        return false;
      }
      break;
    case DIRECTION.RIGHT:
      var newRight = left + this._tankWidth + offset;
      if(newRight > sizeParams.side || this.checkWalls(left + offset, top)) {
        return false;
      }
      break;
    case DIRECTION.DOWN:
      var newDown = top + this._tankHeight + offset;
      if(newDown > sizeParams.side || this.checkWalls(left, top + offset)) {
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

Battlefield.prototype.createWall = function (width, height, left, top) {
  // var leftPerc = this._leftPerc + this.pixelsToPercentsHor(left);
  // var topPerc = this._topPerc + this.pixelsToPercentsVer(top);

  var wall = $("<div>");
  wall.css({
    "width": width + "px",
    "height": height + "px",
    "background-image": "url('./img/battlefield.jpg')",
    "left": left + this._left + "px",
    "top": top + this._top + "px",
    "position": "fixed",
    "z-index": "-1"
  });

  $("#battlefield").append(wall);

  this._walls.push({
    'width': width,
    'height': height,
    'left': left,
    'top': top
  });
}

Battlefield.prototype.checkWalls = function (left, top) {
  var bf = this;
  return this._walls.some(function(wall) {
    return bf.isTankInRect(wall, left, top, bf._tankWidth, bf._tankHeight);
  });
}

Battlefield.prototype.isTankInRect = function (wall, left, top, width, height) {
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

  if((top >= wall.top && top <= wall.top + wall.height)
    && (left >= wall.left && left <= wall.left + wall.width)) {
    return true;
  }

  return false;
}
