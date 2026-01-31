import { GAME_STATUS } from "./constants.js";

export class GameState {
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

  askDraw(player) {
    return confirm(
      `${player.name}, você tem: ${player.showCards()} (${player.getHandValue()}).\nDeseja comprar uma carta?`
    );
  }

  handlePlayersDraws() {
    while (true) {
      const drawablePlayers = this.players.filter(p => p.canDraw);

      if (!drawablePlayers.length) {
        if (this.players.some(p => !p.lost)) {
          this.gameStatus = GAME_STATUS.DEALER_TURN;
        }
        return;
      }

      drawablePlayers.forEach(player => {
        const wantDraw = this.askDraw(player);

        if (wantDraw) {
          const newCard = this.shoe.draw();
          player.hand.push(newCard);

          if (player.didLost()) {
            player.canDraw = false;
            player.lost = true;
            alert(`O jogador ${player.name} tirou ${newCard.name} e explodiu com ${player.getHandValue()}, o Dealer ganhou`);
          }
        } else {
          player.canDraw = false;
        }
      });
    }
  }

  handleDealerTurn() {
    while (this.dealer.getHandValue() < 17) {
      this.dealer.hand.push(this.shoe.draw());
    }

    const dealerHandValue = this.dealer.getHandValue();
    const playerHandValue = this.players[0].getHandValue();

    if (dealerHandValue > 21) {
      alert("Dealer explodiu, você ganhou!");
    } else if (playerHandValue > dealerHandValue) {
      alert(`Você ganhou com: ${playerHandValue}. Dealer fez: ${dealerHandValue}`);
    } else if (playerHandValue === dealerHandValue) {
      alert("Empate");
    } else {
      alert(`Vitória do Dealer com ${dealerHandValue}`);
    }

    this.gameStatus = GAME_STATUS.END_GAME;
  }
}
