var dropoutServices = angular.module("dropout.services", ["firebase",]);

dropoutServices.factory('gameService', ['$timeout', '$firebaseObject', function($timeout, $firebaseObject) {
	return {
		/**
		 * Create a new game with the given ID. This game will be available
		 * for others to join after this function completes.
		 */
		create: function() {
			var gameId = Math.floor(Math.random() * 100000000);
			// Connection to a Firebase database.
			var db = new Firebase("https://dropout.firebaseio.com/game-" + gameId);
			var game = new Game(gameId, 13, $firebaseObject(db));
			game.save();

			return game;
		},

		join: function(id) {
			// TODO: join an existing game.
		},


		get: function(id) {
			var db = new Firebase("https://dropout.firebaseio.com/game-" + id);
					
			return new Game(id, 13, $firebaseObject(db));
		},
	};
}]);