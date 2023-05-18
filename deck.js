const SUITS = ["club", "diamond", "heart", "spade"];
const VALUE = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  constructor(cards = freshdeck()) {
    this.cards = cards;
  }

  get numberOfCard() {
    return this.cards.length;
  }

  pop() {
    return this.cards.shift();
  }

  push(card) {
    this.cards.push(card);
  }

  shuffle() {
    for (let i = this.numberOfCard - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  getHtml() {
    const cardDiv = document.createElement("div");

    cardDiv.classList.add("card");

    cardDiv.dataset.suit = this.suit;
    cardDiv.dataset.value = this.value;

    const valueAsNumber = parseInt(this.value);
    if (isNaN(valueAsNumber)) {
      cardDiv.append(createPip());
    } else {
      for (let i = 0; i < valueAsNumber; i++) {
        cardDiv.append(createPip());
      }
    }

    cardDiv.append(createCornerNumber("top", this.value));
    cardDiv.append(createCornerNumber("bottom", this.value));

    return cardDiv;
  }
}

function freshdeck() {
  return SUITS.flatMap((suit) => {
    return VALUE.map((value) => {
      return new Card(suit, value);
    });
  });
}

function createCornerNumber(position, value) {
  const corner = document.createElement("div");
  corner.textContent = value;
  corner.classList.add("corner-number");
  corner.classList.add(position);
  return corner;
}

function createPip() {
  const pip = document.createElement("div");
  pip.classList.add("pip");
  return pip;
}
