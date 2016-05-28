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
  // tank picture
  var tank = $("<div>", {id: "tank"});
  tank.css({
    "width": TANK_DIMS.WIDTH + "px",
    "height": TANK_DIMS.HEIGHT + "px",
    "background-image": "url('./img/tank_up.gif')",
    "transition": "all 0.1s ease-out 0s",
    "position": "relative",
    "top": startPos.top + "px",
    "left": startPos.left + "px"
    //"border": "0.5px solid green"
  });

  $("#" + startPos.id).append(tank);

  // default direction
  this._dir = DIRECTION.UP;
  // battlefield
  this._battlefield = battlefield;

  // sounds
  this.appendSounds();
  this.playIdling();
}

Tank.prototype.turn = function (dir) {
  var oldDir = this._dir;
  this._dir = dir;

  // if there is the same direction - don't rotate
  if(oldDir != dir) {
    $("#tank").css('transform', 'rotate('+ this._calcTurn(oldDir, dir) + 'deg)');
  }
}

Tank.prototype.getDir = function () {
  return this._dir;
}

Tank.prototype.move = function (dir) {
  var oldDir = this._dir;

  // turns tank
  this.turn(dir);

  // sets sounds
  $("#idling")[0].pause();
  $("#drive")[0].play();

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

  // sets the move state and play engine sound
  $("#tank").css("background-image", "url('./img/tank_move_up.gif')");

  var left = $("#tank").css("left");
  var top = $("#tank").css("top");

  if(this._battlefield.canMove(left, top, dir, moveDist)) {
    $("#tank").css(dirStr, function(index) {
      return (parseInt($("#tank").css(dirStr)) + moveDist) + 'px';
    });
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

  // 2
  if(oldDir == 2) {
    switch (dir) {
      case 0:
        turnCoef = 0;
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

  // 3
  if(oldDir == 3) {
    switch (dir) {
      case 0:
        turnCoef = 0;
        break;
      case 1:
        turnCoef = 1;
        break;
      case 2:
        turnCoef = -2;
        break;
      case 3:
        turnCoef = -1;
        break;
      default:

    }
  }

  return 90 * turnCoef;
}

Tank.prototype.stopMove = function (dir) {
  // sets "stay" state
  $("#tank").css("background-image", "url('./img/tank_up.gif')");

  $("#drive")[0].pause();
  $("#idling")[0].play();
}

Tank.prototype.appendSounds = function () {
  var idlingAudio = $("<audio>", {
    id: "idling",
    src: "./sound/idling.wav",
    loop: "loop"
  });

  $(document.body).append(idlingAudio);

  var driveAudio = $("<audio>", {
    id: "drive",
    src: "./sound/drive.wav",
    loop: "loop"
  });

  $(document.body).append(driveAudio);
  //$(document.body).append(<audio src='aaa.mp3' autoplay></audio>)
}

Tank.prototype.playIdling = function () {
  $("#idling")[0].play();
}
