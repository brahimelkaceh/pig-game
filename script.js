'use strict';

// * 13/08/2022
// ! Selecting Elements :
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

// ! Starting Elements :
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  playing = true;
  dice.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
// ! initialazing The Game :
init();

// ! Switching Function
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');

  // ! instead of This
  // if (activePlayer === 1) {
  //   player0.classList.remove('player--active');
  //   player1.classList.add('player--active');
  // } else {
  //   player1.classList.remove('player--active');
  //   player0.classList.add('player--active');
  // }
};

// ! Rolling Dice Functionality :
btnRoll.addEventListener('click', function () {
  if (playing) {
    // ! Generating The Random Dice :
    let randomDice = Math.trunc(Math.random() * 6 + 1);

    // ! Display Dice :
    dice.classList.remove('hidden');
    dice.src = `dice-${randomDice}.png`;

    // ! Check If Randmo Dice = 1 ? true Move To The Next Player :
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // ! switching Player :
      switchPlayer();
    }
  }
});

// ! Holding Dice Functionality :
btnHold.addEventListener('click', function () {
  if (playing) {
    // ! Add current Score To player's score :
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // ! Check The Player Winner :
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // ! Switching Player :
      switchPlayer();
    }
  }
});

// ! New Game Funcionality :
btnNew.addEventListener('click', init);

// * 15/08/2022