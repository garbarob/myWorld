    var color;
    var guessColor;
    var target_index;
    var target;
    var finished = false;
    var guessNo = 0;
    var myBody;

    
function do_game() {
    var color = ["red", "white", "yellow"];
    
    while(!finished) {
    guessColor = prompt("I am thinking of one of these colors: \n\n " + color + " \n\nWhat color am I thinking of?", "your color here");
    
    target_index = Math.floor((Math.random() * color.length) );
        
    target =  color[target_index];
    console.log("random color is: " + target);
    finished = check_guess();
    guessNo++
    }
}

function check_guess() {
    
    if (guessColor != target) {
            alert("Sorry, I don't recognize your color. \n\n Please try again!");
            return false;
        }
    if (guessColor > target) {
            alert("Sorry, your guess is not correct! \n\n Hint: your color is alphabetically higher than mine. \n\n Please try again!");
            return false;
        }
    if (guessColor < target) {
            alert("Sorry, your guess is not correct! \n\n Hint: your color is alphabetically lower than mine. \n\n Please try again!");
            return false;
        }
    else {
            alert("Congratulations! You have guessed the color! \n\n It took you " + guessNo + " guesses to finish the game! \n\n You can see the color in the background.");
            myBody=document.getElementsByTagName("body")[0];
            myBody.style.background=target;
            return true;
        }
}



