var primary = ["red","green","yellow","blue"];   //this contains name of all colored boxes
var generatedLog = [];  // array of colors randomly generated
var userInput = [];  // array of colors clicked by user
var start = true; // condition to start the game

function numberGenerator(){        // a psuedo code for generating random number in range 0-3
   var number =  Math.floor(Math.random()*4);
   return number;
}

$(document).on("keydown", function(){   // a function to detect keypress on the entire document
    if (start === true){
        game();
        start = false;
        
    }
})

$(".box").on("click", function(){        // a snippet to detect user click in the color boxes to take actions
    var temp2 = $(this).attr("id");
    userInput.push(temp2);
    animateBox(this);
    playSound(temp2);
    checkClick();
})

function checkClick(){              // a function to detect weather the input is correct or not
    if (userInput[userInput.length-1]===generatedLog[userInput.length-1]){
        console.log("true");
    }else if (userInput[userInput.length-1]!==generatedLog[userInput.length-1]){
        console.log("false");           // if the input is wrong the function calls gameover function 
        start = true;
        generatedLog = [];
        gameOver();

    }
    if (userInput.length === generatedLog.length){
        setTimeout(() => {
         game();   
        }, 1000);
    }

}

function game(){     // it calles numberGenerator fuctions and stores a color to the generatedLog array
    var level = generatedLog.length+1;
    $(".header").text("Level "+level)
    userInput = []
    var color = primary[numberGenerator()]
    generatedLog.push(color);
    $("#"+color).fadeOut(100).fadeIn(100);
    playSound(color);

}

function playSound(item){         /// item === color in color generator // function used to play sound effects
    var audio = new Audio("sounds/"+item+".mp3");
    audio.play();
}

function animateBox(item){            /// item === this keyword //function to animate effects of being clicked 
    $(item).addClass("pressed");
    setTimeout(() => {
        $(item).removeClass("pressed");
    }, 100);
}

function gameOver(){  // game over function creates the effects for the game over senario
    $("body").addClass("redBG");
    playSound("wrong");
    setTimeout(() => {
        $("body").removeClass("redBG")
    }, 100);
    $(".header").text("Gameover press any key to restart")
}