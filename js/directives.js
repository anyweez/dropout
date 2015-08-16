// Initialize the `dropout.directives` module, a humble module that defines a small number of
// element-level directives for Dropout. Full documentation for directives in AngularJS can be
// found in the [Angular docs](https://docs.angularjs.org/guide/directive), though there are a
// ton of other good write-ups online because these things can be more complicated than they 
// seem at first glance. In particular, scope can be hard to grasp and [there's a good doc from 
// the Angular team](https://github.com/angular/angular.js/wiki/Understanding-Directives) as well
// as a number of third party write-ups like [this one](https://umur.io/angularjs-directives-using-isolated-scope-with-attributes/).
var dropoutDirectives = angular.module("dropout.directives", []);

// The directives themselves are all restricted to element-level usage only; see the 'restrict' section in
// [the docs](https://docs.angularjs.org/guide/directive) for more info. They're rendered in the page as
// the content of the HTML pages that're provided as `templateUrl`'s.

/* Directive to render the game grid. */
dropoutDirectives.directive("doGrid", function() {
	return {
		restrict: 'E',
		templateUrl: "html/grid.html",
	};
});

/* Directive to render the scoreboard. */
dropoutDirectives.directive('doScoreboard', function() {
	return {
		restrict: 'E',
		templateUrl: 'html/scoreboard.html',
	}
})

/* Directive to render each player graphic (currently a circle). */
dropoutDirectives.directive("doPlayer", function() {
	return {
		restrict: 'E',
		templateUrl: 'html/player.html',
	}
});