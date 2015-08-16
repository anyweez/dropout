var Grid = function(dim) {
	this.dim = dim;
	this.cells = [];

	// Initialize all cells.
	for (var i = 0; i < dim * dim; i++) {
		this.cells[i] = {
			inhabitants: {},
			// state = 0: present
			// state = 1: shaking
			// state = 2: falling (not used)
			// state = 3: fallen
			state: 0,

			present: function() { return this.state == 0 },
			shaking: function() { return this.state == 1 },
			falling: function() { return this.state == 2 },
			fallen: function()  { return this.state == 3 },
		}
	} 

	return this;
}

Grid.prototype = {
	dim: 0,
	cells: [],

	index: function(x, y) {
		return this.dim * y + x;
	},

	add: function(player) {
		this.cells[this.index(player.x, player.y)].inhabitants[player.name] = true;
	},

	remove: function(player) {
		delete this.cells[this.index(player.x, player.y)].inhabitants[player.name];
	},
}