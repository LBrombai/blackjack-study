import { Shoe } from "./Shoe.js";
import { Player } from "./Player.js";
import { Dealer } from "./Dealer.js";
import { GameState } from "./GameState.js";

const shoe = new Shoe(1);
const player = new Player("Flavin");
const dealer = new Dealer("Dealer");

const gameState = new GameState(shoe, [player], dealer, []);

gameState.startGame();
gameState.handlePlayersDraws();

if (gameState.gameStatus === "DEALER_TURN") {
  gameState.handleDealerTurn();
} else {
  alert("Game over");
}
