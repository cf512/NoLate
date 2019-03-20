//===================test harness for pushing data==============================
//always false data
//always defaults to firebaseArray
// cityConnection.set({
//     lastUpdate: Date.now(),
//     temp: 71.35,
//     pressure: 1026,
//     humidity: 36,
//     speed: 4.7,
//     description: "broken clouds",
//     icon: "04d",
//     id: 803,
//     main: "Clouds",
//     clouds: 24,
//     sunset: 1553042478,
// });

// always true data
//always defaults to AjaxArray
// cityConnection.set({
//     lastUpdate: $.now() + (1000 * 60 * 10.5),
//     temp: 71.35,
//     pressure: 1026,
//     humidity: 36,
//     speed: 4.7,
//     description: "broken clouds",
//     icon: "04d",
//     id: 803,
//     main: "Clouds",
//     clouds: 24,
//     sunset: 1553042478,
//    });
// ===================end test harness=====================


// initializing firebase outside a function
// var config = {
//     apiKey: "AIzaSyBqq61A0kK_3nScseexY0EAY26DBym3s7c",
//     authDomain: "firstteamproject-16be1.firebaseapp.com",
//     databaseURL: "https://firstteamproject-16be1.firebaseio.com",
//     projectId: "firstteamproject-16be1",
//     storageBucket: "firstteamproject-16be1.appspot.com",
//     messagingSenderId: "546682156707"
// };

// firebase.initializeApp(config);
// var database = firebase.database();
var localStorageObject = window.localStorage;
var cityConnection = "";







// ==============start of psuedocode comments, as if I had not done any development above===========================
// ===============================================================================================================



//global functions




//made into a function so I can call it both on load, and button click
//this contains:
// the if function for does a lastUpdate child exist for the city location of connection
// the if function for over 10 minutes old
// the AJAX call for weather data if we dont get the data from firebase

function updateWeatherDataFromLocal(snapshot) {
    //firebase inspect city last updated timestamp compare with Date.now()+10minutes
    //included the temp check in case its just a lastUpdate time stamp 
    if ((snapshot.hasChild("temp")) && (snapshot.hasChild("lastUpdate")) && (snapshot.val().lastUpdate > ($.now()-(10 * 60 * 1000)) ) ){
        //if less than use firebase data
        //this assumes that a full object of data exists in firebase
        var firebaseArray = [];
        firebaseArray.push("Temperature");
        firebaseArray.push(snapshot.val().temp + "'F");
        firebaseArray.push("Bar");
        firebaseArray.push(snapshot.val().pressure);
        firebaseArray.push("Humidity");
        firebaseArray.push(snapshot.val().humidity);
        firebaseArray.push("Wind");
        firebaseArray.push(snapshot.val().speed);
        firebaseArray.push("Description");
        firebaseArray.push(snapshot.val().description);
        firebaseArray.push("Cloud Coverage");
        firebaseArray.push(snapshot.val().clouds + "%");
        firebaseArray.push("Sunset");
        firebaseArray.push(snapshot.val().sunset);
        firebaseArray.push("Icon");
        firebaseArray.push(snapshot.val().icon);
        firebaseArray.push("Id");
        firebaseArray.push(snapshot.val().id);
        firebaseArray.push("main");
        firebaseArray.push(snapshot.val().main);
        firebaseArray.push(snapshot.val().name);

        updatePrintDisplay(firebaseArray);

        compareWeatherId(firebaseArray);



    } else {
        //if greater than = use Ajax call mixed with firebase data for today(); error handle for display to current data;
        // Ajax call to get data, then function calls printDisplay functions

        // Storing our query string for OpenWeatherMap API
        // This is our API key
        var APIKey = "f811d6890d096d171ee1586e5b3264b4";
        var toLocation = localStorageObject.toCity + ",us";

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + toLocation + "&APPID=f811d6890d096d171ee1586e5b3264b4&units=imperial";
        // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f811d6890d096d171ee1586e5b3264b4";

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After the data from the AJAX request comes back
            .then(function (response) {

                // Saving the response object
                var newResponse = response;

                //create var object of data = location.data + weather.data ...etc
                var ajaxResponseArray = [];
                ajaxResponseArray.push("Temperature");
                ajaxResponseArray.push(newResponse.main.temp + "'F");
                ajaxResponseArray.push("Bar");
                ajaxResponseArray.push(newResponse.main.pressure);
                ajaxResponseArray.push("Humidity");
                ajaxResponseArray.push(newResponse.main.humidity);
                ajaxResponseArray.push("Wind");
                ajaxResponseArray.push(newResponse.wind.speed);
                ajaxResponseArray.push("Description");
                ajaxResponseArray.push(newResponse.weather[0].description);
                ajaxResponseArray.push("Cloud Coverage");
                ajaxResponseArray.push(newResponse.clouds.all + "%");
                ajaxResponseArray.push("Sunset");
                ajaxResponseArray.push(newResponse.sys.sunset);
                ajaxResponseArray.push("Icon");
                ajaxResponseArray.push(newResponse.weather[0].icon);
                ajaxResponseArray.push("Id");
                ajaxResponseArray.push(newResponse.weather[0].id);
                ajaxResponseArray.push("main");
                ajaxResponseArray.push(newResponse.weather[0].main);
                ajaxResponseArray.push(newResponse.name);
         


                //=======================THEN YOU NEED TO SAVE DATA TO FIREBASE=========

                updateFirebase(newResponse);

                updatePrintDisplay(ajaxResponseArray);

                // inspect returned info for umbrella alert update
                compareWeatherId(ajaxResponseArray);
                
            });
    };
};


