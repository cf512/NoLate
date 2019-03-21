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

    $("#submitButton").on("click",function(event){
        event.preventDefault();
        localStorage.setItem("name",$("#nameInput").val()); 
        var con=connection.push($("#nameInput").val());

        //????
        setCookie("commuter"+$("#nameInput").val()+con.key,"true",1);
        console.log("쿠키"+document.cookie);
        $("#myModal").modal('hide')
        $("#bodyWrap").show();
        $("button.btn").show();

        localStorage.setItem("transport",$("#transport").val());
        localStorage.setItem("fromAddress",$("#addressFromInput").val()); 
        localStorage.setItem("toAddress",$("#addressToInput").val()); 
        localStorage.setItem("requiredArrivalTime", $("#requiredArrivalTime").val());
        localStorage.setItem("morningRoutineTime", $("#morningRoutineTime").val());
    });
});