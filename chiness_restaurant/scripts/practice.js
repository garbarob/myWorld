

function getAgeInMinutes(){
   var bday = document.getElementById("bday").value;
  // alert("bday: " + bday);
    var DateSplit = bday.split("-");
            var Year = DateSplit[0];
            var Month = DateSplit[1];
            var Day = DateSplit[2];
    //alert(Year + ": " + Month + ": " + Day);
    
    //if the age is before 1970/01/01
    if(Date.parse(bday) <= 0){
       //get the entered date from the user 
        var oldGoodTimes = new Date(Year, Month, Day);
       
        //Get current date object
        var actualDate = new Date();
        
        //Get the difference in milliseconds
        var difference = actualDate.getTime() - oldGoodTimes.getTime();
        
       
        //converts milliseconds to minutes
        var minutes = (difference / 60000).toFixed(0);
        //alert("minutes : " + minutes);
         document.getElementById("result").innerHTML ="<span>Your age in minutes:</span> "+ minutes;
        loadAJAX(minutes);
    }else{
          //if the age is after 1970/01/01
         var dateOfBirthInMillis = Date.parse(bday);
      

        //converting milliseconds to minutes
        var minutes = dateOfBirthInMillis / 60000;
        

        //outputting to the page
       document.getElementById("result").innerHTML ="<span>Your age in minutes:</span> "+ minutes;
       loadAJAX(minutes);
    }
   
}

function loadAJAX(age) {
  //alert("Clicked Load AJAX Content - this would load the specified url, but only works if we get the response from a server....");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     //document.getElementById("AJAXoutputDiv").innerHTML = xhttp.responseText;
	 alert(xhttp.responseText);
	 console.log(xhttp.responseText);
    }
  };
  xhttp.open("GET", "response.txt#personsAge="+age, true);
  xhttp.send();
}