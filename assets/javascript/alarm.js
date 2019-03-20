//needs to do a current time and date output

function updateAlarmClock(){
    localStorageObject = window.localStorage;
    

    var transitTimeConvertedMinutesTotal = Math.floor(localStorageObject.transitTime/60);
    var transitTimeConvertedHours = Math.floor(transitTimeConvertedMinutesTotal/ 60);
    var transitTimeConvertedMinutesAfterHours= Math.floor(transitTimeConvertedMinutesTotal%60);
    console.log(localStorageObject.transitTime);
    console.log(transitTimeConvertedMinutesTotal);
    console.log(transitTimeConvertedHours);
    console.log(transitTimeConvertedMinutesAfterHours);
    
    var transitHoursOutput = "";
    var transitMinutesOutput = "";
    if(transitTimeConvertedHours > 0){
        transitHoursOutput = transitTimeConvertedHours+" hours, and ";
        transitMinutesOutput = transitTimeConvertedMinutesAfterHours+ " minutes"; 
    }
    else{
        transitHoursOutput = "";
        transitMinutesOutput = transitTimeConvertedMinutesTotal+ " minutes"
    }

    var totalTimeToDeductMinutesTotal = transitTimeConvertedMinutesTotal+localStorageObject.morningRoutineTime
    var totalTimeToDeductHours = Math.floor(totalTimeToDeductMinutesTotal/ 60);
    var totalTimeToDeductMinutesAfterHours = Math.floor(totalTimeToDeductHours);
    var totalHoursOutput;
    var totalMinutesOutput;
    if(totalTimeToDeductHours > 0){
        totalHoursOutput = totalTimeToDeductHours+" hours, and ";
        totalMinutesOutput = totalTimeToDeductMinutesAfterHours+ " minutes";
    } else {
        totalHoursOutput = "";
        totalMinutesOutput = totalTimeToDeductMinutesTotal + " minutes";
    }
    
    //transit time in seconds   Math.floor(localStorageObject.transitTime / 60)
    //transit time in minutes Math.floor(Math.floor(localStorageObject.transitTime / 60))

    var newDiv = $('<div>');
    newDiv.append('<p> Arrival Time:'+localStorageObject.requiredArrivalTime+ '</p>');
    newDiv.append('<p> Transit Time:'+transitHoursOutput + transitMinutesOutput+ '</p>');
    newDiv.append('<p> Morning Routine Total Time'+localStorageObject.morningRoutineTime+ '</p>');   
    newDiv.append('<p> Total Time to Deduct'+totalHoursOutput+totalMinutesOutput+ '</p>');   
    $('#commuteDataDump').html(newDiv); 
};

//alarm needs an active/deactive flag
//html will need a button for turn on alarm

//needs to do a isActive check
    //needs to check time and compare to EstimatedDepartureTime if EstimatedDepartureTime >= $.now(){
        //if isActive > plays youTube video (play once, autoplay) > sets isDeactive
    // ELSE { needs to do an update my values every so often (every minute if estimatedDepartureTime < now + transitTime)
        //that check assumes that transit time max expansion is 2x

//needs to take inputs of:
//requiredArrivalTime (from form)
//morningRoutineTime (from form)
//transitTime from google Maps


//output to html
//estimatedDepartureTime
//form for youtube link and button
//on click event for button {preventDefault(), set flag to active/deactive, }
//button for set alarm (toggle text: Set Alarm / Stop Alarm)