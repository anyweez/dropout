// Defines the app and provides the application-level configuration settings (in this case routes).
// The `dropoutApp` application is itself almost devoid of content but is composed of a series of
// submodules, each of which are defined in separate files.
/**
 * Create a module that's going to be loaded by the ng-app directive and invoke several other
 * submodules to do the heavy lifting.
 */
var dropoutApp = angular.module("dropoutApp", [
	"dropout.services",
	"dropout.controllers",
	"dropout.directives",
	"ngRoute",
// Configure user-accessible routes in the application configuration. An introduction to routes can
// be found in the [AngularJS docs](https://docs.angularjs.org/tutorial/step_07). If it seems weird
// that this is done here vs in the controllers, I had the same experience. Turns out this needs to 
// be configured *before* services are instantiated from their providers; the clearest explanation
// I've found is [here](https://thinkster.io/a-better-way-to-learn-angularjs/config-function).
]).config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'html/home.html',
		controller: 'WelcomeController',
	});

	$routeProvider.when('/game', {
		templateUrl: 'html/game.html',
		controller: 'GameController',
	});
}]);