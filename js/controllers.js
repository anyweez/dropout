// Initialize the `dropout.controllers` module, which will be loaded by app.js. The only external
// dependency is on [AngularHotkeys](http://chieffancypants.github.io/angular-hotkeys/). Full documentation
// for controllers in AngularJS can be found in the [Angular docs](https://docs.angularjs.org/guide/controller).
var dropoutControllers = angular.module("dropout.controllers", ['cfp.hotkeys',]);

// The `WelcomeController` is responsible for handling the rendering of the pre-game view and handling the creation
// of new games.
dropoutControllers.controller('WelcomeController', ['$scope', '$location', '$interval', '$timeout', 'gameService', function($scope, $location, $interval, $timeout, gameService) {
	/* For visual flair. */
	$scope.shaking = false;

	// Called by the view when we should create a new game. Creating a game is always paired with defining the
	// player that's going to be playing. Finish with a redirect to a new route (which will also be handled by
	// a different controller).
	$scope.create = function() {
		var game = gameService.create();
		game.player = new Player($scope.playerName);

		$location.path('/game');
	};

	// Determines whether the player is able to resume from an existing incomplete game.
	// This functionality doesn't exist today so the answer is always "no" at the moment.
	$scope.canResume = function() {
		return false;
	}

	// Periodically shake some of the UI elements a little bit so that people feel the fear.
	$interval(function() {
		$scope.shaking = true;
		$timeout(function() { $scope.shaking = false; }, 500)		
	}, 5000);
}]);

// This controller keeps track of the game world and modifies it based on user inputs + randomness!
dropoutControllers.controller('GameController', ['$scope', '$interval', '$routeParams', '$timeout', '$location', 'gameService', 'hotkeys', function($scope, $interval, $routeParams, $timeout, $location, gameService, hotkeys) {
	$scope.game = gameService.get();

	/* If no game has been created, redirect back to a route handled by WelcomeController. */
	if ($scope.game == null) {
		$location.path('/');
	}

	// Attach a bunch of different listeners so that we can respond to user events. Incredibly
	// easy thanks to the wonderful [AngularHotkeys](http://chieffancypants.github.io/angular-hotkeys/)
	// library. See the `description` field of each to get a glimpse for what it does.
	hotkeys.add({
		combo: 'd',
		description: 'Move right',
		callback: function() {
			$scope.movePlayer($scope.game.player, 1, 0);
		}
	});

	hotkeys.add({
		combo: 'a',
		description: 'Move left',
		callback: function() {
			$scope.movePlayer($scope.game.player, -1, 0);
		}
	});

	hotkeys.add({
		combo: 'w',
		description: 'Move up',
		callback: function() {
			$scope.movePlayer($scope.game.player, 0, -1);
		}
	});

	hotkeys.add({
		combo: 's',
		description: 'Move down',
		callback: function() {
			$scope.movePlayer($scope.game.player, 0, 1);
		}
	})

	// Now define some functions that the view can use.

	/* Start the game. */
	$scope.start = function() {
		$scope.game.running = true;
	}

	/* Invoked by the hotkey handlers above. */
	$scope.movePlayer = function(player, deltaX, deltaY) {
		if (player.alive) {
			var newx = player.x + deltaX;
			var newy = player.y + deltaY;

			/* Check to see if the move is valid. If not, don't move. */
			if ($scope.game.validMove(newx, newy)) {
				/* Remove from the old cell. */
				$scope.game.grid.remove(player);
				/* Add to the new cell. */
				player.x = newx;
				player.y = newy;
				$scope.game.grid.add(player);
			} else {
				console.log('Cannot move to (' + newx + ', ' + newy + ')');
			}
		}
	}

	// Every few seconds, drop a random cell. "Dropping" involves a couple of different
	// state transitions, one that occurs now and another that occurs in a couple of seconds
	// via a callback. 
	// 
	// Note that the probability of selecting a particular cell is uniform, and that it's possible
	// to re-select a cell that's already fallen. If a cell is reselected, a new cell is not chosen
	// until the next interval.
	$interval(function() {
		if ($scope.game != null && $scope.game.player.alive) {
			/* Select an X and Y value between 0 and $scope.dim*/
			var dropx = Math.floor(Math.random() * $scope.game.grid.dim);
			var dropy = Math.floor(Math.random() * $scope.game.grid.dim);

			/* Drop the cell */
			var cell = $scope.game.grid.cells[$scope.game.grid.index(dropx, dropy)];

			/* Only cells that are still present can drop */
			if (cell.state == 0) {
				/* Start to fall */
				cell.state = 1;

				/* In a few seconds, actually fall */
				$timeout(function() {
					cell.state = 3;

					/* If any players are on this cell, they fall to their doom. Mark them as dead. */
					for (var name in cell.inhabitants) {
				 		$scope.game.player.alive = false;
					 	$scope.game.player.defeated = Date.now();
					}
				}, 3000);
			}
		}
	}, 750);
}]);