// presents a part of walls on the battlefield
function WallPart(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
}



// Presents walls on the battlefield
function Walls() {
  this._wallParts = [];
}

Walls.prototype.appendPart = function (wallPart) {
  this._wallParts.push(wallPart);
}

Walls.prototype.removePart = function (left, top, width, height) {
  // to do
}
