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

Battlefield.prototype.getWallCoef = function () {
  return 0.1;
}

Battlefield.prototype.makeTestRoads = function () {
  // form sizing params from input params
  var sizeParams = this.formSizeParams();
  var blockWidth = this.getWallCoef() * sizeParams.side;
  var blockHeight = blockWidth;

  // for(var i = 0; i < 4; ++i) {
  //   this.createWall(blockWidth, blockHeight, blockWidth * i, blockHeight + 1);
  // }
  //
  // for(var i = 0; i < 4; ++i) {
  //   this.createWall(blockWidth, blockHeight, (sizeParams.side - blockWidth) - blockWidth * i, blockHeight + 1);
  // }

  this.createWall(blockWidth, blockHeight, 3 * blockWidth, 4 * blockHeight);
  // this.createWall(blockWidth, blockHeight, 4 * blockWidth, 4 * blockHeight);
  // this.createWall(blockWidth, blockHeight, 4 * blockWidth, 5 * blockHeight);
  // this.createWall(blockWidth, blockHeight, this._side - blockWidth, this._side - blockHeight);
}

Battlefield.prototype.uniqueWallId = function () {
  return "wall" + idCount++;
}

Battlefield.prototype.createWall = function (width, height, left, top) {
  var sizeParams = this.formSizeParams();
  var wId = this.uniqueWallId();

  var wall = $("<div>", {id: wId});
  wall.css({
    width: width + "px",
    height: height + "px",
    backgroundImage: "url('./img/battlefield.jpg')",
    backgroundSize: "1000% 1000%",
    left: left + sizeParams.left + "px",
    top: top + sizeParams.top + "px",
    position: "fixed",
    zIndex: "-1"
  });

  $("#battlefield").append(wall);

  // saves wall sizes to battlefield ones ratio
  this._walls.push({
    'id': wId,
    'widthCoef': width / sizeParams.side,
    'heightCoef': height / sizeParams.side,
    'leftCoef': left / sizeParams.side,
    'topCoef': top / sizeParams.side
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
  var sizeParams = this.formSizeParams();
  var wallParams = this.calcWallParams(sizeParams, wall);

  if((top >= wallParams.top && top <= wallParams.top + wallParams.height)
    && (left >= wallParams.left && left <= wallParams.left + wallParams.width)) {
    return true;
  }

  return false;
}

Battlefield.prototype.calcWallParams = function (sizeParams, wall) {
  return {
    width: wall.widthCoef * sizeParams.side,
    height: wall.heightCoef * sizeParams.side,
    left: wall.leftCoef * sizeParams.side,
    top: wall.topCoef * sizeParams.side
  };
}
