var dropoutServices = angular.module("dropout.services", []);

dropoutServices.factory('gameService', ['$timeout', function($timeout) {
	var currentGame = null;

	return {
		/**
		 * Create a new game with the given ID. This game will be available
		 * for others to join after this function completes.
		 */
		create: function() {
			// Connection to a Firebase database.
			currentGame = new Game({
				id: Math.floor(Math.random() * 100000000), 
				dim: 13, 
			});

			return currentGame;
		},

		get: function() {
			return currentGame;
		},
	};
}]);