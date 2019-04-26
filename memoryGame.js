const icons = ["fas fa-power-off", "fas fa-power-off", "fas fa-bomb" ,"fas fa-bomb" ,"fas fa-cloud-moon", "fas fa-cloud-moon", "fas fa-ice-cream","fas fa-ice-cream",
               "fas fa-grin-stars", "fas fa-grin-stars", "fas fa-skiing", "fas fa-skiing", "fas fa-rupee-sign", "fas fa-rupee-sign", "fas fa-birthday-cake",
               "fas fa-birthday-cake", "fas fa-globe-asia", "fas fa-globe-asia", "fas fa-horse", "fas fa-horse"];
const deck = document.querySelector(".card-deck");
let allCards = document.querySelectorAll(".card");
let cards = null;
let openCards = [];
let matchCards = [];
let time = document.querySelector(".timer");
let minute = document.querySelector(".timer .minutes");
let second = document.querySelector("timer .seconds");
let moves = 0;
let starRating = "3";

let closeSymbol = document.querySelector(".modal-close-btn");
let modal = document.getElementById("myModal");
let stars = document.querySelectorAll(".fa-star");

let seconds = 0;
let sec = 0;
let min = 0;
let gameStarted = false;
let counter;

// Restart the memoryGame

function restartGame(){
    $("#restart").on("click", function(){
        location.reload(true);
    });
}
restartGame();

// Start Timer  by clicking the first card.

// function startTimer(){
//     if(!gameStarted){
//           gameStarted = true;
//           timer = setInterval(setTime, 1000);
//     }
// }
function timer() {
    gameStarted = true;
    counter = setInterval(function () {
            seconds += 1;

            second = (seconds % 60);
            minute = parseInt(seconds / 60);

            // if second < 10 add a 0 before the seconds
            if (second < 10) {
              second = `0${(seconds % 60)}`;
            }

            // if minutes < 10 add a 0 before the minutes
            if (minute < 10) {
              minute = `0${parseInt(seconds / 60)}`;
            }

            $('.timer').html(`${minute} : ${second}`);

        }, 1000);
  }

// STOP TIMER IF ALL CARDS ARE Matched

function stopTimer(){
    gameStarted = false;
    clearInterval(counter);
}
// Shuffle cards

function shuffle(icons){
  var currentIndex = icons.length, temporaryValue, randomIndex;

  while(currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = icons[currentIndex];
    icons[currentIndex] = icons[randomIndex];
    icons[randomIndex] = temporaryValue;
  }
  return icons;
}

// FUNCTION CREATES CARDS AND APPEND TO deck

function generateCards(){

    for(let i = 0; i < icons.length; i++){
      const card1 = document.createElement("li");
      card1.className = "card";
      card1.innerHTML = `<i class="${icons[i]}"></i>`;
      deck.appendChild(card1);

      click(card1);
  }

}
function initGame(){
  shuffle(icons);
  generateCards();
  moves = 0;
  // counter.innerHTML = moves;

}

// FLIP the CARD..

 function click(card){
   card.addEventListener('click',function(){
     if(!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")){
            // timer();
            card.classList.add("open","show");
            openCards.push(card);
            console.log(openCards);
            checkForMatch();
       }

      //
   });
 }
// Function to remove 'open' & 'show' classes to card
function closeCard(card) {
    setTimeout(() => {
        card.classList.remove('open', 'show', 'disable');
    }, 1000)
}

// Function to add 'match' class to card
function matchCard(card) {
    setTimeout(() => {
        card.classList.add('match', 'bounceIn');
    }, 1000)
}

function checkForMatch() {
    const length = openCards.length;
    if (length === 2) {

        const last = openCards[1];
        const preLast = openCards[0];
  // IF CARDS ARE MATCHED
        if (last.children[0].classList.toString() ===
            preLast.children[0].classList.toString()) {
            matchCards.push(last);
            matchCards.push(preLast);
            // incrementMatches();
            matchCard(last);
            matchCard(preLast);

            console.log(matchCards);
        } else {    // IF CARDS ARE NOT MATCHED.
            closeCard(last);
            closeCard(preLast);
        }
        countingMoves();
        openCards = [];
        gameWin();
    }
}
// var matches = 0;
// function incrementMatches() {
//     matches++;
//     console.log(matches);
// }

// START COUNT MOVES AFTER 1ST CARD CLICKED

function countingMoves(){
    moves++;
    let counter = document.querySelector(".moves-count");
    counter.innerHTML = moves;
    if(moves === 1){
        second = 0;
        minute = 0;
        timer();
      }
      determineRating(moves);
    }

  // set Ratingg and Final score

function determineRating(moves){
      if(moves > 0 && moves <= 10){
          starRating = starRating;
        } else if (moves > 10 && moves <= 17) {
          starRating = starRating -1;
        } else {
          starRating = starRating - 2;
        }
        //   for(let i= 0 ; i < 3; i++){
        //       if(i > 1){
        //           stars[i].style.visibility = "collapse";
        //       }
        //   }
        // }
        // else if( moves > 17){
        //   for(var i = 0; i < 3; i++){
        //       if(i > 0){
        //         stars[i].style.visibility = "collapse";
        //       }
        //     }
        //   }
      }
      //   starRating = starRating;
      // } else if (moves > 17 && moves <= 22) {
      //   starRating = starRating -1;
      // } else {
      //   starRating = starRating - 2;
      // }
      // return starRating;
  // }

// IF ALL CARDS ARE MATCHE THEN SHOW A MODAL..

function gameWin(){
    if(matchCards.length === icons.length){
        stopTimer();
        alert("Game is Over");
        // showModal();
        finalTime = time.innerHTML;
        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;

        // showing move, rating and time on modal
        // determineRating(moves);
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starrating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    }
}

function showModal(){
    modal.classList.add("show");
    var starRating = document.querySelector(".stars").innerHTML;
    finalTime = time.innerHTML;
    // showing move, rating and time on modal
    determineRating(moves);
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starrating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    closeModal();
}

// CLose ICON on modal

function closeModal(){
    closeSymbol.addEventListener("click", function(e){
        modal.classList.remove("show");
        initGame();
    });
}

// For PLAYER TO PLAY Again

function playAgain(){
    modal.classList.remove("show");
    initGame();
}

 initGame();
