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

function setCookie(cname, cvalue, exdays) {
var d = new Date();
d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
var expires = "expires="+d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

    localStorage.clear();
    localStorage.setItem("name",$("#nameInput").val()); 
    localStorage.setItem("transport",$("#transport").val());
    localStorage.setItem("fromAddress",$("#addressFromInput").val()); 
    localStorage.setItem("toAddress",$("#addressToInput").val()); 
    localStorage.setItem("requiredArrivalTime", $("#requiredArrivalTime").val());
    localStorage.setItem("morningRoutineTime", $("#morningRoutineTime").val());

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
