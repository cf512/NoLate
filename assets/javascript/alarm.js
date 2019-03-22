//needs to do a current time and date output
console.log("alarm.js is loaded, where was this message?")
function updateAlarmClock(){
    localStorageObject = window.localStorage;
    

    var transitTimeConvertedMinutesTotal = Math.floor(localStorageObject.transitTime/60);
    var transitTimeConvertedHours = Math.floor(transitTimeConvertedMinutesTotal/60);
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
        transitMinutesOutput = transitTimeConvertedMinutesTotal+ " minutes";
    }
    console.log("morning routine time: "+parseInt(localStorageObject.morningRoutineTime));
    var totalTimeToDeductMinutesTotal = transitTimeConvertedMinutesTotal+parseInt(localStorageObject.morningRoutineTime);
    console.log(totalTimeToDeductMinutesTotal);
    var totalTimeToDeductHours = Math.floor(totalTimeToDeductMinutesTotal/60);
    console.log(totalTimeToDeductHours);
    var totalTimeToDeductMinutesAfterHours = Math.floor(totalTimeToDeductMinutesTotal%60);

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
    newDiv.append('<p> Morning Routine Total Time: '+localStorageObject.morningRoutineTime+ '</p>');   
    newDiv.append('<p> Total Time to Deduct: '+totalHoursOutput+totalMinutesOutput+ '</p>');   
    $('#commuteDataDump').html(newDiv); 
};
		
		var alarmSound = new Audio();
		alarmSound.src = 'FinalCountdown.mp3';
        var alarmTimer;
        
		function setAlarm(button) {
            console.log('buttonCLick');
            var LocalStorageObject = window.localStorage;
            LocalStorageObject.setItem("startTime", "1028");
            console.log("alarm is set to one minute to minute");
            var ms = localStorageObject.getItem("startTime");
			if(isNaN(ms)) {
				alert('Invalid Date');
				return;
			}


            var today = new Date();
            var todayArray = today.toString().split(" ");
            
            var todayArrayTime = todayArray[4];
            var todayArrayTimeArray = todayArrayTime.split(":")
            var todayArrayTimeHours = todayArrayTimeArray[0];
            var todayArrayTimeMinutes = todayArrayTimeArray[1];
            var todayArrayTimeSeconds = todayArrayTimeArray[2];
           
            var todayArrayDay = todayArray[2];
            
            var differenceInMs = (ms-(todayArrayTimeHours+""+todayArrayTimeMinutes))*60000;
            
			if(differenceInMs < 0) {
				alert('Specified time is already passed');
				return;
			}

            alarmTimer = setTimeout(initAlarm, differenceInMs);
            console.log("timerSet")
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