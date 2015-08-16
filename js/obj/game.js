// A `Game` is the core object that maintains the majority of game state for a single game instance,
// including the player and the grid.

// Constructor function for `Game` objects. This function can be invoked with `new Game([config])`.
var Game = function(config) {
	this.id = config.id;
	this.grid = new Grid(config.dim);
	this.player = config.player;

	return this;
}

// All game objects should have access to certain fields and methods.
Game.prototype = {
	id: null,
	player: null,
	grid: null,

	/* Determines whether a player can move to (x, y). */
	validMove: function(x, y) {
		/* Can't step outside of the grid on any side. */
		if (x < 0 || x > this.grid.dim - 1 || y < 0 || y > this.grid.dim - 1) return false;
		/* Players can walk across present or shaking cells, but nothing else. */
		return this.grid.cells[this.grid.index(x, y)].state < 2;
	},
}
