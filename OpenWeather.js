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
//function updateChartJS(array);
//this pushes data into the forecastChart\

//function parseForeCastDataIntoArray();
//this takes the API data and splits it into arrays per desired data type

//function parseMaxTempArray();
//this takes the max temp array and finds the greatest value

//function parseMinTempArray();
//this takes the min temp array and finds the least value

//function parseConditionsArray();
//this compares the condition array with an indexOf check for rain, snow or fog and updates umbrellaDisplay


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

