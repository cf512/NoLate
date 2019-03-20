$(function() {
    function calculateRoute(from, to) {
        var myOptions = {
            zoom: 10,
            center: new google.maps.LatLng(30.27, -97.74), 
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var transport=localStorage.getItem("transport").toUpperCase();
        var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
        var directionsService = new google.maps.DirectionsService();
        var date = new Date();
        date=date.toDateString()+" "+localStorage.getItem("Morning Routine Time");

        date=moment(date).add(7, 'days')["_d"];
       
        var directionsRequest = {
            origin: from,
            destination: to,
            travelMode: google.maps.DirectionsTravelMode[transport],
            unitSystem: google.maps.UnitSystem.METRIC,
            drivingOptions: {
                departureTime: new Date(date),
                trafficModel: 'optimistic',
            }
        };
        
        directionsService.route(
            directionsRequest,
            function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    new google.maps.DirectionsRenderer({
                        map: mapObject,
                        directions: response
                    });
                    $("#googleMapDump p").text("");
                    $("#googleMapDump p").append("Transport : "+transport);
                    $("#googleMapDump p").append("<br>From : "+response.routes[0].legs[0].start_address);
                    $("#googleMapDump p").append("<br>To : "+response.routes[0].legs[0].end_address);
                    $("#googleMapDump p").append("<br>Total distance : "+response.routes[0].legs[0].distance.text);
                    $("#googleMapDump p").append("<br>Total time : "+response.routes[0].legs[0].duration.text);
                    localStorage.setItem('transitTime', response.routes[0].legs[0].duration.value);
                } else {
                    $("#error").append("Unable to retrieve your route<br />");
                }  
            }
         );
    }

    if (typeof navigator.geolocation == "undefined") {
        $("#error").text("Your browser doesn't support the Geolocation API");
        return;
    }

    $("#submitButton").on("click",function(event){
        event.preventDefault();
        calculateRoute(localStorage.getItem("fromAddress"), localStorage.getItem("toAddress"));
        updateAlarmClock();
    });
});