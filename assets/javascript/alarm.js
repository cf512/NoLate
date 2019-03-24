//needs to do a current time and date output
function updateAlarmClock(){
    localStorageObject = window.localStorage;
    

    var transitTimeConvertedMinutesTotal = Math.floor(localStorageObject.transitTime/60);
    var transitTimeConvertedHours = Math.floor(transitTimeConvertedMinutesTotal/60);
    var transitTimeConvertedMinutesAfterHours= Math.floor(transitTimeConvertedMinutesTotal%60);
    
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
    var totalTimeToDeductMinutesTotal = transitTimeConvertedMinutesTotal+parseInt(localStorageObject.morningRoutineTime);
    var totalTimeToDeductHours = Math.floor(totalTimeToDeductMinutesTotal/60);
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
    
   
    
    $('#startTime').text(localStorage.getItem("startTime"));

    
    $('#durationTime').text(transitHoursOutput + transitMinutesOutput);


   
    
};
		
		var alarmSound = new Audio();
		alarmSound.src = 'FinalCountdown.mp3';
        var alarmTimer;
        
		function setAlarm(button) {
            // var LocalStorageObject = window.localStorage;

            //this sets the startTime to the requiredArrivalTime for testing
            
            // var isThisATwelve = localStorageObject.getItem("requiredArrivalTime").slice(localStorageObject.getItem("requiredArrivalTime").length-2);
            // var arrivalTimerArray = localStorageObject.getItem("requiredArrivalTime").slice(0,(localStorageObject.getItem("requiredArrivalTime").length-2)).split(":");
            // var arrivalTimer = arrivalTimerArray[0]+""+arrivalTimerArray[1]
            // if(isThisATwelve.toLowerCase === "pm")
            // console.log(arrivalTimer);
            // arrivalTimer = parseInt(arrivalTimer)+1200;

            // console.log(arrivalTimer);
            // // arrivalTimerArray = arrivalTimer.split(":");
            // // arrivalTimer = arrivalTimerArray[0]+""+arrivalTimerArray[1];
            // LocalStorageObject.setItem("startTime", arrivalTimer);


            var msArray = localStorage.getItem("startTime").split(":");
            var ms = msArray[0]+""+msArray[1];
			if(isNaN(ms)) {
				alert('Invalid Date');
				return;
			}


            getTodayDate();
            
            var difference = (ms-(todayArrayTimeHours+""+todayArrayTimeMinutes))*60000;
            
			if(difference < 0) {
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