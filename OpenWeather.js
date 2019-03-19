// ==============start of psuedocode comments, as if I had not done any development above
// ==============================================================
//global functions
var arrayOfInclementWeather = ["rain", "snow", "fog", "drizzle", "sleet", "hail"];
var umbrellaIcon = "";
var umbrellaText = "";
var parsedMaxTempArray = [];
var parsedMinTempArray = [];
var parsedConditionsArray = [];

var day1 = {
    maxTemp: 0,
    minTemp: 0,
    condition: "",
    date: ""
};
var day2 = {
    maxTemp: 0,
    minTemp: 0,
    condition: "",
    date: ""
};
var day3 = {
    maxTemp: 0,
    minTemp: 0,
    condition: "",
    date: ""
};
var day4 = {
    maxTemp: 0,
    minTemp: 0,
    condition: "",
    date: ""
};
var day5 = {
    maxTemp: 0,
    minTemp: 0,
    condition: "",
    date: ""
};

// function updatePrintDisplay(object);
//this updates the html text display
function updatePrintDisplay(array){
    console.log("updatePrintDisplay ran");
    var newCollection = $('<div>This is a Div</div>');
    $('#parentDiv').append(newCollection);
    for(i=0; i < array.length-6; i++){
        newCollection.append($('<p>'+array[i]+": "+array[i+1]+'</p>')); 
        //iterating twice so that I am using array like a dictionary
        i++; 
    };

    $('#parentDiv').append(newCollection);
};

function updateFirebase(newResponse){
    console.log("updateFirebase");
    console.log(newResponse);
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
    });
    cityConnection.once("value", function (snapshot) {
        console.log(snapshot.val());
    });
    
};
//function updateChartJS(array);
//this pushes data into the forecastChart\

//function compareWeatherId(array);
//this checks the weatherId against a list
function compareWeatherId(array){
    console.log("compareWeatherRan");
    if(200 < array[17] && array[17] < 299){
        $('#umbrellaDiv').text("Thunderstorms");
    }else if(300 < array[17] && array[17] < 399){
        $('#umbrellaDiv').text("Drizzle");
    }else if(500 < array[17] && array[17] < 599){
        $('#umbrellaDiv').text("It gone rain");
    }else if(600 < array[17] && array[17] < 699){
        $('#umbrellaDiv').text("Snow");
    }else{
        $('#umbrellaDiv').text("Its going to be a wonderful day");
    }
};

// function updateUmbrellaAlertDisplay();
//this updates the condition icon and text alert display

//function parseForeCastDataIntoArray();
//this takes the API data and splits it into arrays per desired data type

//function parseMaxTempArray();
//this takes the max temp array and finds the greatest value

//function parseMinTempArray();
//this takes the min temp array and finds the least value

//function parseConditionsArray();
//this compares the condition array with an indexOf check for rain, snow or fog and updates umbrellaDisplay

//function turnDegreesIntoCardinalDirection();
//this turns a degree returned into a N, NW, etc..

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
var localStorageObject = window.localStorage;
var cityConnection = database.ref("/" + localStorageObject.toCity)

