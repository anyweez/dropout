// Initialize the `dropout.services` module, which is loaded by app.js. It defines a single
// service that's responsible for managing the single source of truth for game-related data 
// via the `gameService`. Documentation for services can be found in the [Angular docs](https://docs.angularjs.org/guide/services).
//
// One thing to note about services is that the `factory` is used to instantiate a service, which
// typically has one instantiation per application. In other words, the factory is intended to
// return a single instance of a service, not provide the functions of the service itself.
var dropoutServices = angular.module("dropout.services", []);

// The `gameService` keeps track of game state and can create new games.
dropoutServices.factory('gameService', function() {
	var currentGame = null;

	return {
		/**
		 * Create a new game with the given ID. This game will be available
		 * for others to join after this function completes.
		 */
		create: function() {
			currentGame = new Game({
				id: Math.floor(Math.random() * 100000000), 
				dim: 13, 
			});

			return currentGame;
		},

		/**
		 * Get the current game (if any). This method exists so that controllers that
		 * don't create the game still have access to a shared object.
		 */
		get: function() {
			return currentGame;
		},
	};
});