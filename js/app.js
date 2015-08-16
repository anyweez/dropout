var dropoutApp = angular.module("dropoutApp", [
	"dropout.services",
	"dropout.controllers",
	"dropout.directives",
	"ngRoute",
// Configure user-accessible routes.
]).config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'html/home.html',
		controller: 'WelcomeController',
	});

	$routeProvider.when('/game/:gameId', {
		templateUrl: 'html/game.html',
		controller: 'GameController',
	});
}]);