var Grid = function(dim) {
	this.dim = dim;
	this.cells = [];

	// Initialize all cells.
	for (var i = 0; i < dim * dim; i++) {
		this.cells[i] = {
			inhabitants: {},
			// state = 0: present
			// state = 1: shaking
			// state = 2: falling
			// state = 3: fallen
			state: 0,
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
}