var Game = function(config) {
	this.id = config.id;
	this.grid = new Grid(config.dim);

	return this;
}

Game.prototype = {
	id: null,
	player: null,
	grid: null,

	validMove: function(x, y) {
		// Can't step outside of the grid on any side.
		if (x < 0 || x > this.grid.dim - 1 || y < 0 || y > this.grid.dim - 1) return false;
		// Players can walk across present or shaking cells, but nothing else.
		return this.grid.cells[this.grid.index(x, y)].state < 2;
	},
}