// document.ready function for any print to screen function
$(document).ready(function () {

    

    //test harness for pushing data
    //always false data
    //always defaults to AJAXArray
    cityConnection.set({
        lastUpdate: Date.now(),
        temp: 71.35,
        pressure: 1026,
        humidity: 36,
        speed: 4.7,
        description: "broken clouds",
        icon: "04d",
        id: 803,
        main: "Clouds",
        clouds: 24,
        sunset: 1553042478,
    });

    // always true data
    //always defaults to firebaseArray
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

    cityConnection.once("value", function (snapshot) {
        //firebase inspect city last updated timestamp compare with Date.now()+10minutes
        
        // Log everything that's coming out of snapshot
        // console.log(snapshot.val());
        // console.log(snapshot.val().lastUpdate);
        // console.log($.now());
        // console.log(snapshot.val().lastUpdate > $.now() + (1000 * 60 * 10));

        if (snapshot.val().lastUpdate > $.now() + (1000 * 60 * 10)){
        console.log("firebaseArray");
        //if less than = use firebase data
        var firebaseArray = [];
        firebaseArray.push("Temperature");
        firebaseArray.push(snapshot.val().temp+"'F");
        firebaseArray.push("Bar");
        firebaseArray.push(snapshot.val().pressure);
        firebaseArray.push("Humidity");
        firebaseArray.push(snapshot.val().humidity);
        firebaseArray.push("Wind");
        firebaseArray.push(snapshot.val().speed);
        firebaseArray.push("Description");
        firebaseArray.push(snapshot.val().description);
        firebaseArray.push("Cloud Coverage");
        firebaseArray.push(snapshot.val().clouds+"%");
        firebaseArray.push("Sunset");
        firebaseArray.push(snapshot.val().sunset);
        firebaseArray.push("Icon");
        firebaseArray.push(snapshot.val().icon);
        firebaseArray.push("Id");
        firebaseArray.push(snapshot.val().id);
        firebaseArray.push("main");
        firebaseArray.push(snapshot.val().main);
        console.log(firebaseArray);
        updatePrintDisplay(firebaseArray);

        compareWeatherId(firebaseArray);


        } else {
            console.log("AJAXArray");
            //if greater than = use Ajax call mixed with firebase data for today(); error handle for display to current data;
            // Ajax call to get data, then function calls printDisplay functions
          
            // Storing our query string for OpenWeatherMap API
            // This is our API key
            var APIKey = "f811d6890d096d171ee1586e5b3264b4";
            var toLocation = localStorageObject.toCity + ",us";

            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Austin,us&APPID=f811d6890d096d171ee1586e5b3264b4&units=imperial";
            // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f811d6890d096d171ee1586e5b3264b4";

            // Perfoming an AJAX GET request to our queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
            })

                // After the data from the AJAX request comes back
                .then(function (response) {

                    // Saving the response object (and console log for object check)
                    var newResponse = response;
                    console.log(response);
                  

                    //create var object of data = location.data + weather.data ...etc
                    var ajaxResponseArray = [];
                    ajaxResponseArray.push("Temperature");
                    ajaxResponseArray.push(newResponse.main.temp+ "'F");
                    ajaxResponseArray.push("Bar");
                    ajaxResponseArray.push(newResponse.main.pressure);
                    ajaxResponseArray.push("Humidity");
                    ajaxResponseArray.push(newResponse.main.humidity);
                    ajaxResponseArray.push("Wind");
                    ajaxResponseArray.push(newResponse.wind.speed);
                    ajaxResponseArray.push("Description");
                    ajaxResponseArray.push(newResponse.weather[0].description);
                    ajaxResponseArray.push("Cloud Coverage");
                    ajaxResponseArray.push(newResponse.clouds.all+"%");
                    ajaxResponseArray.push("Sunset");
                    ajaxResponseArray.push(newResponse.sys.sunset);
                    ajaxResponseArray.push("Icon");
                    ajaxResponseArray.push(newResponse.weather[0].icon);
                    ajaxResponseArray.push("Id");
                    ajaxResponseArray.push(newResponse.weather[0].id);
                    ajaxResponseArray.push("main");
                    ajaxResponseArray.push(newResponse.weather[0].main);
                    console.log(ajaxResponseArray);
               

                    //=======================THEN YOU NEED TO SAVE DATA TO FIREBASE=========
                    console.log("AJax sent to Firebase");

                    updateFirebase(newResponse);
                
                    console.log("after firebase");

                    updatePrintDisplay(ajaxResponseArray);

                    // inspect returned info for umbrella alert update
                    compareWeatherId(ajaxResponseArray);
                    //if weather.id = positive arrayOfInclementWeather.indexOf(id)
                    //if weather.description = positive arrayOfInclementWeather.indexOf(id)
                    //if rain or snow in last hour is positive, update snow or rain; if rain or snow in last hour >1in, update severe snow or rain; if snow or rain in last 3 hours > 6in, update severe snow or rain;
                    //calls updateUmbrellaDisplay();

                });

        }
    });




});







        
        //call turnDegreesIntoCardinalDirection();
        //add returned value to object of data

        // updatePrintDisplay(object of data)


        //===================End of first Ajax call then function=================================



        //=============Forecast AJAX call======================================================
        //=====================================================================================

        // Ajax call for forecast
        // var ForecastQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=Austin,us&APPID=f811d6890d096d171ee1586e5b3264b4&units=imperial";
        // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f811d6890d096d171ee1586e5b3264b4";

        // Perfoming an AJAX GET request to our queryURL
        // $.ajax({
        //     url: forecastQueryURL,
        //     method: "GET"
        // })

            // After the data from the AJAX request comes back
            // .then(function (response) {

            //     // Saving the response object (and console log for object check)
            //     var newResponse = response;
            //     console.log(response);
            //     console.log(newResponse);


                //=======================================================
                //=======you have to traverse the forecast the get the most accurate data for now
                //=======the API array starts at [0] = today @ 00:00:00

                // Creating Elements and storing the text data
                // var printArray = ["temp", "humidity", "description"]
                // printArray.forEach(function (element) {

                //     var newP = $("<p>");

                //     newP.text("test " + element);


                //     newDiv.append(newP);
                // })
                // for (i = 0; i < 39; i++) {
                //     newDiv.append('<p>' + JSON.stringify(newResponse.list[i]) + '</p>');
                // };

                // // Prepending the created elements to the HTML.document
                // $("#idOFWhatever").append(newDiv);
            // });
        //loop through array returned and build arrays for maxTemp minTemp and Conditions
        //set return to var parseMaxTempArray(date, arrayObject);
        //set return to var parseMinTempArray(date, arrayObject);
        //set return to var parseConditionsArray(date, arrayObject);
        // list.main.temp_max
        // list.main.temp_min
        // list.weather.id
        // list.weather.icon 
        // list.weather.description
        // list.weather.main

        //Firebase call for forecast today REMINDER: today = day0 

        //build object of data including day0
        //save all data back to firebase city object including timestamp of update Date.now()
        //should overwrite current data for the city object, including all previous dates

        //for firebase return of condition = adverse condition update umbrellaicon and umbrellaText
        //call updateChartJS(object of data)


        // ==============================END of second AJAX call - forecast =============================================================


        
