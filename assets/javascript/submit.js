 var config = {
        apiKey: "AIzaSyBqq61A0kK_3nScseexY0EAY26DBym3s7c",
        authDomain: "firstteamproject-16be1.firebaseapp.com",
        databaseURL: "https://firstteamproject-16be1.firebaseio.com",
        projectId: "firstteamproject-16be1",
        storageBucket: "firstteamproject-16be1.appspot.com",
        messagingSenderId: "546682156707"
    };

    firebase.initializeApp(config);
    var database = firebase.database();
    
    $(function(){
   
    var connection=database.ref("/userdata");


    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    // function getCookie(cname) {
    //     var name = cname + "=";
    //     var ca = document.cookie.split(';');
    //     for(var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //         c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //         return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }
    
    // function checkCookie() {
    //     var user = getCookie("user");
    //     if (user != "") {
    //         alert("Welcome again " + user);
    //     } else {
    //         user = prompt("Please enter your name:", "");
    //         if (user != "" && user != null) {
    //         setCookie("username", user, 365);
    //         }
    //     }
    // }

    $("#submitButton").on("click",function(event){
        event.preventDefault();
        localStorage.setItem("name",$("#nameInput").val()); 
        var con=connection.push($("#nameInput").val());
        setCookie("commuteUser="+con.key,con.key,1);
        //console.log(con.key);

        localStorage.setItem("transport",$("#transport").val());
        localStorage.setItem("fromAddress",$("#addressFromInput").val()); 
        // localStorage.setItem("fromCity",$("#cityFromInput").val()); 
        // localStorage.setItem("fromState",$("#stateFromInput").val()); 
        // localStorage.setItem("fromZip",$("#zipFromInput").val()); 
     //   localStorage.setItem("calculatedFromLocation",$("#addressFromInput").val()+" "+$("#cityFromInput").val()+" "+$("#stateFromInput").val()+" "+$("#zipFromInput").val()); 

        localStorage.setItem("toAddress",$("#addressToInput").val()); 
        // localStorage.setItem("toCity",$("#cityToInput").val()); 
        // localStorage.setItem("toState",$("#stateToInput").val()); 
        // localStorage.setItem("toZip",$("#zipToInput").val()); 
     //   localStorage.setItem("calculatedToLocation",$("#addressToInput").val()+" "+$("#cityToInput").val()+" "+$("#stateToInput").val()+" "+$("#zipToInput").val()); 

        localStorage.setItem("requiredArrivalTime", $("#requiredArrivalTime").val());
        localStorage.setItem("morningRoutineTime", $("#morningRoutineTime").val());
    });
    
    // Form = {id = inputForm}
    // Name = {type:text, saved to: Firebase, id=nameInput}
    // From Location = { NOTE: multiple fields 
    //     Address = {type; text, saved to: Local, id=addressFromInput};
    //     City = {type: text, saved to Local, id=cityFromInput;
    //     State = {type: LIST!!!!, saved to Local, id=stateFromInput};
    //     ZIP = {type: number, saved to Local, id=zipFromInput}
    //     calculatedFromLocation = Address+ “ “ +City+” “+State+” “+Zip; }
    // To Location = {
    // Address = {type; text, saved to: Local, id=addressToInput};
    //     City = {type: text, saved to Local, id=cityToInput;
    //     State = {type: LIST!!!!, saved to Local, id=stateToInput};
    //     ZIP = {type: number, saved to Local, id=zipToInput}
    //     calculatedToLocation = Address+ “ “ +City+” “+State+” “+Zip; }
    
    // Required Arrival Time = { type:time, saved to: Local, id=requiredArrivalTime}
    // Morning Routine Time = { type:time, saved to: Local, id=morningRoutineTime}
    
    // Submit Button = {type:submit, not saved, id=submitButton}
    
});