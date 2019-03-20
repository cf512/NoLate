$(function() { 
    var check;

    function checkVal(test) {
        return !test.val();
    }

    document.getElementById("submitButton").disabled=true;

    $('#addressFromInput').keypress(function(e) {
        if (e.which == 13) {
          google.maps.event.trigger(autocomplete1, 'place_changed');
          return false;
        }
    });
    $('#addressToInput').keypress(function(e) {
        if (e.which == 13) {
          google.maps.event.trigger(autocomplete2, 'place_changed');
          return false;
        }
    });

    $("input").on("focus", function(e){
        document.getElementById("submitButton").disabled=true;
        if(checkVal($("#nameInput"))|| checkVal($("#stateFromInput")) || checkVal($("#stateToInput")) || checkVal($("#requiredArrivalTime")) || checkVal($("#morningRoutineTime")) || checkVal($("#transport"))) {
            document.getElementById("submitButton").disabled=true
        } else {
            document.getElementById("submitButton").disabled=false
        }
    });

    $("input").on("change", function(e){
        if(checkVal($("#nameInput"))|| checkVal($("#stateFromInput")) || checkVal($("#stateToInput")) || checkVal($("#requiredArrivalTime")) || checkVal($("#morningRoutineTime")) || checkVal($("#transport"))) {
            document.getElementById("submitButton").disabled=true
        } else {
            document.getElementById("submitButton").disabled=false
        }
    });
});