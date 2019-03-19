function calculateRoute(from, to) {

    // Center initialized to Austin, TX
    var myOptions = {
      zoom: 10,
      center: new google.maps.LatLng(30.27, -97.74),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Draw the map
    var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

    var howLong = 0;
    console.log(howLong);

    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: 'optimistic',
      }
    };
    console.log(howLong);
    directionsService.route(
      directionsRequest,
      function(response, status)
      {
        if (status == google.maps.DirectionsStatus.OK)
        {
          new google.maps.DirectionsRenderer({
            map: mapObject,
            directions: response
          });
          console.log(response.routes[0].legs[0].duration.value); // the duration of the trip
          howLong = ((response.routes[0].legs[0].duration.value)/60); // converted from seconds to minutes
          console.log(howLong);
          $("#distance").append("This route will take: " + howLong + " minutes.");
        }
        else
          $("#error").append("Unable to retrieve your route<br />");
      }
    );    
  }

  $(document).ready(function() {
    // Checks if the browser supports the Geolocation API
    if (typeof navigator.geolocation == "undefined") {
      $("#error").text("Your browser doesn't support the Geolocation API");
      return;
    }

    $("#from-link, #to-link").click(function(event) {
      event.preventDefault();
      var addressId = this.id.substring(0, this.id.indexOf("-"));

      navigator.geolocation.getCurrentPosition(function(position) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK)
            $("#" + addressId).val(results[0].formatted_address);
          else
            $("#error").append("Unable to retrieve your address<br />");
        });
      },
      function(positionError){
        $("#error").append("Error: " + positionError.message + "<br />");
      },
      {
        enableHighAccuracy: true,
        timeout: 10 * 1000 // 10 seconds
      });
    });

    $("#calculate-route").submit(function(event) {
      event.preventDefault();
      calculateRoute($("#from").val(), $("#to").val());
    });
  });