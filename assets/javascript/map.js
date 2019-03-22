var duration;
var timeCheck=false;
var timeCheckFinished=false;
var date = new Date();
var transport;
var myOptions;
var mapObject;
var directionsService;
var directionsDisplay;
var directionsRequest;

function calculateRoute(from, to) { 
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
    
    //var reqTime=localStorage.getItem("requiredArrivalTime").split(":");

    //if(!timeCheck) {
        arrivalText=date.toDateString()+" "+localStorage.getItem("requiredArrivalTime")+":00";

        if(moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ")<moment()) {
            arrivalDate=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ").add(1, 'days');
            startTime=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ").add(1, 'days');
        } else {
            arrivalDate=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ");
            startTime=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ");
        }
        startTime.subtract(30, 'minutes');
  //  }

    
    // arrivalDate=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ").add(1, 'days');
    // startTime=moment(arrivalText,"ddd MMM DD YYYY HH:mm:ss ZZ").add(1, 'days');
    //date=moment(date,"ddd MMM DD YYYY HH:mm:ss ZZ").add(1, 'days').toDate();
    //.toDate();
    //localStorage.getItem("morningRoutineTime");

    //don't use this.
    //var startTime=arrivalDate;

    //while (!timeCheck) {
   // while (!timeCheckFinished) {
   // for(var i=0; i<48; i++) {

//    if (googleCheck(from,to)) {
//        //return duration;

//        return;
//    } else {
//         calculateRoute(from, to);
//    }
        googleCheck(from,to);
        
        
   // }
}

function googleCheck(from,to) {

  //  if(timeCheck==false) {
        //console.log(timeCheck);
        //timeCheck=true;
        //console.log(timeCheck);

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
                // console.log(response);
                    if (status == google.maps.DirectionsStatus.OK) {
                        var duration=response.routes[0].legs[0].duration.value;
                        console.log("체크포인트",arrivalDate.diff(startTime, 'seconds')>=duration);
                        if(arrivalDate.diff(startTime, 'seconds')>=duration) {
                            console.log("엔드");
                            directionsDisplay.setMap(mapObject);
                            directionsDisplay.setDirections(response);
                            directionsDisplay.getMap().setZoom(15);
                            //timeCheckFinished=true;
                            localStorage.setItem('startTime', startTime.subtract(localStorage.getItem("morningRoutineTime"), 'minutes').format('HH:mm'));
                            localStorage.setItem('transitTime', duration);
                            updateAlarmClock();
                            // return true;
                            return;
                        } else {
                            console.log("엔드 엘스");
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
                            // return false;
                            googleCheck(from,to);
                        }
    
                        // $("#googleMapDump p").text("");
                        // $("#googleMapDump p").append("Transport : "+transport);
                        // $("#googleMapDump p").append("<br>From : "+response.routes[0].legs[0].start_address);
                        // $("#googleMapDump p").append("<br>To : "+response.routes[0].legs[0].end_address);
                        // $("#googleMapDump p").append("<br>Total distance : "+response.routes[0].legs[0].distance.text);
                        // $("#googleMapDump p").append("<br>Total time : "+response.routes[0].legs[0].duration.text);
    
                        //
                        
                    } else {
                        $("#error").append("Unable to retrieve your route<br />");
                    }  
                }
            );

        }
    
        
    //}
}
