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
    for(i=0; i < array.length; i++){
        console.log("for loop" + array[i]);
        newCollection.append($('<p>'+array[i]+": "+array[i+1]+'</p>')); 
        //iterating twice so that I am using array like a dictionary
        console.log(i);
        i++; 
        console.log(i);
    };

    console.log(newCollection);
    $('#parentDiv').append(newCollection);
};

//function updateChartJS();
//this pushes data into the forecastChart

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

// document.ready function for any print to screen function
$(document).ready(function () {

    var cityConnection = database.ref("/" + localStorageObject.toCity)

    //test harness for pushing data
    //always false data
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

    //always true data
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

    cityConnection.on("value", function (snapshot) {
        //firebase inspect city last updated timestamp compare with Date.now()+10minutes
        
        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().lastUpdate);
        console.log($.now());
        console.log(snapshot.val().lastUpdate > $.now() + (1000 * 60 * 10));

        if (snapshot.val().lastUpdate > $.now() + (1000 * 60 * 10)){
        //if less than = use firebase data
        var firebaseArray = [];
        firebaseArray.push("Temperature");
        firebaseArray.push(snapshot.val().temp+"'F");
        //     main.temp: 71.35,
        //     main.pressure: 1026,
        //     main.humidity: 36,
        //     wind.speed: 4.7,
        //     weather.description: "broken clouds",
        //     weather.icon: "04d",
        //     weather.id: 803,
        //     weather.main: "Clouds",
        //     clouds.all: 24,
        //     sys.sunset: 1553042478,
        
        updatePrintDisplay(firebaseArray);


        } else {
            //if greater than = use Ajax call mixed with firebase data for today(); error handle for display to current data;
            //ajax call actually goes here/
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
                    console.log(newResponse);

                    //create var object of data = location.data + weather.data ...etc
                    var ajaxResponseArray = [];
                    ajaxResponseArray.push("Temperature");
                    ajaxResponseArray.push(newResponse.main.temp+ "'F");
                     //     main.temp: 71.35,
                    //     main.pressure: 1026,
                    //     main.humidity: 36,
                    //     wind.speed: 4.7,
                    //     weather.description: "broken clouds",
                    //     weather.icon: "04d",
                    //     weather.id: 803,
                    //     weather.main: "Clouds",
                    //     clouds.all: 24,
                    //     sys.sunset: 1553042478,

                    updatePrintDisplay(ajaxResponseArray)
                    

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


        // inspect returned info for umbrella alert update
        //if weather.id = positive arrayOfInclementWeather.indexOf(id)
        //if weather.description = positive arrayOfInclementWeather.indexOf(id)
        //if rain or snow in last hour is positive, update snow or rain; if rain or snow in last hour >1in, update severe snow or rain; if snow or rain in last 3 hours > 6in, update severe snow or rain;
        //calls updateUmbrellaDisplay();
