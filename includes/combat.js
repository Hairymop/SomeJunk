// Combat
/**
 * Engagment is an instance of an attack between 2 players/mobs.
 * a = Aggressor
 * d = Defender
 */

ac.engagement = function (player, opponent) {
  this.init(player, opponent);  // Types to be supported... only options now are player/mob.
}

ac.engagement.prototype = {
  init: function(player, opponent) {
    this.a = player;
    this.d = opponent;

    this.attack();

    return;
  },

  attack: function () {
    var msg;
    var dmg = 0;
    var hit = this.isHit();

    if (!hit) {
      this.miss();
      return false;
    }

    dmg = this.damage();
    msg = dmg;

    var crit = this.isCritical();
    if (crit) {
      dmg = dmg * 2;
      msg = '*' + dmg + '*';
    }


    /**
     * Call hit on defending player. Triggers animations contained in ac.avatar prototype.
     */
    this.d.hit(dmg);

    this.hitmarker(msg);

  //  alert(dmg)

    return;

  },

  isHit: function () {
    var r = ac.util.roll(100);
    var ar = this.a.attackRating();
    var dr = this.d.defenceRating();

//    var toHit = ;

    if (r > 2)
      return true;
    else
      return false;
  },

  isCritical: function () {
    var r = ac.util.roll(100);

    var crit = this.a.getCritical();

    if (r < crit)
      return true;
    else
      return false;
  },

  hitmarker: function(msg) {

    var html = '<div class="hitmarker">' + msg + '</div>';

    $(this.d.elements["container"]).append(html);

    return;
  },

  damage: function() {
    return 10;
  },

  miss: function (msg) {
    this.hitmarker('MISS');

    return;
  }

}

