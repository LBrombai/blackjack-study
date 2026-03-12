// ======= ELEMENTOS DO DOM =======
const dealerCardsEl = document.getElementById("dealer-cards");
const playerCardsEl = document.getElementById("player-cards");

const dealerPointsEl = document.getElementById("dealer-points");
const playerPointsEl = document.getElementById("player-points");

const hitBtn = document.getElementById("hit");
const standBtn = document.getElementById("stand");
const restartBtn = document.getElementById("restart");

const messageEl = document.getElementById("message");





// ======= ESTADO DO JOGO =======
let playerHand = [];
let dealerHand = [];


// ======= UTILITARIOS =======
let dealerHidden = true;

function getCardImage(card) {
  const suitName = suitMap[card.suit];
  return `./src/images/cards/${suitName}_${card.label}.png`;
}



//======CRIAR CARTA =====
function addCard(container, card, hide = false) {

  const cardEl = document.createElement("div");
  cardEl.classList.add("card", "card-enter");

  if (hide) {

    cardEl.classList.add("flip-card");

    const inner = document.createElement("div");
    inner.classList.add("flip-inner");

    const back = document.createElement("img");
    back.src = "./src/images/cards/back_dark.png";
    back.classList.add("card-face");

    const front = document.createElement("img");
    front.src = getCardImage(card);
    front.classList.add("card-face", "card-front");

    inner.appendChild(back);
    inner.appendChild(front);
    cardEl.appendChild(inner);

  } else {

    const img = document.createElement("img");
    img.src = getCardImage(card);
    img.classList.add("card-img");

    cardEl.appendChild(img);
  }

  container.appendChild(cardEl);
}


// ======= BARALHO (VERSÃO SIMPLES) =======
const suitMap = {
  "♣": "clubs",
  "♦": "diamonds",
  "♥": "hearts",
  "♠": "spades",
};
const values = [
  { label: "A", points: 11 },
  { label: "2", points: 2 },
  { label: "3", points: 3 },
  { label: "4", points: 4 },
  { label: "5", points: 5 },
  { label: "6", points: 6 },
  { label: "7", points: 7 },
  { label: "8", points: 8 },
  { label: "9", points: 9 },
  { label: "10", points: 10 },
  { label: "J", points: 10 },
  { label: "Q", points: 10 },
  { label: "K", points: 10 },
];

const suits = ["♣", "♦", "♥", "♠"];


function drawCard() {
  const value = values[Math.floor(Math.random() * values.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];

  return {
    label: value.label,
    suit,
    points: value.points,
  };
}

// ======= CÁLCULO DE PONTOS =======
function calculatePoints(hand) {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    total += card.points;
    if (card.label === "A") aces++;
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}


function updatePoints() {

  playerPointsEl.textContent = calculatePoints(playerHand);

  if (dealerHidden) {
    dealerPointsEl.textContent = dealerHand[0].points;
  } else {
    dealerPointsEl.textContent = calculatePoints(dealerHand);
  }

}

// ======= CONTROLE DO JOGO =======
function startGame() {

  dealerHidden = true;
  playerHand = [];
  dealerHand = [];

  dealerCardsEl.innerHTML = "";
  playerCardsEl.innerHTML = "";

  messageEl.textContent = "";

  playerHand.push(drawCard(), drawCard());
  dealerHand.push(drawCard(), drawCard());

  addCard(playerCardsEl, playerHand[0]);
  addCard(playerCardsEl, playerHand[1]);

  addCard(dealerCardsEl, dealerHand[0]);
  addCard(dealerCardsEl, dealerHand[1], true);

  updatePoints();

  hitBtn.disabled = false;
  standBtn.disabled = false;
}

function endGame() {
  hitBtn.disabled = true;
  standBtn.disabled = true;
}

// ======= EVENTOS =======
hitBtn.addEventListener("click", () => {

  const newCard = drawCard();
  playerHand.push(newCard);

  addCard(playerCardsEl, newCard);

  updatePoints();

  if (calculatePoints(playerHand) > 21) {
    messageEl.textContent = "💥 Você estourou! 💥";
    endGame();
  }
});

function finishGame() {

  const playerPoints = calculatePoints(playerHand);
  const dealerPoints = calculatePoints(dealerHand);

  if (dealerPoints > 21 || playerPoints > dealerPoints) {
    messageEl.textContent = "🎉 Você venceu! 🎉";
  } else if (playerPoints < dealerPoints) {
    messageEl.textContent = "Dealer venceu!";
  } else {
    messageEl.textContent = "Empate!";
  }

  endGame();
}

function dealerTurn() {

  if (calculatePoints(dealerHand) < 17) {

    const newCard = drawCard();
    dealerHand.push(newCard);

    addCard(dealerCardsEl, newCard);

    updatePoints();

    setTimeout(dealerTurn, 800);

  } else {
    finishGame();
  }

}

standBtn.addEventListener("click", () => {

  standBtn.disabled = true;
  hitBtn.disabled = true;

  dealerHidden = false;

  const hiddenCard = document.querySelector(".flip-card");

  if (hiddenCard) {
    hiddenCard.classList.add("flipped");
  }

  setTimeout(dealerTurn, 700);

});

restartBtn.addEventListener("click", startGame);

// ======= INICIAR =======
startGame();


