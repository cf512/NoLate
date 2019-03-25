
var localStorageObject = window.localStorage;
var cityConnection = "";

//global functions

//made into a function so I can call it both on load, and button click
//this contains:
// the if function for does a lastUpdate child exist for the city location of connection
// the if function for over 10 minutes old
// the AJAX call for weather data if we dont get the data from firebase

function updateWeatherDataFromLocal(snapshot, location) {
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
        firebaseArray.push("Cloud&nbsp;&");
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

        updatePrintDisplay(firebaseArray, location);
        appendIcon(firebaseArray, location)
        // compareWeatherId(firebaseArray);



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
                console.log("ajax response object");
                console.log(response);
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
                ajaxResponseArray.push("Cloud&nbsp;%");
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

                updatePrintDisplay(ajaxResponseArray, location);
                appendIcon(ajaxResponseArray, location);
                // inspect returned info for umbrella alert update
                // compareWeatherId(ajaxResponseArray);
                
            });
    };
};


// =========================================================================================================




// function updatePrintDisplay(object);
//this updates the html text display
function updatePrintDisplay(array, location) {
    // var newCollection = $('<div>');
    // for (var i = 0; i < array.length - 7; i++) {
    //     var newP = $('<div>' + array[i] + ": " + array[i + 1] + '</div>');

    //     newCollection.append(newP);
    //     //iterating twice so that I am using array like a dictionary
    //     i++;
    // };
    // $('#weatherDataDump').html(newCollection);
    if(location === "your"){
    $("#yourWeatherTemp").text(array[1]);
    }else{
    $('#destinationWeatherTemp').text(array[1]);
    }
    

    //print to canvas area

    // indexes[2,4,6,8,10], and their values
    var newTable = $('<table>');
    var everyOtherFlag = false;
    var KeyArray=[];
    var ValueArray=[];
    // build arrays of the weather data I want
    for (i=0; i<10; i++){
        KeyArray.push(array[i+2]);
        ValueArray.push(array[i+3])
        i++;        
    };
    console.log('arrays');
    console.log(KeyArray);
    console.log(ValueArray);
    // print those arrays to a table
    var newHeaderRow = $('<tr>');
    for (i=0;i<5;i++){
        var newHeader = $("<th>"+KeyArray[i]+"</th>");
        newHeaderRow.append(newHeader);
    };
    newTable.append(newHeaderRow);
    var newDataRow = $('<tr>');
    for (i=0;i<5;i++){
        var newData = $("<td>"+ValueArray[i]+"</td>");
        newDataRow.append(newData);
    };
    newTable.append(newDataRow);
    console.log(newTable);

    $('#forecastDivInner').html(newTable);
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
// function compareWeatherId(array) {
//     if (200 < array[17] && array[17] < 299) {
//         $('#umbrellaAlert').text("Thunderstorms");
//         appendIcon(array);
//     } else if (300 < array[17] && array[17] < 399) {
//         $('#umbrellaAlert').text("Drizzle");
//         appendIcon(array);
//     } else if (500 < array[17] && array[17] < 599) {
//         $('#umbrellaAlert').text("It gone rain");
//         appendIcon(array);
//     } else if (600 < array[17] && array[17] < 699) {
//         $('#umbrellaAlert').text("Snow");
//         appendIcon(array);
//     } else {
//         $('#umbrellaAlert').text("Its going to be a wonderful day");
//         $('#umbrellaAlert').append($('<img src="https://openweathermap.org/img/w/02d.png">'));
//     };
// };


//this updates the condition icon and text alert display
function appendIcon(array, location) {
    if(location === "your"){
        $('#yourWeatherIcon').html($('<img src="https://openweathermap.org/img/w/' + array[15] + '.png">'));
        }else{
            $('#destinationWeatherIcon').html($('<img src="https://openweathermap.org/img/w/' + array[15] + '.png">'));
        }
}


// =============================================================================================================
// =============================================================================================================


// document.ready function for any print to screen function
$(document).ready(function () {
        //on submit of form
    $("#submitButton").on("click", function (event) {
        event.preventDefault();
        stopAlarm();

        //added an update to weather on submit
        cityConnection = database.ref("/" + localStorageObject.toCity);
        cityConnection.once("value", function (snapshot) {
            updateWeatherDataFromLocal(snapshot, "destination");

        });
        cityConnection = database.ref("/" + localStorageObject.fromCity);
        cityConnection.once("value", function (snapshot) {
            updateWeatherDataFromLocal(snapshot, "your");

        });

    });

// this is the initial weather data load
    if(localStorageObject.getItem("toCity")!==null){ 
        cityConnection = database.ref("/"+localStorageObject.toCity);
        cityConnection.once("value", function (snapshot) {
            updateWeatherDataFromLocal(snapshot, "destination");
        });
        cityConnection = database.ref("/"+localStorageObject.fromCity);
        cityConnection.once("value", function (snapshot) {
            updateWeatherDataFromLocal(snapshot, "your");
        });
    }else{
        
    };    
    // NEED TO DO A COOKIE CHECK ON LOAD TO EVEN RUN THE LOAD IN THE FIRST PLACE
    //this pulls from the localStorage toCity from onload
  
});
