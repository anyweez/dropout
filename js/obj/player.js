// A `Player` keeps track of the state of a single player, including information used by the
// view (color, alive status) and logic within controllers,

/* A bunch of different potential player colors. */
var colors = ['red', 'orange', 'green', 'yellow', 'blue', 'purple'];

// Constructor function for `Player` objects.
var Player = function(name) {
	this.name = name;
	this.created = Date.now();
	this.alive = true;
	this.color = colors[Math.floor(Math.random() * 6)];

	/* Generate a random starting point, [0, 12]. */
	this.x = Math.floor(Math.random() * 13);
	this.y = Math.floor(Math.random() * 13);

	return this;
}

// A bunch of different fields and objects that all `Player` objects should have.
Player.prototype = {
	name: "",
	color: "",
	created: null,
	defeated: null,
	alive: true,
	x: 0,
	y: 0,

	score: function() {
		if (this.alive) {
			return Math.round((Date.now() - this.created) / 1000);
		} else {
			return Math.round((this.defeated - this.created) / 1000);
		}
	},

	displayColor: function() {
		if (this.alive) {
			return this.color;
		} else {
			return '#505050';
		}
	}
}