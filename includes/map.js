// Sample Map Data

// World data is a simple grid array for mapdata to reference.
var worlddata = []

// mapdata is a 100 x 100 grid. Created in the map editor
var mapdata = [
  {
	x: 0,
	y: 0,
	walkable: true,   // Determined based on type.
	element: "<div>", //decorated after build.
	type: 0 		  // 0 = Grass, 1 = Tree. TODO: This needs more thought. Maybe a sub-type?
  }
	
]



ac.map = function() {
  this.init();
}

ac.map.prototype = {
  start: {
	  "x": 0,
	  "y": 0
  },
  init: function() {
	  this.parent = $("#environment");
	  this.draw();
	  this.prepare();
  },
  prepare: function() {
	  this.finder = new PF.AStarFinder();
  },
  
  draw: function () {
	  this.grid = new PF.Grid(100, 100);
	  var g = this.grid;

		var that = this;
		for (i=0; i < g.nodes.length; ++i ) {
			g.nodes[i].forEach(function(item) {
			that.decorateGrid(item);
	  });
		  
	  }
  },
  
  decorateGrid: function(item) {
  	var d = document.createElement("div")
	  d.className = "gridsquare";
	  item.element = d;
	  this.parent.append(d);

	  return; 
  },
  
  findPath: function(t){
	 var s = this.start;
	 var path = this.finder.findPath(s.x, s.y, t.x, t.y, this.grid);
	 
	 return path;
  }
}

