# NoLate App
UTAUS201902FSF3-FT/GroupProject1

## Site
https://cf512.github.io/NoLate/

### About Our Project

Facts:
*It can be challenging to get to work or class on time for anyone who commutes.
*15-20% of U.S. workers are late to the job on a regular basis (Inc. Magazine, 2018).
*Google Maps has limitations and is invasive with location data needs.

Our Solution:
*Our app provides real-time advice and a low effort update on when to leave to get to work or class on time.
*Our solution is more simple, less invasive, and more accurate than existing solutions.

### Technologies Used

*HTML5
*CSS3
*jQuery
*Javascript
*Twitter Bootstrap
*Moment.js
*Google Maps Javascript API
*OpenWeatherMap API
*Firebase
*Local Storage
*Cookies

### Cookie Check

```
if(cookie.indexOf(“commuter”)<0) {
	Present form in Modal to get info
} else {
	Load data from LocalStorage & bypass Input form   } 
OnSubmit{
John -> push his name to firebase -> get Unique_Key
Cookie key = “commuter”+John+Unique_Key
}
```

When a user comes to our website, our site checks for cookies. If the user has cookies, then we skip the input form and go to the page. If the user doesn’t have a cookie, then they have to put 
their information into our modal forms. When the form is submitted the username is saved in firebase and we can get a unique_key from that. Then a cookie key is generated like “commuter string + 
username + unique_key”. After the cookie key is generated, the site can check the cookies using this indexOf condition.

### Form Validation

1. Form input validation (preventing empty data) 
2. Geolocation API validation check (for Google map api)
3. Google autocomplete validation check (for address data integrity)

```
1.form_button.disabled=true
2.if (typeof navigator.geolocation 
                 == "undefined") { … }
3.google.maps.Geocoder.geocode
(address, function(results, status) {
      if (status == 
google.maps.GeocoderStatus.OK) { … } });
```

First, we make sure the submit button is disabled until all inputs have been given values. 
Second is for validation of using Google maps api. Some websites don’t support Google maps api, so we have to add this condition.
Third is for autocomplete validation. We used autocomplete techniques for inputting addresses. But sometimes a user can input an invalid address without using autocomplete. So to prevent this 
problem, we are using this geocoder function.

### Local storage & Place library (AutoComplete)

*User input : Name, Required Arrival Time, Morning Routine Time , Transportation Method, Addresses
*AutoComplete(+Place lib) : address of city (to, from), city name
*Google map calculation : Transit Time, Departure Time
*Alarm Calculations
*→ All data is stored in Local storage

This is the user’s information stored in local storage. when using autocomplete address and place library we can automatically get the specific information of location like this.

### Firebase / OpenWeatherMap API w/AJAX

-Problem: OpenWeatherMap API only updates every 10 minutes.
-Solution: Save data for a city to firebase for access during 10min interval.

A.	Create a lastUpdatedCheck() and lastUpdated datapoint
B.	Create an Ajax call to OpenWeatherMap API
C.	Create a saveToFirebase(), and a loadFromFirebase()

### Alarm and Date/Time

*Moment.js for Google Map API departure time
	*moment(dateVar).format(‘HH:mm a’);
	*moment(dateVar).add(1,”days”);
*new Date.toString() handling
	*anArray = departureTime.toString.split(“:”);
	*departureTimeminutes = anArray[1] - (somethingInMilliseconds *1000*60);
	*departureTime= anArray[0]+”:”+departureTimeMinutes;
*Carry the One
	*if(anythingMinutes > 60) {hours++}
	*if(anythingMinutes < 0) {hours-1 ; anythingMinutes + 60}
