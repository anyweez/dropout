var dropoutDirectives = angular.module("dropout.directives", []);

dropoutDirectives.directive("doGrid", function() {
	return {
		restrict: 'E',
		templateUrl: "html/grid.html",
	};
});

dropoutDirectives.directive('doScoreboard', function() {
	return {
		restrict: 'E',
		templateUrl: 'html/scoreboard.html',
	}
})

dropoutDirectives.directive("doPlayer", function() {
	return {
		restrict: 'E',
		templateUrl: 'html/player.html',
	}
});