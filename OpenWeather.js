//======Start of running script=========


$(document).ready(function () {

    // Storing our query string for OpenWeatherMap API

    // This is our API key
    var APIKey = "f811d6890d096d171ee1586e5b3264b4";
    var toLocation = localStorageObject.toCity + ",us";

    // Here we are building the URL we need to query the database
    // api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
    console.log(24 * 60 * 60 * 100);
    console.log(Date.now());

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Austin,us&APPID=f811d6890d096d171ee1586e5b3264b4&units=imperial";
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
            var newDiv = $("<div id='weatherPrintDiv'></div>");

            //=======================================================
            //=======you have to traverse the forecast the get the most accurate data for now
            //=======the API array starts at [0] = today @ 00:00:00

            // Creating Elements and storing the text data
            var printArray = ["temp", "humidity", "description"]
            printArray.forEach(function (element) {

                var newP = $("<p>");

                newP.text("test " + element);


                newDiv.append(newP);
            })
            for (i = 0; i < 39; i++) {
                newDiv.append('<p>' + JSON.stringify(newResponse.list[i]) + '</p>');
            };

            // Prepending the created elements to the HTML.document
            $("#idOFWhatever").append(newDiv);
        });
});


// ==============start of psuedocode comments, as if I had not done any development above
// ==============================================================
//global functions
var umbrellaIcon = "";
var umbrellaText = "";
var parsedMaxTempArray = [];
var parsedMinTempArray = [];
var parsedConditionsArray = [];
var arrayOfInclementWeather = ["rain", "snow", "fog", "drizzle", "sleet", "hail"];
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


        // document.ready function for any print to screen functions



        //firebase inspect city last updated timestamp compare with Date.now()+10minutes
        //if less than = use firebase data
        //if greater than = use Ajax call mixed with firebase data for today(); error handle for display to current data;

        //ajax call actually goes here/
        // Ajax call to get data, then function calls printDisplay functions

        // Ajax call to get current data to update text display
        // current weather data retreives
        //console.log to start and inspect for the following data
        // rain in last hour 
        // rain in last three hours 
        // snow in last hour 
        // snow in last three hours
        // sys.sunset
        // weather.description
        // weather.icon
        // weather.id 
        // weather.main
        // main.temp
        // main.pressure
        // main.humidity
        // wind.speed
        // wind.degs
        // clouds.all



        //create var object of data = location.data + weather.data ...etc
        //call turnDegreesIntoCardinalDirection();
        //add returned value to object of data

        // updatePrintDisplay(object of data)


        //===================End of first Ajax call then function=================================



        //=============Forecast AJAX call======================================================
        //=====================================================================================

        // Ajax call for forecast
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


        // inspect returned info for umbrella alert update
        //if weather.id = positive arrayOfInclementWeather.indexOf(id)
        //if weather.description = positive arrayOfInclementWeather.indexOf(id)
        //if rain or snow in last hour is positive, update snow or rain; if rain or snow in last hour >1in, update severe snow or rain; if snow or rain in last 3 hours > 6in, update severe snow or rain;
        //calls updateUmbrellaDisplay();
