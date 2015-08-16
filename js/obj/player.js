// A bunch of different potential player colors.
var colors = ['red', 'orange', 'green', 'yellow', 'blue', 'purple'];

var Player = function(name) {
	this.name = name;
	this.created = Date.now();
	this.alive = true;
	this.color = colors[Math.floor(Math.random() * 6)];

	// TODO: randomly generate these coordinates.
	this.x = 5;
	this.y = 5;

	return this;
}

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