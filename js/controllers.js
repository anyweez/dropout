var dropoutControllers = angular.module("dropout.controllers", ['cfp.hotkeys',]);

dropoutControllers.controller('WelcomeController', ['$scope', '$location', 'gameService', function($scope, $location, gameService) {
	$scope.create = function() {
		// Create a new game and redirect to the lobby.
		var game = gameService.create();
		game.player = new Player($scope.playerName);

		$location.path('/game');
	};
}]);

// This controller keeps track of the game world, where players are, what cells still exist, etc.
dropoutControllers.controller('GameController', ['$scope', '$interval', '$routeParams', '$timeout', 'gameService', 'hotkeys', function($scope, $interval, $routeParams, $timeout, gameService, hotkeys) {
	$scope.game = gameService.get();

	// Move right
	hotkeys.add({
		combo: 'd',
		description: 'Move right',
		callback: function() {
			$scope.movePlayer($scope.game.player, 1, 0);
		}
	});

	// Move left
	hotkeys.add({
		combo: 'a',
		description: 'Move left',
		callback: function() {
			$scope.movePlayer($scope.game.player, -1, 0);
		}
	});

	// Move up
	hotkeys.add({
		combo: 'w',
		description: 'Move up',
		callback: function() {
			$scope.movePlayer($scope.game.player, 0, -1);
		}
	});

	// Move down
	hotkeys.add({
		combo: 's',
		description: 'Move down',
		callback: function() {
			$scope.movePlayer($scope.game.player, 0, 1);
		}
	})

	/**
	 * Start the game.
	 */
	$scope.start = function() {
		$scope.game.running = true;
	}

	$scope.movePlayer = function(player, deltaX, deltaY) {
		if (player.alive) {
			var newx = player.x + deltaX;
			var newy = player.y + deltaY;

			// Check to see if the move is valid. If not, don't move.
			if ($scope.game.validMove(newx, newy)) {
				// Remove from the old cell.
				$scope.game.grid.remove(player);
				// Add to the new cell.
				player.x = newx;
				player.y = newy;
				$scope.game.grid.add(player);

				console.log("moving to (" + player.x + ", " + player.y + ")");
			} else {
				console.log('invalid');
			}
		}
	}

	// TODO: Every few seconds, drop a random cell.
	$interval(function() {
		// Select an X and Y value between 0 and $scope.dim
		var dropx = Math.floor(Math.random() * $scope.game.grid.dim);
		var dropy = Math.floor(Math.random() * $scope.game.grid.dim);

		// Drop the cell.
		var cell = $scope.game.grid.cells[$scope.game.grid.index(dropx, dropy)];

		// Only cells that are still present can drop.
		if (cell.state == 0) {
			console.log('dropping (' + dropx + ', ' + dropy + ')');
			// Start to fall
			cell.state = 1;

			// In a few seconds, actually fall.
			$timeout(function() {
				cell.state = 3;

				// If any players are on this cell, they fall to their doom. Mark them as dead.
				for (var name in cell.inhabitants) {
				 	$scope.game.players[name].alive = false;
				 	$scope.game.players[name].defeated = Date.now();
				}
			}, 3000);
		}
	}, 2000);
}]);