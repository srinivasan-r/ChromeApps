var app = angular
    .module('IrctcOptions', ['IrctcControllers', 'ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when('/places', {
        templateUrl: 'templates/popup-places-view.html',
        controller: 'PlacesController',
        controllerAs: 'placesCtrl'
    }).when('/passengers', {
        templateUrl: 'templates/popup-passengers-view.html',
        controller: 'PassengersController',
        controllerAs: 'psngrCtrl'
    }).otherwise({
        redirectTo: "/places"
    });
});