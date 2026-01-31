<<<<<<< HEAD
class Card {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Shoe {
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

    if (this.shouldShuffle) {
      this.shuffle();
    }
  }

  shuffle() {
    let currentIndex = this.cards.length,
      randomIndex;

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

class Player {
  canDraw = true;
  lost = false;

  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  getHandValue() {
    if (this.hand.length === 0) {
      return 0;
    }

    const baseValue = this.hand.map((c) => c.value).reduce((a, b) => a + b, 0);
    const aceQuantity = this.hand.filter((card) =>
      card.name.includes("A")
    ).length;
    return baseValue > 21 && aceQuantity >= 1
      ? baseValue - 10 * aceQuantity
      : baseValue;
  }

  didLost() {
    return this.getHandValue() > 21;
  }

  showCards() {
    return this.hand.map((card) => card.name).join(", ");
  }
}

class Dealer extends Player {
  constructor(name, hand) {
    super(name, hand);
  }
}

const GAME_STATUS = {
  STARTED_GAME: "STARTED_GAME",
  PLAYERS_TURN: "PLAYERS_TURN",
  DEALER_TURN: "DEALER_TURN",
  END_GAME: "END_GAME",
};

class GameState {
  constructor(shoe, players, dealer, dealers) {
    this.shoe = shoe;
    this.players = players;
    this.dealers = dealers;
    this.dealer = dealer;
    this.gameStatus = GAME_STATUS.STARTED_GAME;
  }

  startGame() {
    for (const player of this.players) {
      this.setPlayerInitialHand(player);
    }

    for (const dealer of this.dealers) {
      this.dealerInitialhand(dealer);
    }

    this.gameStatus = GAME_STATUS.PLAYERS_TURN;
  }

  setPlayerInitialHand(player) {
    player.hand.push(this.shoe.draw());
    player.hand.push(this.shoe.draw());
  }

  dealerInitialhand(dealer) {
    dealer.hand.push(this.shoe.draw());
    dealer.hand.push(this.shoe.draw());
  }

  handlePlayersDraws() {
    while (true) {
      const drawablePlayers = this.players.filter((player) => player.canDraw);

      if (!drawablePlayers.length) {
        if (this.players.some((p) => !p.lost)) {
          this.gameStatus = GAME_STATUS.DEALER_TURN;
        }
        return;
      }

      drawablePlayers.forEach((player) => {
        const wantDraw = this.askDraw(player);

        if (wantDraw) {
          const newCard = this.shoe.draw();
          player.hand.push(newCard);

          if (player.didLost()) {
            player.canDraw = false;
            player.lost = true;
            alert(
              `O jogador ${player.name} tirou ${
                newCard.name
              } e explodiu com ${player.getHandValue()}, o Dealer ganhou`
            );
          }
        } else {
          player.canDraw = false;
        }
      });
    }
  }

  askDraw(player) {
    return confirm(
      `${
        player.name
      }, você tem: ${player.showCards()} (${player.getHandValue()}).\nDeseja comprar uma carta?`
    );
  }

  handleDealerTurn() {
    while (this.dealer.getHandValue() < 17) {
      const newCard = this.shoe.draw();
      this.dealer.hand.push(newCard);
    }

    const dealerHandValue = this.dealer.getHandValue();
    const playerHandValue = this.players[0].getHandValue();

    while (this.dealer.getHandValue() < playerHandValue) {
      const newCard = this.shoe.draw();
      this.dealer.hand.push(newCard);
    }

    if (dealerHandValue > 21) {
      alert("Dealer explodiu, você ganhou!");
    } else if (playerHandValue > dealerHandValue) {
      alert(
        `Você ganhou com: ${playerHandValue}. Dealer explodiu com: ${dealerHandValue}`
      );
    } else if (playerHandValue === dealerHandValue) {
      alert("Empate");
    } else {
      alert(`Vitória do Dealer com ${dealerHandValue}`);
    }

    this.gameStatus = GAME_STATUS.END_GAME;
  }
}

const shoe = new Shoe(1);
const player = new Player("flavin");
const dealer = new Dealer("Dealer");
=======
import { Shoe } from "./Shoe.js";
import { Player } from "./Player.js";
import { Dealer } from "./Dealer.js";
import { GameState } from "./GameState.js";

const shoe = new Shoe(1);
const player = new Player("Flavin");
const dealer = new Dealer("Dealer");

>>>>>>> c963f69 (chore: estrutura inicial do projeto blackjack)
const gameState = new GameState(shoe, [player], dealer, []);

gameState.startGame();
gameState.handlePlayersDraws();

<<<<<<< HEAD
if (gameState.gameStatus === GAME_STATUS.DEALER_TURN) {
=======
if (gameState.gameStatus === "DEALER_TURN") {
>>>>>>> c963f69 (chore: estrutura inicial do projeto blackjack)
  gameState.handleDealerTurn();
} else {
  alert("Game over");
}
