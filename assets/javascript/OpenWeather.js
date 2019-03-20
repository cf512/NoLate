window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
var colorNames = Object.keys(window.chartColors);
var MONTHS = ['1st day', '2nd day', '3rd day', '4th day', '5th day'];
var color = Chart.helpers.color;
var horizontalBarChartData = {
    labels: ['1st day', '2nd day', '3rd day', '4th day', '5th day'],
    datasets: [{
        label: 'Max Temp',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        data: [
            67,
            72,
            65,
            68,
            71
        ]
    }, {
        label: 'Min Temp',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: [
            54,
            49,
            48,
            54,
            51
        ]
    }]

};

var arrayOfInclementWeather = ["rain", "snow", "fog", "drizzle", "sleet", "hail"];
var umbrellaIcon = "";
var umbrellaText = "";
var parsedMaxTempArray = [];
var parsedMinTempArray = [];
var parsedConditionsArray = [];
var forecastDays = [
    day1 = {
        maxTemp: 0,
        minTemp: 0,
        condition: "",
        date: ""
    },
    day2 = {
        maxTemp: 0,
        minTemp: 0,
        condition: "",
        date: ""
    },
    day3 = {
        maxTemp: 0,
        minTemp: 0,
        condition: "",
        date: ""
    },
    day4 = {
        maxTemp: 0,
        minTemp: 0,
        condition: "",
        date: ""
    },
    day5 = {
        maxTemp: 0,
        minTemp: 0,
        condition: "",
        date: ""
    }
]
//function updateChartJS(array);
//this pushes data into the forecastChart\
//adds to datasets[0].data[i];
//adds to datasets[1].data[i];

//function parseMaxTempArray();
//this takes the max temp array and finds the greatest value

//function parseMinTempArray();
//this takes the min temp array and finds the least value

//function parseConditionsArray();
//this compares the condition array with an indexOf check for rain, snow or fog and updates umbrellaDisplay


//this takes the API data and splits it into arrays per desired data type
//function parseForeCastDataIntoArray();
 // for loop 5times{
            //does the forEachbelow then
            //calls parse maxTemp;
            //calls parse minTemp;
            //calls parse conditions;
            
        
        //forEach Loop .list[i]{
        //add to maxTempArray;
        //add to minTempArray;
        //add to conditionsArray;





window.onload = function () {
    // ==================here is where I threw the forecast AJAX function for everything========
    //=============Forecast AJAX call======================================================
    //=====================================================================================
    // api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
    // Ajax call for forecast
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Austin,us&APPID=f811d6890d096d171ee1586e5b3264b4&units=imperial";
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f811d6890d096d171ee1586e5b3264b4";

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function (response) {
        // After the data from the AJAX request comes back
        // Saving the response object (and console log for object check)
        var newResponse = response;
        console.log(response);
        console.log(newResponse);


        //=======================================================
        //=======you have to traverse the forecast the get the most accurate data for now
        //=======the API array starts at [0] = today @ 00:00:00 format= "2019-03-21 00:00:00"

        //parseForecastDataIntoArray();

       

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






        var ctx = document.getElementById('canvas').getContext('2d');
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: horizontalBarChartData,
            options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                    rectangle: {
                        borderWidth: 2,
                    }
                },
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: '5 Day Forecast'
                }
            }
        });

    });







}