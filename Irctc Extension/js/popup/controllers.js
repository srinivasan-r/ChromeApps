var irctcControllers = angular.module('IrctcControllers', []);
irctcControllers.controller('PlacesController', function ($scope, $filter, $location) {
    /*chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        console.info(tabs[0].url);
        if (tabs[0].url == "https://www.irctc.co.in/eticketing/trainbetweenstns.jsf" || tabs[0].url == "https://www.irctc.co.in/eticketing/trainbetweenstns.jsf?cid=1")
            $location.path("/passengers");
    });*/
    this.places = [];
    var ctrl = this;
    chrome.storage.sync.get({
        places: []
    }, function (items) {
        $scope.$apply(function () {
            ctrl.places = items.places;
            console.info("Places onload data =>" + JSON.stringify(items['places']));
        });
    });
    this.onPlaceClick = function (index) {
        console.info(index + "," + ctrl.places[index]);
        var place = angular.extend({}, ctrl.places[index]);
        place.date = $filter('date')(place.date, "dd-MM-yyyy");
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            tabId = tabs[0].id;
            var port = chrome.tabs.connect(tabId);
            port.postMessage({
                fillType: 'plan',
                plan: place
            });
        });
    };
});

irctcControllers.controller('PassengersController', function ($scope, $location) {
    this.passengers = [];
    var ctrl = this;
    ctrl.passenger = {};
    chrome.storage.sync.get({
        passengers: []
    }, function (items) {
        $scope.$apply(function () {
            ctrl.passengers = items.passengers;
            console.info("Passengers onload data =>" + JSON.stringify(items['passengers']));
        });
    });
    this.onPassengerClick = function (index) {
        console.info(index + "," + ctrl.passengers[index]);
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            tabId = tabs[0].id;
            var port = chrome.tabs.connect(tabId);
            port.postMessage({
                fillType: 'passenger',
                passenger: ctrl.passengers[index]
            });
        });
    };
});