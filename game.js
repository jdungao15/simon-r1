var buttonColors = ['red', 'blue', 'green', 'yellow'];

//Store current pattern
var gamePattern = [];
//Store user pattern
var userClickedPattern = [];
//level
var level = 0;
var gameStarted = true;

// Create randomly selected color
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  makeSound(randomChosenColor);
  $('#' + randomChosenColor).fadeOut(250).fadeIn(250);

  //increment Level
  level++;

  //Change the level
  $("#level-title").text("Level " + level);

}
//perform sounds
function makeSound(sound) {
  switch (sound) {
    case 'green':
      var greenSound = new Audio("./sounds/green.mp3");
      greenSound.play();
      break;
    case 'blue':
      var blueSound = new Audio("./sounds/blue.mp3");
      blueSound.play();
      break;
    case 'red':
      var redSound = new Audio("./sounds/red.mp3");
      redSound.play();
      break;
    case 'yellow':
      var yellowSound = new Audio("./sounds/yellow.mp3");
      yellowSound.play();
      break;
    default:
      console.log(sound);

  }
}

//Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

//Check answers
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
          nextSequence();
          userClickedPattern = [];
      }, 1000);
    }

  } else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Here's a song for you  😍😘💖. Please Wait");
    var ricardo = new Audio("./sounds/precious.mp3");
    ricardo.play();
    setTimeout(function() {
      $("body").addClass("ricardo");
    }, 17500);

  }

}

// Animate buttonColors
function animatePress(color) {
  $('#' + color).addClass("pressed");

  setTimeout(function() {
    $('#' + color).removeClass("pressed");
  }, 100);

}
// Click event Handler
$(".btn").click(function(event) {
  if (gameStarted) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

    makeSound(userChosenColor);
    animatePress(userChosenColor);
  }
});

//Start the game
// $(document).keypress(function(event) {
//   if (event.key === "a") {
//     if (!gameStarted) {
//       nextSequence();
//       gameStarted = true;
//     }
//   }
// });

nextSequence();
