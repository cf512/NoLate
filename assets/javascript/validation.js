function checkVal(test) {
    return !test.val();
}

function geoCheck(){
    if (typeof navigator.geolocation == "undefined") {
        $("#error").text("Your browser doesn't support the Geolocation API");
        return;
    }
}

function inputCheck() {
    if(checkVal($("#nameInput"))|| checkVal($("#requiredArrivalTime")) || checkVal($("#morningRoutineTime")) || checkVal($("#transport")) || localStorage.getItem("fromCity")=="" || localStorage.getItem("toCity")=="" || !autoResult1 || !autoResult2) {
        document.getElementById("submitButton").disabled=true
    } else {
        document.getElementById("submitButton").disabled=false
    }
}

function formCheck(){
    document.getElementById("submitButton").disabled=true;
    
    $("input").on("click focus", function(e){
        document.getElementById("submitButton").disabled=true;
        inputCheck();
    });

    $("input").on("change", function(e){
        inputCheck();
    });
}

function validation() {
    geoCheck();
    formCheck();
    AutoCompleteCheck();
}