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

var color = Chart.helpers.color;
var horizontalBarChartData = {
    labels: [],
    datasets: [{
        label: 'Max Temp',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        data: []
    }, {
        label: 'Min Temp',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: []
    }]

};




var arrayOfInclementWeather = ["Rain", "Snow", "Drizzle", "Thunderstorm", "Fog"];
var umbrellaIcon = "";
var umbrellaText = "";
var parsedMaxTempArray = [];
var parsedMinTempArray = [];
var parsedConditionsArray = [];

var forecastDays = [
    day0 = {
        maxTemp: 0,
        minTemp: 0,
        condition: "",
        date: ""
    },
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
    }
]


function updateChartJS(junk, array2, dateArray) {
    //this pushes data into the forecastChart\
    var maxValues = junk;
    maxValues.forEach(function(element) {
        horizontalBarChartData.datasets[0].data.push(element);
    });
    var minValues = array2;
    minValues.forEach(function (element) {
        horizontalBarChartData.datasets[1].data.push(element);
    });
    var dateValues = dateArray;
    dateValues.forEach(function(element){
        horizontalBarChartData.labels.push(element);
    });
//adds to datasets[0].data[i];
//adds to datasets[1].data[i];
};

function updateChartData() {
    //this will need to ask if weatherForecastData has been updated in the last 10minutes, much like the other code
    //can I leverage written code for the update weather check
    //firebase data will need to call updateChartJS(junk, array2, dateArray)
    
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
            // Saving the response object
            // var newResponse = response;
            console.log(response);
            // parseForecastDataIntoArray(newResponse);
    
            //this way the update Chart chain is embedded in AJAX command for AJAX data
    
            var objectOfData = [1, 2, 3, 4, 5];
            var fakedArray = [1, 2, 3, 4, 5];
            var fakedArray2 = [5, 4, 3, 2, 1];
            updateChartJS(fakedArray, fakedArray2, objectOfData);

            var ctx = document.getElementById('canvas')
            // .getContext('2d');
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
                        display: false,
                    },
                    title: {
                        display: true,
                        text: '5 Day Forecast'
                    }
                }
            });
            //=======================================================
            //=======you have to traverse the forecast the get the most accurate data for now
            //=======the API array starts at [0] = today @ 00:00:00 format= "2019-03-21 00:00:00"
    
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
    
            // ==============================END of second AJAX call - forecast =============================================================
    
        });
    };



// //this takes the max temp array and finds the greatest value
// function parseMaxTempArray(maxTempArray){
//     //compare all values and find greatest value
//     //set the forecastDays[i].maxTemp=greatest value

// }


// function parseMinTempArray(minTempArray){
// //this takes the min temp array and finds the least value
// //compare all values and find least value
//     //set the forecastDays[i].minTemp=leastvalue

// };

// function parseConditionsArray(conditionsArray){
//     //compares all values to a value chain and first one that is >= 0 returns
//     //set the forecastDays[i].condition=returned value
// };
//this compares the condition array with an indexOf check for rain, snow or fog and updates umbrellaDisplay

// function parseForecastDataIntoArray(object){
// //this takes the API data and splits it into arrays per desired data type
// //function parseForecastDataIntoArray();

// // var objectOfIndexes={0index, 1index, 2index, 3index, 4index}
// // var targetIndex = first index in forecast data
// //get date of targetIndex in forecast data

// //I could embed this in a for loop that happens 5 times (or while loop targetIndex < array.length)
// //while the current date is equal to the date of the targetIndex add this data to the parseArrays
// var minTempArray = [];
// var maxTempArray = [];
// var conditionsArray = [];
// parseMaxTempArray(maxTempArray);
// parseMinTempArray(minTempArray);
// parseConditionsArray(conditionsArray);
// //set forecastDays[i].date = targetIndex
// //when no longer true
// //then set targetIndex = date of the next index
// //loop iteration naturally ends and the next for loop happens

// // end of for loop

// //once the data is into the forecastObject
// var junk = [];
// var array2 = [];
// var labels = [];
// // for loop 5times{
// //does the forEachbelow then
// //junk.push(forecastDays[i].maxTemp)
// //array2.push(forecastDays[i].minTemp)
// //labels.push(forecaseDays[i].date)
// }



window.onload = function () {
    updateChartData();


    // ===============this is the on.ready call to print the chart===============================================

   

};