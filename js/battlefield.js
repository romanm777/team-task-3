////////////////////////////////////////////////////////////////////


function Battlefield(width, height) {
  this._width = width;
  this._height = height;
  //this._walls = new Walls();

  this._left = 200;
  this._top = 50;

  this._battlefield = $("<div>", {id: "battlefield"});
  this._battlefield.css({
    "width": this._width + "px",
    "height": this._height + "px",
    "min-width": this._width + "px",
    //"background-image": "url('./img/battlefield.jpg')",
    "background-color": "black",
    "left": this._left + "px",
    "top": this._top + "px",
    "position": "fixed",
    "z-index": "-2"
  });

  $(document.body).append(this._battlefield);

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

Battlefield.prototype.makeTestRoads = function () {
  var blockWidth = 60;
  var blockHeight = 60;

  var pos = $("#battlefield").position();

  for(var i = 0; i < 4; ++i) {
    this.createWall(blockWidth, blockHeight, 60 * 0, blockHeight + 4);
  }

  for(var i = 0; i < 4; ++i) {
    this.createWall(blockWidth, blockHeight, 640 - blockWidth * i, blockHeight + 4);
  }

  this.createWall(blockWidth, blockHeight, 180, 200);
  this.createWall(blockWidth, blockHeight, 240, 200);
  this.createWall(blockWidth, blockHeight, 240, 260);
  this.createWall(blockWidth, blockHeight, this._width - blockWidth, this._height - blockHeight);
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
