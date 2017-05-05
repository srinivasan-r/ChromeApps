var passengerData;

var fromStationId = "jpform:fromStation";
var toStationId = "jpform:toStation";
var dateId = "jpform:journeyDateInputDate";
var submitBtnId = "jpform:jpsubmit";

var mobileNoId = "addPassengerForm:mobileNo";
//var rowId = "addPassengerForm:psdetail:";
var nameId = "addPassengerForm:psdetail:";
var nameIdSuffix = ""; //:psgnName";
var ageId = "addPassengerForm:psdetail:";
var ageIdSuffix = ":psgnAge";
var genderId = "addPassengerForm:psdetail:";
var genderIdSuffix = ":psgnGender";
var berthId = "addPassengerForm:psdetail:";
var berthIdSuffix = ":berthChoice";

var creditCardId = "CREDIT_CARD";
var card_type_id = "card_type_id"; // VISA MC
var card_no_id = "card_no_id";
var card_expiry_mon_id = "card_expiry_mon_id"; //01 to 12
var card_expiry_year_id = "card_expiry_year_id";
var card_name_id = "card_name_id";


var passengerNumber = 0;

function fillPassengerData(passenger) {
    var MAXROWS = 6;
    var rowNumber = 0;
    while (rowNumber < MAXROWS && document.querySelector('input[id^="' + nameId + rowNumber + nameIdSuffix + '"]').value != "") {
        rowNumber++;
    }
    if (rowNumber == MAXROWS)
        return;
    document.querySelector('input[id^="' + nameId + rowNumber + nameIdSuffix + '"]').value = passenger.name;
    document.querySelector('input[id^="' + ageId + rowNumber + ageIdSuffix + '"]').value = passenger.age;
    document.querySelector('select[id^="' + genderId + rowNumber + genderIdSuffix + '"]').value = passenger.gender;
    if (rowNumber == 0)
        document.getElementById(mobileNoId).value = passenger.mobile;
}

function fillPlanData(plan) {
    document.getElementById(fromStationId).value = plan.from;
    document.getElementById(toStationId).value = plan.to;
    document.getElementById(dateId).value = plan.date;
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window,
        0, 0, 0, 0, 0,
        false, false, false, false,
        0, null);
    document.getElementById(submitBtnId).dispatchEvent(event);
}

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        console.info("Received msg ==>" + JSON.stringify(msg));
        if (msg["data"] !== undefined) {
            passengerData = msg["data"];
            var passengerNumber = 0;
            console.info("Passenger data =" + passengerData[0]["Name"]);
        } else if (passengerData === undefined)
            console.info("data is undefined")
        if (msg["command"] !== undefined) {
            passengerNumber = msg["command"];
            fillData(passengerNumber);
        }
        if (msg["fillType"] !== undefined) {
            if (msg["fillType"] == "plan") {
                fillPlanData(msg["plan"]);
            } else if (msg["fillType"] == "passenger") {
                fillPassengerData(msg["passenger"]);
            }
        }
        //        port.postMessage('processing complete');
    });
});




/*
Ticket type
    E_TICKET E-ticket
    I_TICKET 

Berth choice
    WS WINDOW SIDE
    


*/