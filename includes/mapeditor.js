// Sample Map Data

// World data is a simple grid array for mapdata to reference.
ac.worlddata = []

// mapdata is a 100 x 100 grid. Created in the map editor
ac.mapdata = [
  {
	x: 0,
	y: 0,
	walkable: true,   // Determined based on type.
	type: "grass" 		  // 0 = Grass, 1 = Tree. TODO: This needs more thought. Maybe a sub-type?
  }
	
]

ac.types = {
	"grass":{
		name: "Grass",
		walkable: true,
		class: "terrain-grass"
	},
	"tree":{
		name: "Tree",
		walkable: false,
		class: "terrain-tree"
	},
	"wall":{
		name: "Wall",
		walkable: false,
		class: "terrain-wall"
	}
}

/**
 * Render the initial map and work space.
 */
ac.mapeditor = function() {
  this.parent = $("#editor");
  this.init();
}

ac.mapeditor.prototype = {
  init: function() {
	  this.draw();
	  this.prepare();
		this.settings = {
			activetype: "grass"
		}
  },
  prepare: function() {
	  this.finder   = new PF.AStarFinder();
		this.options  = new ac.mapoptions();
		this.output   = new ac.mapoutput();
  },
  
  draw: function () {
	  this.grid = new PF.Grid(100, 100);
	  var g     = this.grid;
	  var that  = this;
		
	  for (var j = 0; j < g.nodes.length; ++j ) {
		  g.nodes[j].forEach(function(item) {
			that.decorateGrid(item);
		  });
	  }
  },
  
  decorateGrid: function(item) {
	  var d = document.createElement("div")
	  d.className = "editorsquare terrain-grass";
	  this.parent.append(d);
	  
	  var that = this;
	  $(d).bind("click", function(e) {
        that.set(e, item)
      })
	  
	  return; 
  },
  
  findPath: function(t){
	 var s = this.start;
	 var path = this.finder.findPath(s.x, s.y, t.x, t.y, this.grid);
	 
	 return path;
  },
	
	gettype: function() {
		var active = ac.map.settings.activetype
		var type = ac.types[active]
		type.type = active;
		return type;
	},
	
  set: function(e, item){
		var type = this.gettype();
		item.walkable = type.walkable;
		item.type = type.type;
		
		$(e.target).attr('class', 'editorsquare ' + type.class);
  }

}

/**
 * Set of options for changing terrain types etc. Edit tools.
 */
ac.mapoptions = function() {
	this.init();
}

ac.mapoptions.prototype = {
	init: function(){
		this.draw();
	},
	draw: function() {
	  $(document.body).append("<div id=\"editor-options\"><label>Type:</label> <div id=\"terrain-type\"></div>");
		$("#editor-options").draggable();

    var s = $("#terrain-type")
		
		var t = ac.types
		for(var type in ac.types) {
			s.append('<div id="terrain-' + type + '" class="terrain-option ' + t[type].class + '" title="' + t[type].name + '"></div>');

			$('#terrain-' + type).data("value", type).on("click", function(e){
		    ac.map.settings.activetype = $(this).data().value;
		  });
		}
			
		s.change()
	}
}

/**
 * Tool for generating JSON object structure in preparation for save.
 */
ac.mapoutput = function() {
	this.init();
}

ac.mapoutput.prototype = {
	
	init: function(){
		this.draw();
	},
	
	draw: function() {
	  $(document.body).append("<div id=\"editor-output\">"
														+ "<label>JSON:</label>" 
														+ "<button id=\"generate-JSON\">Generate</button>"
														+ "<textarea class=\"\" rows=\"5\" id=\"output-JSON\"></textarea>"
													  );
    $('#editor-output').draggable();

    var that = this;
    $("#generate-JSON").mouseup(function(e) {
      that.renderJSON(e)
    });

	},
	renderJSON: function() {
		var str = JSON.stringify(ac.map.grid);
		$("#output-JSON").val(str);
	}
}
