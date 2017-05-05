// ==UserScript==
// @name        Concur
// @namespace   Concur
// @description Concur
// @include     https://www.concursolutions.com/expense/client*
// @version     0.0.1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @grant       GM_setClipboard
// ==/UserScript==
var policy = 'GE India T&L';
var reportName = 'Broadband and Mobile';
var reportType = 'Internal (within GE) Travel-Other';
var destinationCity = 'Bangalore';
var destinationCountry = '(IN) INDIA';

var city='Bangalore, INDIA';
var receipt='Receipt';
var vendor='Airtel';
var currMonth=0;
var currDate=21;
//Broadband/Internet/PDA
//Mobile Phone/ Smart Phone
//Airtel Bangalore Out of Pocket
function autoFill()
{
	//New expense report
		//Field : Report Name/Purpose 
		$('#Report_2427_TRAVELER_ISNEW_Name').val(reportName);
		//Field : Trip Type 
		$('#Report_2427_TRAVELER_ISNEW_Custom3Name').focus();
		$('#Report_2427_TRAVELER_ISNEW_Custom3Name').val(reportType);
		//Field : Destination City/State
		$('#Report_2427_TRAVELER_ISNEW_Custom4').val(destinationCity);
		//Field : Destination Country 
		$('#Report_2427_TRAVELER_ISNEW_Custom5Name').focus();
		$('#Report_2427_TRAVELER_ISNEW_Custom5Name').val(destinationCountry);
		$('#Report_2427_TRAVELER_ISNEW_Custom3Name').focus();
	//New expense
	
		//Add date buttons
		var date = new Date();
		currMonth=date.getMonth()+1;
		var prevDay = $('<button type="button" id="prev_day">&lt;</button>');
		prevDay.click(function(){currDate=currDate-1;setDate();});
		var prevMonth = $('<button type="button" id="prev_day">&lt;&lt;</button>');
		prevMonth.click(function(){currMonth=currMonth-1;setDate();});
		var nextDay = $('<button type="button" id="prev_day">&gt;</button>');
		nextDay.click(function(){currDate=currDate+1;setDate();});
		var nextMonth = $('<button type="button" id="prev_day">&gt;&gt;</button>');
		nextMonth.click(function(){currMonth=currMonth+1;setDate();});
		
		$('#Expense_7667_TRAVELER_P1230_TransactionDate_cell').append(prevMonth);
		$('#Expense_7667_TRAVELER_P1230_TransactionDate_cell').append(prevDay);
		$('#Expense_7667_TRAVELER_P1230_TransactionDate_cell').append(nextDay);
		$('#Expense_7667_TRAVELER_P1230_TransactionDate_cell').append(nextMonth);
		
		var elmLink = document.getElementById('Expense_7667_TRAVELER_P1230_TransactionAmount');
		if(elmLink)
			elmLink.addEventListener("blur", updateBillAmnt, true);
		//date
		function setDate(){
			$('#Expense_7667_TRAVELER_P1230_TransactionDate').val(currDate+'/'+currMonth+'/2014');
		}
		setDate();
		//City
		$('#Expense_7667_TRAVELER_P1230_LocName').focus();
		$('#Expense_7667_TRAVELER_P1230_LocName').val(city);
		//Receipt
		var receiptField = $('#Expense_7667_TRAVELER_P1230_ReceiptType_cell').find('input').last();
		receiptField.focus();
		receiptField.val(receipt);
		//Vendor
		$('#Expense_7667_TRAVELER_P1230_VendorDescription').focus();
		$('#Expense_7667_TRAVELER_P1230_VendorDescription').val(vendor);

		
//$('#ext-gen191').trigger('click');
}

var liMenuItem = $('<li class="menuactive"></li>');
var liMenuButton = $('<button type="button" id="auto_fill" class=" x-btn-text menu_createandedit2">Auto Fill</button>');
liMenuButton.click(autoFill);
liMenuItem.append(liMenuButton);
$('#mainmenu').append(liMenuItem);

function updateBillAmnt() {
	var amount = $('#Expense_7667_TRAVELER_P1230_TransactionAmount');
	amount.val(amount.val()*.75);
}