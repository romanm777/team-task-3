
$(document).ready(function () {
  var game = new Game();


});


//////////////////////////////////////////////////////
// 		Functionality

// Represents battle city game

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
