var autocomplete1;
var autocomplete2; 
var componentForm = {
    locality: 'short_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name'
  }; 

function initAutocomplete() {
    autocomplete1 = new google.maps.places.Autocomplete(document.getElementById('addressFromInput'), {types: ['geocode']});
    autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('addressToInput'), {types: ['geocode']});
    autocomplete1.addListener('place_changed', fillInAddress1);
    autocomplete2.addListener('place_changed', fillInAddress2);
}

function fillInAddress1() {
    var place1 = autocomplete1.getPlace();
    for (var i = 0; i < place1.address_components.length; i++) {
        var addressType = place1.address_components[i].types[0]; 
        var val = place1.address_components[i][componentForm[addressType]];
        if(addressType=="locality") {
            $("#cityFromInput").val(val);
        }
        if(addressType=="administrative_area_level_1") {
            $("#stateFromInput").val(val);
        }
        if(addressType=="postal_code") {
            $("#zipFromInput").val(val);
        }
    }
}

function fillInAddress2() {
    var place2 = autocomplete2.getPlace();
    for (var i = 0; i < place2.address_components.length; i++) {
        var addressType = place2.address_components[i].types[0]; 
        var val = place2.address_components[i][componentForm[addressType]];
        if(addressType=="locality") {
            $("#cityToInput").val(val);
        }
        if(addressType=="administrative_area_level_1") {
            $("#stateToInput").val(val);
        }
        if(addressType=="postal_code") {
            $("#zipToInput").val(val);
        }
    }
}