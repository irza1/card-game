import Deck from "./deck.js";

const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const computer = document.querySelector(".computer");
const player = document.querySelector(".player");
const computerDeckEl = document.querySelector(".computer-deck");
const playerDeckEl = document.querySelector(".player-deck");
const text = document.querySelector(".text");

let playerDeck, computerDeck, inRound, stop;

document.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }

  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCard();
  }
});

startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidPoint = Math.ceil(deck.numberOfCard / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidPoint));
  computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCard));
  inRound = false;
  stop = false;

  cleanBeforeRound();
}

function cleanBeforeRound() {
  inRound = false;
  text.innerHTML = "";
  computer.innerHTML = "";
  player.innerHTML = "";

  updateDeckCount();
}

function flipCard() {
  inRound = true;

  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  player.appendChild(playerCard.getHtml());
  computer.appendChild(computerCard.getHtml());

  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerHTML = "Win";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerHTML = "Lose";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    text.innerHTML = "Draw";
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
    text.innerHTML = "You Lose";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerHTML = "You Win";
    stop = true;
  }
}

function updateDeckCount() {
  computerDeckEl.innerText = computerDeck.numberOfCard;
  playerDeckEl.innerText = playerDeck.numberOfCard;
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isGameOver(deck) {
  return deck.numberOfCard === 0;
}
