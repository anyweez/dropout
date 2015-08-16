// A bunch of different potential player colors.
var colors = ['red', 'orange', 'green', 'yellow', 'black', 'gray', 'blue', 'purple'];


var Game = function(id, dim, fbo) {
	this.data = fbo;

	// Only create new fields if there is no existing field. If we're loading a game then
	// we don't want to overwrite it.	
	this.data.id = id;
	this.data.dim = dim;
	this.data.running = false;
	this.data.players = {};
	this.data.grid = new Grid(dim);

	return this;
}

Game.prototype = {
	// Any fields here are *not* going to be sync'd into Firebase, so this should be for local
	// state only.
	localPlayer: {},

	/**
	 * Sync the game state to Firebase so that it's automatically passed along to other clients.
	 */
	save: function() {
		// Returns a promise but I don't need to do anything here; TODO: should probably 
		// handle the error case.
		this.data.$save();
	},

	/**
	 * Add a new player to the specified game. This will only succeed if the game hasn't started yet.
	 */
	addPlayer: function(player) {
		if (!this.running) {
			this.localPlayer = player;
			var game = this;

			// Set the color depending on how many players are already in the game.
			player.color = colors[Object.keys(game.data.players).length];
			game.data.players[player.name] = player;

			game.save();

			return player;
		}

		return null;
	},

	getPlayer: function(name) {
		return this.data.players[name];
	},

	// TODO: this currently doesn't work on refresh.
	getLocalPlayer: function() {
		if (this.localPlayer.length > 0) {
			return this.data.players[this.localPlayer];
		} else {
			console.log(this.data.players);
			// Return the first player you get to
			for (var key in this.data.players) {
				if (this.data.players.hasOwnProperty(key)) {
					console.log('found ' + key);
					return this.data.players[key];
				}
			}
		}
	},

	validMove: function(x, y) {
		// Can't step outside of the grid on any side.
		if (x < 0 || x > this.data.dim - 1 || y < 0 || y > this.data.dim - 1) return false;
		// Players can walk across present or shaking cells, but nothing else.
		return this.data.grid.cells[this.data.dim * y + x].state < 2;
	},

	dropCell: function(x, y) {
		var grid = this.data.grid;
		var cell = this.data.grid.cells[this.data.dim * y + x];

		// Only cells that are still present can drop.
		if (cell.state == 0) {
			// Start to fall
			cell.state = 1;

			// In a few seconds, actually fall.
			$timeout(function() {
				cell.state = 3;

				// If any players are on this cell, they fall to their doom. Mark them as dead.
				for (var name in cell.inhabitants) {
				 	this.data.players[name].alive = false;
				 	this.data.players[name].defeated = Date.now();
				}
			}, 3000);
		}
	},

	addToCell: function(player) {
		var index = this.data.dim * player.y + player.x;

		if (!('inhabitants' in this.data.grid.cells[index])) this.data.grid.cells[index].inhabitants = {};
	 	this.data.grid.cells[index].inhabitants[player.name] = true;
	},

	removeFromCell: function(player) {
		var index = this.data.dim * player.y + player.x;

		// If there are no inhabitants, nothing to do here.
		if (!('inhabitants' in this.data.grid.cells[index])) return;
		delete this.data.grid.cells[index].inhabitants[player.name];
	},
}
