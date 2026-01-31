import { Card } from "./Card.js";

export class Shoe {
  constructor(deckQuantity = 1, shouldShuffle = true) {
    this.deckQuantity = deckQuantity;
    this.cards = [];
    this.shouldShuffle = shouldShuffle;
    this.createShoe();
  }

  recreateShoe() {
    this.cards = [];
    this.createShoe();
  }

  createShoe() {
    const SUITS = ["♦", "♠", "♥", "♣"];
    const CARD_VALUES = ["A", "K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2];

    for (const suit of SUITS) {
      for (let i = 0; i < this.deckQuantity; i++) {
        for (const cardValue of CARD_VALUES) {
          let value;

          if (typeof cardValue === "number") {
            value = cardValue;
          } else {
            value = cardValue === "A" ? 11 : 10;
          }

          this.cards.push(new Card(cardValue + suit, value));
        }
      }
    }

    if (this.shouldShuffle) this.shuffle();
  }

  shuffle() {
    let currentIndex = this.cards.length, randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }
  }

  draw() {
    return this.cards.pop();
  }
}
