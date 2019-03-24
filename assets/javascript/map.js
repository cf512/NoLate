var duration;
var timeCheck=false;
var timeCheckFinished=false;
var date;
var transport;
var myOptions;
var mapObject;
var directionsService;
var directionsDisplay;
var directionsRequest;
var noResult=false;

function calculateRoute(from, to) { 

    //immediately print values that not need calculation
    $('#routineSpan').html(localStorage.getItem("morningRoutineTime")+" minutes");
    $('#arrivalTime').text(localStorage.getItem("requiredArrivalTime"));
    var fromAddressArray = localStorage.getItem("fromAddress").split(",");
    var toAddressArray = localStorage.getItem("toAddress").split(",");
    var fromAddressDiv = $('<div>');
    fromAddressArray.forEach(function(element){
        newDiv = $('<p>'+element+'</p>');
        fromAddressDiv.append(newDiv);
    });
    $('#fromAddressDiv').html(fromAddressArray);

    var toAddressDiv = $('<div>');
    toAddressArray.forEach(function(element){
        newDiv = $('<p>'+element+'</p>');
        toAddressDiv.append(newDiv);
    });
    $('#toAddressDiv').html(toAddressArray);

    noResult=false;
    myOptions = {
        zoom: 15,
        //scrollwheel:  false,
        center: {lat: 30.27, lng :-97.74}, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    
    transport=localStorage.getItem("transport").toUpperCase();

    date = new Date();
    arrivalText=date.toDateString()+" "+localStorage.getItem("requiredArrivalTime")+":00";

    if(moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ")<moment()) {
        arrivalDate=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ").add(1, 'days');
        startTime=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ").add(1, 'days');
    } else {
        arrivalDate=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ");
        startTime=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ");
    }

    startTime.subtract(30, 'minutes');
    googleCheck(from,to);     
}

function googleCheck(from,to) {
    if(!timeCheck) {
        directionsRequest = {
            origin: from,
            destination: to,
            travelMode: google.maps.DirectionsTravelMode[transport],
            unitSystem: google.maps.UnitSystem.METRIC,
            drivingOptions: {
                departureTime: startTime.toDate(),
                trafficModel: 'optimistic',
            }
        };
        timeCheck=true;
    }

    if (!timeCheckFinished) {
        timeCheckFinished=true;
        directionsService.route(
            directionsRequest,
            function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var duration=response.routes[0].legs[0].duration.value;
                    if(duration/60/60>5) {
                         noResult=true;
                         timeCheck=false;
                         timeCheckFinished=false;
                         var newDiv = $('<div>');
                         newDiv.append('<p> Oh. No! </p>');
                         newDiv.append('<p> The trip duration is too long for us.</p>');
                         newDiv.append('<p> Have you tried talking to a travel agent?</p>');   
                         $('#commuteDataDump').html(newDiv); 
                         return;
                    }
                    if(arrivalDate.diff(startTime, 'seconds')>=duration) {
                        directionsDisplay.setMap(mapObject);
                        directionsDisplay.setDirections(response);
                        directionsDisplay.getMap().setZoom(15);
                        localStorage.setItem('startTime', startTime.subtract(localStorage.getItem("morningRoutineTime"), 'minutes').format('HH:mm'));
                        localStorage.setItem('transitTime', duration);
                        timeCheck=false;
                        timeCheckFinished=false;
                        getTodayDate();
                        updateAlarmClock();
                        return;
                    } else {
                        startTime.subtract(30, 'minutes');
                        directionsRequest = {
                            origin: from,
                            destination: to,
                            travelMode: google.maps.DirectionsTravelMode[transport],
                            unitSystem: google.maps.UnitSystem.METRIC,
                            drivingOptions: {
                                departureTime: startTime.toDate(),
                                trafficModel: 'optimistic',
                            }
                        };
                        timeCheckFinished=false;
                        googleCheck(from,to);
                    }
                } else {
                    timeCheck=false;
                    timeCheckFinished=false; 
                    var newDiv = $('<div>');
                    newDiv.append('<p> Oh. No! </p>');
                    newDiv.append('<p> We were unable to get route information.</p>');
                    newDiv.append('<p> Please try again. </p>');   
                    $('#commuteDataDump').html(newDiv);
                }  
            }
        );
    }
}
