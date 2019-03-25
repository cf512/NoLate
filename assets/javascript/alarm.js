//needs to do a current time and date output
function updateAlarmClock() {
    localStorageObject = window.localStorage;


    var transitTimeConvertedMinutesTotal = Math.floor(localStorageObject.transitTime / 60);
    var transitTimeConvertedHours = Math.floor(transitTimeConvertedMinutesTotal / 60);
    var transitTimeConvertedMinutesAfterHours = Math.floor(transitTimeConvertedMinutesTotal % 60);

    var transitHoursOutput = "";
    var transitMinutesOutput = "";
    if (transitTimeConvertedHours > 0) {
        transitHoursOutput = transitTimeConvertedHours + " hours, and ";
        transitMinutesOutput = transitTimeConvertedMinutesAfterHours + " minutes";
    }
    else {
        transitHoursOutput = "";
        transitMinutesOutput = transitTimeConvertedMinutesTotal + " minutes";
    }
    var totalTimeToDeductMinutesTotal = transitTimeConvertedMinutesTotal + parseInt(localStorageObject.morningRoutineTime);
    var totalTimeToDeductHours = Math.floor(totalTimeToDeductMinutesTotal / 60);
    var totalTimeToDeductMinutesAfterHours = Math.floor(totalTimeToDeductMinutesTotal % 60);

    var totalHoursOutput;
    var totalMinutesOutput;

    if (totalTimeToDeductHours > 0) {
        totalHoursOutput = totalTimeToDeductHours + " hours, and ";
        totalMinutesOutput = totalTimeToDeductMinutesAfterHours + " minutes";
    } else {
        totalHoursOutput = "";
        totalMinutesOutput = totalTimeToDeductMinutesTotal + " minutes";
    }

    //transit time in seconds   Math.floor(localStorageObject.transitTime / 60)
    //transit time in minutes Math.floor(Math.floor(localStorageObject.transitTime / 60))
    var arrivalTime = localStorage.getItem("requiredArrivalTime");


    if (arrivalTime.slice(arrivalTime.length - 2) == "pm") {
        arrivalTime = arrivalTime.slice(0, arrivalTime.length - 2);
        arrivalTime = parseInt(arrivalTime.split(":")[0] + arrivalTime.split(":")[1])
        arrivalTime = arrivalTime + 1200;
    } else {
        arrivalTime = arrivalTime.slice(0, arrivalTime.length - 2);
        arrivalTime = parseInt(arrivalTime.split(":")[0] + arrivalTime.split(":")[1])
    }
   


   
    var totalSeconds = parseInt(localStorage.getItem("transitTime"));
    var totalTimeToArriveMinutes = Math.floor(totalSeconds / 60);
    var totalTimeToArriveRemainingMinutes = Math.floor(totalTimeToArriveMinutes % 60);
    var totalTimeToArriveHours = Math.floor(totalTimeToArriveMinutes / 60);

    arrivalTime = arrivalTime.toString();

    var arrivalTimeHours = arrivalTime.slice(0,arrivalTime.length-2);
    var arrivalTimeMinutes = arrivalTime.slice(arrivalTime.length-2,);

    
    var timeToDepartMinutes = parseInt(arrivalTimeMinutes) - totalTimeToArriveRemainingMinutes;
    var timeToDepartHours = parseInt(arrivalTimeHours) - totalTimeToArriveHours;
    

    if(parseInt(timeToDepartMinutes) < 0){
        timeToDepartMinutes = timeToDepartMinutes + 60;
        timeToDepartHours = timeToDepartHours - 1;
    }


    if (timeToDepartHours >= 13) {
        timeToDepartHours = (timeToDepartHours - 12);
        $('#startTime').text(timeToDepartHours + ":" + timeToDepartMinutes+"pm");
     }else{
        $('#startTime').text(timeToDepartHours + ":" + timeToDepartMinutes+"am");
    }

    $('#durationTime').text(transitHoursOutput + transitMinutesOutput);


    var totalSecondsAlarm = parseInt(localStorage.getItem("transitTime")) + (parseInt(localStorage.getItem("morningRoutineTime")) * 60);
    var timeToAlarmMinutes = Math.floor(totalSecondsAlarm / 60);
    var timeToAlarmRemainingMinutes = Math.floor(timeToAlarmMinutes % 60);
    var timeToAlarmHours = Math.floor(timeToAlarmMinutes / 60);
    if(timeToAlarmMinutes < 0){
        timeToAlarmHours = timeToAlarmHours -1;
        timeToAlarmMinutes = timeToAlarmMinutes + 60;
    }
    var totalTimeToAlarmHours = arrivalTimeHours -timeToAlarmHours;
    var totalTimeToAlarmMinutes = arrivalTimeMinutes - timeToAlarmRemainingMinutes;

    if(totalTimeToAlarmMinutes < 60){
        totalTimeToAlarmHours = totalTimeToAlarmHours -1;
        totalTimeToAlarmMinutes = totalTimeToAlarmMinutes +60;
        
    }

    localStorage.setItem("startTime", totalTimeToAlarmHours+""+totalTimeToAlarmMinutes);
   
};

var alarmSound = new Audio();
alarmSound.src = 'FinalCountdown.mp3';
var alarmTimer;

function setAlarm(button) {
 
    var ms = parseInt(localStorage.getItem("startTime"));
    if (isNaN(ms)) {
        alert('Invalid Date');
        return;
    }


    getTodayDate();

    var difference = (ms - (todayArrayTimeHours + "" + todayArrayTimeMinutes)) * 60000;

    if (difference < 0) {
        alert('The alarm time is in the past');
        return;
    }

    alarmTimer = setTimeout(initAlarm, difference);
    button.innerText = 'Cancel Alarm';
    button.setAttribute('onclick', 'cancelAlarm(this);');
};

function cancelAlarm(button) {
    clearTimeout(alarmTimer);
    button.innerText = 'Set Alarm';
    button.setAttribute('onclick', 'setAlarm(this);')
};

function initAlarm() {
    //alarm needs an active/deactive flag
    //html will need a button for turn on alarm
    alarmSound.play();
    document.getElementById('alarmOptions').style.display = '';
};

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('alarmOptions').style.display = 'none';
    cancelAlarm(document.getElementById('alarmButton'));
};

function snooze() {
    stopAlarm();
    alarmTimer = setTimeout(initAlarm, 300000); // 5 * 60 * 1000 = 5 Minutes
};



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