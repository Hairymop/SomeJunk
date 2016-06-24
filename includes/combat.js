// Combat
/**
 * Players & Opponents is an array of players. See object-definitions.
 * a = Aggressor
 * d = Defender
 */

ac.engagement = function (player, opponents) {
  this.init(player, opponents);  // Types to be supported... only options now are player/mob.
}

ac.engagement.prototype = {
  init: function(players, opponents) {
  	this.players = players;
  	this.opponents = opponents;
  },

  engage: function () {

  },

  selectOpponent: function() {

  },

  hit: function (a, d) {
    var hit = this.isHit();

    if (!hit)
      return false;

    var crit = this.isCritical(a, d);

  },

  isHit: function (a, d) {
    var r = ac.util.roll();

    if (r > 5)
      return true;
    else
      return false;
  },

  isCritical: function () {

  },

  damage: function() {
    return 10;
  },

  miss: function () {

  }

}

