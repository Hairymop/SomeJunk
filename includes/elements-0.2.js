/**
 * TODO:
 * Init game and environments through a global init function attached to ac object.
 * Create play area.
 * - PLay area shoudl be grid based. 
 * - Get Grid elements on view of the items. 
 * Move play area not avatar. 
 * Avatar remains centered on the the screen.
 * UTIL:
 * Figure out a better way to bind functions.
 * NAVIGATION:
 * - Move "Move" functions into Utils area. Add moveEnvironment and moveAvatar.
 */


var ac = {};

/**
 * Spawn build of game. 
 */ 
ac.init = function() {
  
}

/**
 * Setup play area and world map.
 *
 */
ac.environment = function () {
  this.init();
}

ac.environment.prototype = {
  startLeft: 0,
  startTop: 0,
  
  init: function(){
    this.draw();
  },
  
  draw: function(){
    $("#canvas").append("<div id=\"environment\"></div>");
    this.elem = $("#environment") 
    var that = this;
    this.elem.bind("click", function(e) {
      that.move(e)
    })
  },
  
  move: function(e) {
    var nl, nt;
    var offset = $("#canvas").offset();

    nl = e.clientX;
    nt = e.clientY;

    var c = ac.util.center();
    
    var pos = $("#environment").position();
    
	nl = (c.left - nl);
	nl = this.startLeft + nl;

	nt = (c.top - nt);
	nt = this.startTop + nt;

    $("#environment").tween({
      left: {
        start: this.startLeft,
        stop: nl,
        time: 0,
        duration: 0.5,
        units: 'px',
        onStop: this.clearAnimation
      }
    });

    $("#environment").tween({
      top: {
        start: this.startTop,
        stop: nt,
        time: 0,
        duration: 0.5,
        units: 'px',
        onStop: this.clearAnimation
      }
    });
   
    $.play();
    
    this.startLeft = nl;
    this.startTop = nt;
    
  }

}

/**
 * Core avatar drawing object. 
 *
 * TODO:
 * Add customization draw options.
 */
ac.avatar = function (data) {

  this.data = data;
  
  this.init();  // Types to be supported... only options now are player/mob.
}

ac.avatar.prototype = {
  init: function() {

    ac.data.player = this;
    this.id = ac.util.generateId();

    this.draw();
    
    this.reset();
    
    this.prepare();
    
    return true;
  },

  draw: function() {


    var html = '<div class="player ' + this.id + '" id="' + this.id + '">'
        + '<div class="avatar"></div>'
        + '<div class="status">ALIVE</div>'
        + '</div>';

    $("#canvas").append(html);

    this.element = document.getElementById(this.id);

    return;
  },
  
  clearAnimation: function () {
    $(".player .avatar").removeClass("animateAvatar");
    return;
  },

  
  move: function(cmd) {
    $(".player .avatar").addClass("animateAvatar");

    cmd.call(this);
    
    return true;
  },
  

  keymap: function (e) {
    console.log("Pressing...");
    var cmd = null;
    if (e.which == 39)
      cmd = this.right;
    else if (e.which == 37)
      cmd = this.left;
    else if (e.which == 32)
      cmd = this.jumpUp;
    
    if (cmd)
      this.move(cmd);

    return;
  },
  
  prepare: function () {
    var that = this;
    $(document).keydown(function(e) {
      that.keymap(e);
      return true;
    });
  },
  
  reset: function() {
  },

  attack: function (opponent) {
    var engage = new ac.engagement(this, opponent);

  },

  hit: function(dmg) {
    $('#' + this.id + ' > .hitmarker').html(dmg);
    alert('Hit DMG: ' + dmg);
  }

}

ac.monster = class Monster extends ac.avatar {
  draw() {

    var html = '<div class="monster" id="' + this.id + '">'
        + '<div class="avatar"></div>'
        + '<div class="status">ALIVE</div>'
        + '</div>';


    $("#canvas").append(html);

    this.element = document.getElementById(this.id);

    return;
  }

  prepare() {
    var that = this;

    $(this.element).click(function(e) {
      ac.util.binding(ac.data.player, "attack", that);

    });
  }
}

ac.data = {
  canvas: $("#canvas"),
  player: {}
}

ac.util = {
  center: function() {
    var c = $("#canvas");
    
    // TODO: Fix this function call. Don't reference the Array directly.
    
    var l = (c[0].clientWidth/2);
    var t = (c[0].offsetHeight/2);

    return {
      left: l,
      top: t
    }
  },
  generateId: function() {
    var n = Math.random();
    n = n.toString();
    n = n.replace(/\./g,'');

    return n;
  },
  binding: function(obj, func, args) {
    obj[func](args);
    return;
  },
  roll: function(max) {
    if (!max)
      max = 10;

    return Math.floor((Math.random() * max) + 1); 

  }

}


