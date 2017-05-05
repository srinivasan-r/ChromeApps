var irctcControllers = angular.module('IrctcControllers', []);
irctcControllers.controller('PlacesController', function ($scope) {
    this.places = [];
    var currDate = new Date();
    this.minDate = currDate.valueOf();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 120);
    this.maxDate = this.maxDate.valueOf();
    this.place = {
        date: currDate
    };
    var ctrl = this;
    //    chrome.storage.sync.set({
    //        places: []
    //    });
    chrome.storage.sync.get({
        places: []
    }, function (items) {
        $scope.$apply(function () {
            ctrl.places = items.places;
            console.info(JSON.stringify(items['places']));
        });
    });
    this.onPlacesSave = function () {
        if (ctrl.place.from === undefined || ctrl.place.to === undefined || ctrl.place.date === undefined)
            return;
        var _date = ctrl.place.date; //d.toLocaleDateString()
        var newPlace = {
            from: ctrl.place.from,
            to: ctrl.place.to,
            date: _date.valueOf() //_date.getDate()+"-"+(_date.getMonth()+1)+"-"+_date.getFullYear(),
        };
        ctrl.places.push(newPlace);
        chrome.storage.sync.get({
            places: []
        }, function (items) {
            items.places.push(newPlace);
            chrome.storage.sync.set({
                places: items.places
            }, function () {
                $scope.$apply(function () {
                    ctrl.places = items.places;
                });
                console.info(JSON.stringify(items['places']));
            });

        });
        this.place = {
            date: currDate
        };
        this.placeForm.$setPristine();
    };

    this.onPlaceClick = function (index) {
        var place = angular.extend({}, ctrl.places[index]);
        place.date = new Date(place.date);
        ctrl.place = place;
    };
    this.onDelete = function (event, index) {
        event.stopPropagation();
        var place = angular.extend({}, ctrl.places[index]);
        place.date = new Date(place.date);
        ctrl.place = place;
        var _places = ctrl.places;
        _places.splice(index, 1);
        chrome.storage.sync.set({
            places: _places
        }, function () {
            console.info(JSON.stringify(ctrl.places));
        });
    };
    this.onDeleteAll = function () {
        if (this.places.length == 0) {
            alert("No data to delete");
            return;
        }
        if (confirm("Are you sure to delete all data?")) {
            chrome.storage.sync.set({
                places: []
            });
            this.places = [];
        }
    };
});

irctcControllers.controller('PassengersController', function ($scope) {
    this.passengers = [];
    var ctrl = this;
    ctrl.passenger = {};
    chrome.storage.sync.get({
        passengers: []
    }, function (items) {
        $scope.$apply(function () {
            ctrl.passengers = items.passengers;
            console.info(JSON.stringify(items['passengers']));
            $("#optionsPassengers tbody").sortable({
                helper: passengerListHelper,
                stop: passengerListStopEvent
            }).disableSelection();
        });
    });

    /////////////////////////////////////////////////Save Button////////////////////////////////////////////////////////
    this.onSave = function () {
        if (!validateFields())
            return;
        var newPassenger = {
            name: ctrl.passenger.name,
            age: ctrl.passenger.age,
            gender: ctrl.passenger.gender,
            mobile: ctrl.passenger.mobile
        };
        ctrl.passengers.push(newPassenger);
        chrome.storage.sync.get({
            passengers: []
        }, function (items) {
            items.passengers.push(newPassenger);
            chrome.storage.sync.set({
                passengers: items.passengers
            }, function () {
                $scope.$apply(function () {
                    ctrl.passengers = items.passengers;
                });
                console.info(JSON.stringify(items['passengers']));
            });
        });
        this.passenger = {};
        this.passengerForm.$setPristine();
    };
    this.onPassengerClick = function (index) {
        console.info(index);
        var passenger = angular.extend({}, ctrl.passengers[index]);
        ctrl.passenger = passenger;
    };
    /////////////////////////////////////////////////Save button////////////////////////////////////////////////////////
    function validateFields() {
        if (ctrl.passenger.name === undefined || ctrl.passenger.age === undefined || ctrl.passenger.gender === undefined || ctrl.passenger.mobile === undefined)
            return false;
        return true;
    }
    /////////////////////////////////////////////////Delete Button////////////////////////////////////////////////////////
    this.onDelete = function (event, index) {
        event.stopPropagation();
        var passenger = angular.extend({}, ctrl.passengers[index]);
        ctrl.passenger = passenger;
        var _passengers = ctrl.passengers;
        _passengers.splice(index, 1);
        chrome.storage.sync.set({
            passengers: _passengers
        }, function () {
            console.info(JSON.stringify(ctrl.passengers));
        });
    };

    /////////////////////////////////////////////////Delete All Button////////////////////////////////////////////////////////
    this.onDeleteAll = function () {
        if (this.passengers.length == 0) {
            alert("No data to delete");
            return;
        }
        if (confirm("Are you sure to delete all data?")) {
            chrome.storage.sync.set({
                passengers: []
            });
            this.passengers = [];
        }
    };
});


irctcControllers.controller('RawDataController', function ($scope) {
    //this.rawData = "Loading...";
    var ctrl = this;
    chrome.storage.sync.get({
        places: [],
        passengers: [],
        vars:[]
    }, function (items) {
        $scope.$apply(function () {
            ctrl.rawData = JSON.stringify(items);
        });
    });
    this.onUpdate = function () {
        if (confirm("Updating with wrong data may corrupt all data. Are you sure?")) {
            //JSON.parse(ctrl.rawData)
            chrome.storage.sync.set(JSON.parse(ctrl.rawData));
            //this.passengers = [];
        }
    };
});

irctcControllers.controller('VariablesController', function ($scope) {
    this.vars = {};
    var ctrl = this;
    this.variableNames = ['fromStationId', 'toStationId', 'dateId', 'submitBtnId', 'mobileNoId', 'nameId', 'nameIdSuffix', 'ageId', 'ageIdSuffix', 'genderId', 'genderIdSuffix', 'berthId', 'berthIdSuffix']
    chrome.storage.sync.get({
        vars: {}
    }, function (items) {
        $scope.$apply(function () {
            console.info("items.vars="+items.vars);
            console.info("items.vars.length"+items.vars.length);
            if(items.vars.length)
                ctrl.vars = items.vars;
            console.info(JSON.stringify(items['vars']));
        });
    });
    this.onVarsSave = function () {
        console.info("vars : "+JSON.stringify(this.vars));
        chrome.storage.sync.get({
            vars: {}
        }, function (items) {
            console.info("items.vars="+items.vars);
            chrome.storage.sync.set({
                vars: ctrl.vars
            }, function () {
                $scope.$apply(function () {
                    ctrl.vars = items.vars;
                });
                console.info(JSON.stringify(items['vars']));
            });

        });
        this.varsForm.$setPristine();
    };
});