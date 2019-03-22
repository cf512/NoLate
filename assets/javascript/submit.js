var config = {
    apiKey: "AIzaSyBqq61A0kK_3nScseexY0EAY26DBym3s7c",
    authDomain: "firstteamproject-16be1.firebaseapp.com",
    databaseURL: "https://firstteamproject-16be1.firebaseio.com",
    projectId: "firstteamproject-16be1",
    storageBucket: "firstteamproject-16be1.appspot.com",
    messagingSenderId: "546682156707"
};

firebase.initializeApp(config);
var database = firebase.database();

var today;
var todayArray; 
var todayArrayTime;
var todayArrayTimeArray;
var todayArrayTimeHours;
var todayArrayTimeMinutes;
var todayArrayTimeSeconds;
var todayArrayTimeDate;
var todayArrayDay;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getTodayDate(){
    today = new Date();
    todayArray = today.toString().split(" "); 
    todayArrayTime = todayArray[4];
    todayArrayTimeArray = todayArrayTime.split(":")
    todayArrayTimeHours = todayArrayTimeArray[0];
    todayArrayTimeMinutes = todayArrayTimeArray[1];

    todayArrayTimeSeconds = todayArrayTimeArray[2];
    switch(todayArray[0]){
        case "Mon":
        todayArrayDay = "Monday";
        break;
        case "Tue":
        todayArrayDay = "Tuesday";
        break;
        case "Wed":
        todayArrayDay = "Wednesday";
        break;
        case "Thu":
        todayArrayDay = "Thursday";
        break;
        case "Fri":
        todayArrayDay = "Friday";
        break;
        case "Sat":
        todayArrayDay = "Saturday";
        break;
        case "Sun":
        todayArrayDay = "Sunday";
        break;
    }
    todayArrayDay = todayArray[0];
    var todayArrayDateConvertedMonth;
    switch(todayArray[1]){
        case "Jan":
        todayArrayDateConvertedMonth = 01
        break;
        case "Feb":
        todayArrayDateConvertedMonth = 02
        break;
        case "Mar":
        todayArrayDateConvertedMonth = 03
        break;
        case "Apr":
        todayArrayDateConvertedMonth = 04
        break;
        case "May":
        todayArrayDateConvertedMonth = 05
        break;
        case "Jun":
        todayArrayDateConvertedMonth = 06
        break;
        case "Jul":
        todayArrayDateConvertedMonth = 07
        break;
        case "Aug":
        todayArrayDateConvertedMonth = 08
        break;
        case "Sep":
        todayArrayDateConvertedMonth = 09
        break;
        case "Oct":
        todayArrayDateConvertedMonth = 10
        break;
        case "Nov":
        todayArrayDateConvertedMonth = 11
        break;
        case "Dec":
        todayArrayDateConvertedMonth = 12
        break;

    }
    todayArrayDate = todayArrayDateConvertedMonth+"/"+todayArray[2]+"/"+todayArray[3];
    $('#currentTime').text(todayArray[4]);
    $('#dayTime').text(todayArrayDay);
    $('#dateTime').text(todayArrayDate);
}

function init(){
    if (typeof navigator.geolocation == "undefined") {
        $("#error").text("Your browser doesn't support the Geolocation API");
        return;
    }

    $("#submitButton").on("click",function(event){
        event.preventDefault();
        var connection=database.ref("/userdata");
        var con=connection.push($("#nameInput").val());
        setCookie("commuter"+$("#nameInput").val()+con.key,"true",1);
        $("#nameSpan").text($('#nameInput').val());

        localStorage.clear();
        localStorage.setItem("name",$("#nameInput").val()); 
        localStorage.setItem("transport",$("#transport").val());
        localStorage.setItem("fromAddress",$("#addressFromInput").val()); 
        localStorage.setItem("toAddress",$("#addressToInput").val()); 
        localStorage.setItem("requiredArrivalTime", $("#requiredArrivalTime").val());
        localStorage.setItem("morningRoutineTime", $("#morningRoutineTime").val());

        getTodayDate();

        $("#myModal").modal('hide')
        $("#bodyWrap").show();
        $("button.btn").show();
        calculateRoute(localStorage.getItem("fromAddress"), localStorage.getItem("toAddress"));
        
    });

    if(checkCookie()) {
        calculateRoute(localStorage.getItem("fromAddress"), localStorage.getItem("toAddress"));
    }

    initAutocomplete();
}
    

