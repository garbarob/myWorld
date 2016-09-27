/*
TODO:

    - Timer

*/


/********************************
*****   GLOBAL VARIABLES    *****
*********************************/
var windowWidth,
    windowHeight,
    smallerSize,
    clickCount,
    currentMilliseconds,
    currentSeconds,
    currentMinutes,
    initialTime,
    timer,
    timeNow,
    // Here we are storing the height of the header (where the timer will be put in)
    headerHeight = document.getElementById("header").offsetHeight,
    colors = ["green", "blue", "yellow", "maroon", "navy", "gray", "brown", "aqua", "lime", "fuchsia", "silver", "red", "olive", "teal", "purple"],
    // creating the box object and box array here, assignment is done in js
    box;

/***************************************************
*****   EXECUTES WHEN WINDOW IS FULLY LOADED   *****
****************************************************/
window.onload = function () {
    function resizesOverlay() {
        $("#overlay").css("width", windowWidth + "px");
        $("#overlay").css("height", windowHeight + "px");
    }
    
    /**********************************
    *****   SETS UP THE OVERLAY   *****
    ***********************************/
    function setOverlay() {
        $("#overlay").css("background-color", "#000");
        $("#overlay").css("position", "fixed");
        resizesOverlay();
        $("#overlay").css("left", "0px");
        $("#overlay").css("top", "0px");
        $("#overlay").css("z-index", "1");
        $("#overlay").fadeTo(0, 0.5);
        $("#overlay").css("display", "none");
    }
    
    /*******************************
    *****   SHOW THE OVERLAY   *****
    ********************************/
    function showOverlay(delay) {
        if (delay == null) delay=300;
        $("#overlay").fadeIn(delay);
    }
    
    /*******************************
    *****   HIDE THE OVERLAY   *****
    ********************************/
    function hideOverlay(delay) {
        if (delay == null) delay=300;
        $("#overlay").fadeOut(delay);
    }
    
    /********************************
    *****   RESIZES THE BOXES   *****
    *********************************/
    function resizeBoxes() {
        windowWidth = window.innerWidth;            // gets the window width
        windowHeight = window.innerHeight;          // gets the window height
        setOverlay();
        // if the window width and the height are the same, or if width is smaller than the height
        if (windowWidth < windowHeight) {
            // get the window width and set it as the smaller size
            smallerSize = windowWidth;
        } else {
            // or else set the height as the smaller size property
            smallerSize = windowHeight;
        }
        
        
        // sets the box size to: the smaller size property subtracted by the height of the header paragraph, divided by 2 (half of the result value) then substracts a percentage of the available space
        var boxSize = ((smallerSize - headerHeight) / 2) - (((smallerSize - headerHeight) / 100) * 5);
        
        if (boxSize > 100) {
            // loops through all the boxes
            for (var i = 1; i < 5; i++) {
                $("#box" + i).css("width", boxSize + "px");
                $("#box" + i).css("height", boxSize + "px");
                $("#box" + i).css("border-radius", (boxSize / 16) + "px");
                $("#box" + i + " span").css("font-size", (boxSize / 4) + "px");

                if (i % 2 != 0) {
                    $("#box" + i).css("left", ((windowWidth / 2) - boxSize) + "px");
                } else {
                    $("#box" + i).css("left", (windowWidth / 2) + "px");
                }
                if (i > 2) {
                    $("#box" + i).css("top", (headerHeight + boxSize) + "px");
                }
                $("#box" + i + " span").css("top", (boxSize / 3) + "px");
            }
            $("#header").css("width", (boxSize * 2) + "px");
            $("#header").css("left", ((windowWidth / 2) - boxSize) + "px");

            $("#timer").css("left", (boxSize - document.getElementById("timer").offsetWidth / 2) + "px");
            
            // Positions the paragraph with the click counter underneath the boxes and aligned with the boxes on the left
            var clickParagraphPosition = ((headerHeight + boxSize * 2) + 10);
            if ((clickParagraphPosition + 16) > windowHeight) {
                clickParagraphPosition = windowHeight - 16;
            }
            $("#clickCountParagraph").css("top", clickParagraphPosition + "px");
            $("#clickCountParagraph").css("left", ((windowWidth / 2) - boxSize) + "px");
            $("#clickCountParagraph").css("font-size", (boxSize / 8) + "px");
        }
    }
    
    /************************************************
    *****   RETURNS A RANDOMLY GENERATED COLOR  *****
    *************************************************/
    function generateColor() {
        // color is generated using the 'colors' array
        var generatedColor = Math.round(Math.random(1) * (colors.length-1));
        return generatedColor;
    }
    
    /****************************************
    *****   POPULATE ARRAY OF BOXES     *****
    *****************************************/
    function populateBoxArray() {
        for (var i = 1; i < 5; i++) {
            box[i] = {
                color : colors[generateColor()]
            };
            $("#box" + i).css("background-color", box[i].color);
            $("#box" + i + " span").html(box[i].color);
        }
    }
    
    /******************************
    *****   CENTER POPUP BOX  *****
    *******************************/
    function centerBox(boxId) {
        $("#" + boxId).css("left", ((windowWidth / 2) - (document.getElementById(boxId).offsetWidth / 2)) + "px");
        $("#" + boxId).css("top", ((windowHeight / 2) - (document.getElementById(boxId).offsetHeight / 2)) + "px");
    }
    
    /****************************
    *****   SHOW POPUP BOX  *****
    *****************************/
    function showBox(boxId, message, winMessage) {
        showOverlay();
        $("#" + boxId).css("z-index", 2);
        if (winMessage != null) {
            clearInterval(timer);
        }
        if (winMessage && boxId == "popUpBox") {
            $("#popupMessage").css("color", "green");
        } else {
            $("#popupMessage").css("color", "red");
        }
        switch (boxId) {
            case "popUpBox" :
                $("#popupMessage").html(message)
                break;
            case "helpBox" :
                $("#helpMessage").html(message);
                break;
        }
        $("#" + boxId).css("display", "block");
        $("#mainContainer").fadeTo(300,0.2);
        $("#" + boxId).css("width", "350px");
        centerBox(boxId);
        $("#" + boxId).css("display", "block");
    }
    
    /***************************
    *****   HIDE POPUP BOX  *****
    ****************************/
    function hideBox(boxId) {
        hideOverlay();
        $("#mainContainer").fadeTo(300,1);
        $("#" + boxId).css("display", "none");
    }  
    
    /****************************
    *****   START TIMER     *****
    *****************************/
    function startTimer() {
        currentMilliseconds = 0;
        currentSeconds = 0;
        currentMinutes = 0;
        timer = setInterval(function () {
            timeNow = new Date();
            currentMilliseconds = Math.floor(timeNow - initialTime);
            currentSeconds = Math.floor(currentMilliseconds / 1000) % 60;
            currentMinutes = Math.floor((currentMilliseconds / 60) / 1000);
            if (currentMinutes >= 59 && currentSeconds >= 59) {
                showBox("popUpBox", "You lose", false);
            }
            $("#timer").html(((currentMinutes < 10) ? "0" : "") + currentMinutes + ":" + ((currentSeconds < 10) ? "0" : "") + currentSeconds);
        },1000);
    }
    
    /*****************************
    *****   RESUME TIMER     *****
    ******************************/
    function resumeTimer() {
        timeNow = new Date();
        initialTime = timeNow - currentMilliseconds;
        initialTime = new Date(initialTime);
        startTimer();
    }
    
    /************************
    *****   STOP TIMER  *****
    *************************/
    function stopTimer() {
        clearInterval(timer);
    }
    
    /**************************
    *****   INITIALIZER   *****
    ***************************/
    function initializer() {
        oldMilliseconds = 0;
        oldSeconds = 0;
        oldMinutes = 0;
        box = {};
        clickCount = 0;
        populateBoxArray();
        resizeBoxes();
        $("#clickCount").html(clickCount);
        initialTime = new Date();
        $("#timer").html("00:00");
        stopTimer();
        startTimer();
        checkStatus();
    }
    
    /*************************************************
    *****   CHECK IF ALL BOXES HAVE SAME COLOR   *****
    **************************************************/
    function sameAllColours() {
        var sameColor = 1;
        // loop all the boxes and check if they have the same color
        for (var i = 2; i < 5; i++) {
            if (box[i].color == box[i-1].color) {
                sameColor++;
            }
        }
        // if all the other three boxes have the same color
        if (sameColor == 4) {
            return true;
        } else {
            return false;
        }
    }
    
    /********************************
    *****   CHECK GAME STATUS   *****
    *********************************/
    function checkStatus() {
        if (sameAllColours()) {
            showBox("popUpBox", "You win", true);
        } else if (clickCount == 30) {
            showBox("popUpBox", "You lose", false);
        }
    }
    
    /********************************
    *****   EVENT - BOX CLICK   *****
    *********************************/
    // this traps the child elements too
    $(".box").click(function(event){
        if ($("#popUpBox").css("display") == "none" && $("#helpBox").css("display") == "none") {
            var targetElement = event.target;
            var targetId = targetElement.id;
           
            if ($("#" + targetElement.parentElement.id).hasClass("box")) {
                targetId = targetElement.parentElement.id;
            }
            var lastCharFromId = targetId.charAt(targetId.length - 1),
                previousColor = box[lastCharFromId].color;
            
            do {
                box[lastCharFromId].color = colors[generateColor()];
            } while (previousColor == box[lastCharFromId].color);  
            
            $("#" + targetId).css("background-color", box[lastCharFromId].color);
            $("#" + targetId).clearQueue().fadeTo(0,0.5).fadeTo(200,1);
            $("#" + targetId + " span").html(box[lastCharFromId].color);
            $("#clickCount").html(++clickCount);
            
            checkStatus();
        }
    });
    
    
    /*****************************************
    *****   EVENT - "PLAY AGAIN" CLICK   *****
    ******************************************/
    $("#btnPlayAgain").click(function() {
        hideBox("popUpBox");
        initializer();
    });
    
    /****************************************
    *****   EVENT - HELP BUTTON CLICK   *****
    *****************************************/
    $("i").click(function() {
        if ($("#popUpBox").css("display") == "none") {
            var message = "<h2>How to play</h2>" +
            "<p>Your goal is matching the same colors on all 4 boxes by clicking them to generate a new random color.</p>" +
            "<p>You have a maximum of 30 clicks and 1 hour to reach this goal.</p>";
            showBox("helpBox", message);
            stopTimer();
        }
    });
    
    /*****************************************
    *****   EVENT - "CLOSE" HELP CLICK   *****
    ******************************************/
    $("#btnCloseHelp").click(function() {
        hideBox("helpBox");
        resumeTimer();
    });
    
    /********************************************
    *****   EVENT - RESTART BUTTON CLICK    *****
    *********************************************/
    $("#btnQuit").click(function() {
        if ($("#popUpBox").css("display") == "none" && $("#helpBox").css("display") == "none") {
            $("#boxContainer").fadeTo(100,0);
            initializer();
            $("#boxContainer").fadeTo(100,1);
        }
    });
    
    /************************************
    *****   EVENT - WINDOW RESIZE   *****
    *************************************/
    window.addEventListener("resize", function() {
        resizeBoxes();
        centerBox("popUpBox");
        centerBox("helpBox");
        if ($("#popUpBox").css("display") != "none" || $("#helpBox").css("display") != "none") {
            setOverlay();
            showOverlay(0);
        }
    });
    
    initializer();
};