// =========================================================================================================




// function updatePrintDisplay(object);
//this updates the html text display
function updatePrintDisplay(array) {
    var newCollection = $('<div>');
    for (var i = 0; i < array.length - 7; i++) {
        var newP = $('<div>' + array[i] + ": " + array[i + 1] + '</div>');

        newCollection.append(newP);
        //iterating twice so that I am using array like a dictionary
        i++;
    };
    $('#weatherDataDump').html(newCollection);
};

//this is for a save data from AJAX to firebase collection
function updateFirebase(newResponse) {
    cityConnection = database.ref("/" + localStorageObject.toCity)
    cityConnection.set({
        lastUpdate: Date.now(),
        temp: newResponse.main.temp,
        pressure: newResponse.main.pressure,
        humidity: newResponse.main.humidity,
        speed: newResponse.wind.speed,
        description: newResponse.weather[0].description,
        icon: newResponse.weather[0].icon,
        id: newResponse.weather[0].id,
        main: newResponse.weather[0].main,
        clouds: newResponse.clouds.all,
        sunset: newResponse.sys.sunset,
        name: newResponse.name
    });
    cityConnection.once("value", function (snapshot) {
       
    });

};

//this checks the weatherId against a list
function compareWeatherId(array) {
    if (200 < array[17] && array[17] < 299) {
        $('#umbrellaAlert').text("Thunderstorms");
        appendIcon(array);
    } else if (300 < array[17] && array[17] < 399) {
        $('#umbrellaAlert').text("Drizzle");
        appendIcon(array);
    } else if (500 < array[17] && array[17] < 599) {
        $('#umbrellaAlert').text("It gone rain");
        appendIcon(array);
    } else if (600 < array[17] && array[17] < 699) {
        $('#umbrellaAlert').text("Snow");
        appendIcon(array);
    } else {
        $('#umbrellaAlert').text("Its going to be a wonderful day");
        $('#umbrellaAlert').append($('<img src="http://openweathermap.org/img/w/02d.png">'));
    };
};


//this updates the condition icon and text alert display
function appendIcon(array) {
    $('#umbrellaAlert').append($('<img src="http://openweathermap.org/img/w/' + array[15] + '.png">'));
}

// minseoks setCookie function as a global function called from within the .ready 
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}




// =============================================================================================================
// =============================================================================================================




// document.ready function for any print to screen function
$(document).ready(function () {

    // minseoks code from his submit.js file
    $(function () {

        var connection = database.ref("/userdata");

        //on submit of form
        $("#submitButton").on("click", function (event) {
            event.preventDefault();
            

            //added an update to weather on submit
            cityConnection = database.ref("/" + localStorageObject.toCity);
            cityConnection.once("value", function (snapshot) {
                updateWeatherDataFromLocal(snapshot);

            });


        });
    });

// this is the initial weather data load

    // NEED TO DO A COOKIE CHECK ON LOAD TO EVEN RUN THE LOAD IN THE FIRST PLACE
    //this pulls from the localStorage toCity from onload
    if(localStorageObject.getItem("toCity")!==null){ 
        cityConnection = database.ref("/"+localStorageObject.toCity);
        cityConnection.once("value", function (snapshot) {
            updateWeatherDataFromLocal(snapshot);
        });
    };    
});
