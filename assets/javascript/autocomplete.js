var autocomplete1;
var autocomplete2; 
var autoResult1=false;
var autoResult2=false;
var service;

var componentForm = {
    locality: 'short_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name'
  }; 

function locationCheck1(){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {"address": $("#addressFromInput").val()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var place1 = autocomplete1.getPlace();
        if(place1!=undefined && place1.address_components!=null) {
          for (var i = 0; i < place1.address_components.length; i++) {
            var addressType = place1.address_components[i].types[0]; 
            if(addressType=="locality") {
              localStorage.setItem("fromCity",place1.address_components[i][componentForm[addressType]]); 
              autoResult1=true;
              inputCheck();
            } 
          }
        } else {
          $("#addressFromInput").val("");
          autoResult1=false;
        }
      } else {
        $("#addressFromInput").val("");
        autoResult1=false;
      }
    });
}

function locationCheck2(){
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( {"address": $("#addressToInput").val()}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var place2 = autocomplete2.getPlace();
      if(place2!=undefined && place2.address_components!=null) {
        for (var i = 0; i < place2.address_components.length; i++) {
          var addressType = place2.address_components[i].types[0]; 
          if(addressType=="locality") {
            localStorage.setItem("toCity",place2.address_components[i][componentForm[addressType]]); 
            autoResult2=true;
            inputCheck();
          } 
        }
      } else {
        $("#addressToInput").val("");
        autoResult2=false;
      }
    } else {
      $("#addressToInput").val("");
      autoResult2=false;
    }
  });
}

function AutoCompleteCheck(){
  autocomplete1 = initAutocomplete(document.getElementById('addressFromInput'));
  autocomplete2 = initAutocomplete(document.getElementById('addressToInput'));
  //autocomplete1.addListener('place_changed', locationCheck1);
  //autocomplete2.addListener('place_changed', locationCheck2);
 
  $('#addressFromInput').on("keypress", function(e) {
      if (e.which == 13) {
        google.maps.event.trigger(autocomplete1, 'place_changed');
        return false;
      }
  });

  $('#addressToInput').on("keypress", function(e) {
      if (e.which == 13) {
        google.maps.event.trigger(autocomplete2, 'place_changed');
        return false;
      }
  });

  $('#addressFromInput').on("focus click", function(e){
    if(autocomplete1){
        autocomplete1=null;
        localStorage.setItem("fromCity","");
    }   
    autocomplete1 = initAutocomplete(document.getElementById('addressFromInput'));
    autocomplete1.addListener('place_changed', locationCheck1);
  });

  $('#addressToInput').on("focus click", function(e){
      if(autocomplete2){
          autocomplete2=null;
          localStorage.setItem("toCity","");
      }
      autocomplete2 = initAutocomplete(document.getElementById('addressToInput'));
      autocomplete2.addListener('place_changed', locationCheck2);
  });
}

function initAutocomplete(address) {
  return new google.maps.places.Autocomplete(address, {types: ['geocode']});
}