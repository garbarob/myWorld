//alert("hello");
function calculateMyAge(){
   var bday = document.getElementById("age").value;
   //alert("bday: " + bday);
    	//splitBirthdayParts = birthdate.split('/');
    var DateSplit = bday.split("/");
            var myMonth = DateSplit[0];
            var myDay = DateSplit[1];
            var myYear = DateSplit[2];
    //alert(myMonth + ": " + myDay + ": " + myYear);
    
    //if the age is before 1970/01/01
    
    if(Date.parse(bday) <= 0){
         
    var oldGoodTimes = new Date(Month, Day, Year);
       
        //Get current date object
        //var actualDate = new Date();
        //1 is added as getMonth() returns a Zero-based
        // value, i.e. 0=January, 1=February, 11=December
//        	var age;
//        	var today = new Date();
        	var todaysDay = today.getDate();
//        	var todaysMonth = today.getMonth()+1;
//        	var todaysYear = today.getYear();
    
    //now get base difference in years
           //age=todaysYear-myYear;
        //alert(age);
    
	//if 'now' is earlier in the year month-wise than 
	//the birthday supplied, then adjust age by a year
	//if (todaysMonth<myMonth) age--;
	//if (todaysMonth==myMonth) {
		//if 'now' is in same month, but earlier
		// in that month than the birthday supplied
		// then adjust age by a year
		//if (todaysDay<myDay) age--;
	//} 
        //Get the difference in milliseconds
        var difference = todaysDay.getTime() - oldGoodTimes.getTime();
      //alert(todaysDay);  
    //if (isNaN(age)) age="???";
       // return age;
    
    
        //converts milliseconds to minutes
        var minutes = (difference / 60000).toFixed(0);
        //alert("minutes : " + minutes);
         document.getElementById("result").innerHTML ="<span>Your age in minutes is</span> "+ minutes;
        //loadAJAX(minutes);
    }else{
          //if the age is after 1970/01/01
         var dateOfBirthInMillis = Date.parse(bday);
      

        //converting milliseconds to minutes
        var minutes = dateOfBirthInMillis / 60000;
        

        //outputting to the page
       document.getElementById("result").innerHTML ="<span>You are " + minutes + " minutes old</span>";
       //loadAJAX(minutes);
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
