var dropoutControllers = angular.module("dropout.controllers", ['cfp.hotkeys',]);

dropoutControllers.controller('WelcomeController', ['$scope', '$location', 'gameService', function($scope, $location, gameService) {
	$scope.create = function() {
		// Create a new game and redirect to the lobby.
		var game = gameService.create();
		game.addPlayer(new Player($scope.playerName));

		$location.path('/game/' + game.data.id);
	};

	$scope.join = function() {
		// Join an existing game (if it exists).
		var game = gameService.get($scope.gameId);
		if (game != undefined) {
			game.addPlayer($scope.playerName, {x: 1, y: 1}, true);
			// Redirect to lobby / game.		
			$location.path('/game/' + $scope.gameId);
		} else {
			// TODO: Create a new game.
			$scope.create();
		}
	}
}]);

// This controller keeps track of the game world, where players are, what cells still exist, etc.
dropoutControllers.controller('GameController', ['$scope', '$interval', '$routeParams', 'gameService', 'hotkeys', function($scope, $interval, $routeParams, gameService, hotkeys) {
	$scope.game = gameService.get($routeParams.gameId);

	$scope.game.data.$loaded().then(function() {
		$scope.player = $scope.game.getLocalPlayer();
	});

	// Move right
	hotkeys.add({
		combo: 'd',
		description: 'Move right',
		callback: function() {
			$scope.movePlayer($scope.player, 1, 0);
		}
	});

	// Move left
	hotkeys.add({
		combo: 'a',
		description: 'Move left',
		callback: function() {
			$scope.movePlayer($scope.player, -1, 0);
		}
	});

	// Move up
	hotkeys.add({
		combo: 'w',
		description: 'Move up',
		callback: function() {
			$scope.movePlayer($scope.player, 0, -1);
		}
	});

	// Move down
	hotkeys.add({
		combo: 's',
		description: 'Move down',
		callback: function() {
			$scope.movePlayer($scope.player, 0, 1);
		}
	})

	/**
	 * Start the game.
	 */
	$scope.start = function() {
		$scope.game.data.running = true;
		$scope.game.save();
	}

	$scope.movePlayer = function(player, deltaX, deltaY) {
		if (player.alive) {
			var newx = player.x + deltaX;
			var newy = player.y + deltaY;

			// Check to see if the move is valid. If not, don't move.
			if ($scope.game.validMove(newx, newy)) {
				// Remove from the old cell.
				$scope.game.removeFromCell(player);
				// Add to the new cell.
				player.x = newx;
				player.y = newy;
				$scope.game.addToCell(player);

				console.log("moving to (" + player.x + ", " + player.y + ")");
				// Update Firebase.
				$scope.game.save();
			} else {
				console.log('invalid');
			}
		}
	}

	// TODO: Every few seconds, drop a random cell.
	
	$interval(function() {
		if ($scope.game.running) {
			// Select an X and Y value between 0 and $scope.dim
			var dropx = Math.floor(Math.random() * $scope.game.data.dim);
			var dropy = Math.floor(Math.random() * $scope.game.data.dim);

			// Drop the cell.
//			$scope.game.dropCell(dropx, dropy);
		}
	}, 2000);
}]);