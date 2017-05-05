var app = angular
    .module('IrctcOptions', ['IrctcControllers', 'ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when('/places', {
        templateUrl: 'templates/options-places-view.html',
        controller: 'PlacesController',
        controllerAs: 'placesCtrl'
    }).when('/passengers', {
        templateUrl: 'templates/options-passengers-view.html',
        controller: 'PassengersController',
        controllerAs: 'psngrCtrl'
    }).when('/variables', {
        templateUrl: 'templates/options-variables-view.html',
        controller: 'VariablesController',
        controllerAs: 'varsCtrl'
    }).when('/rawdata', {
        templateUrl: 'templates/options-rawdata-view.html',
        controller: 'RawDataController',
        controllerAs: 'rawDataCtrl'
    }).otherwise({
        templateUrl: 'templates/options-places-view.html',
        controller: 'PlacesController',
        controllerAs: 'placesCtrl'
    });
});