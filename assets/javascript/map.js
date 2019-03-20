$(function() {
    function calculateRoute(from, to) {
        var myOptions = {
            zoom: 10,
            center: new google.maps.LatLng(30.27, -97.74), 
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var transport=$("#transport").val().toUpperCase();
        var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
        var directionsService = new google.maps.DirectionsService();
        var date = new Date();
        date=date.toDateString()+" "+$("#morningRoutineTime").val();
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
                console.log(response);
                if (status == google.maps.DirectionsStatus.OK) {
                    new google.maps.DirectionsRenderer({
                        map: mapObject,
                        directions: response
                    });
                    $("#googleMapDump p").text("");
                    $("#googleMapDump p").append("transport : "+$("#transport").val());
                    $("#googleMapDump p").append("<br>From : "+response.routes[0].legs[0].start_address);
                    $("#googleMapDump p").append("<br>To : "+response.routes[0].legs[0].end_address);
                    $("#googleMapDump p").append("<br>total distance : "+response.routes[0].legs[0].distance.text);
                    $("#googleMapDump p").append("<br>total time : "+response.routes[0].legs[0].duration.text);
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
  
    $("#addressFromInput-link, #addressToInput-link").click(function(event) {
        event.preventDefault();
        var addressId = this.id.substring(0, this.id.indexOf("-"));
        navigator.geolocation.getCurrentPosition(function(position) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $("#" + addressId).val(results[0].formatted_address);
                }
                    
                else {
                    $("#error").append("Unable to retrieve your address<br />");
                }
            });
        },
        function(positionError){
            $("#error").append("Error: " + positionError.message + "<br />");
        },
        {
            enableHighAccuracy: true,
            timeout: 10 * 1000 
        });
    });

    $("#submitButton").on("click",function(event){
        event.preventDefault();
        calculateRoute($("#addressFromInput").val(), $("#addressToInput").val());
    });
});