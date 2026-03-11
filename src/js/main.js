// ======= ELEMENTOS DO DOM =======
const dealerCardsEl = document.getElementById("dealer-cards");
const playerCardsEl = document.getElementById("player-cards");

const dealerPointsEl = document.getElementById("dealer-points");
const playerPointsEl = document.getElementById("player-points");

const hitBtn = document.getElementById("hit");
const standBtn = document.getElementById("stand");
const restartBtn = document.getElementById("restart");

const messageEl = document.getElementById("message");

// ======= BACKGROUND =======
const backgroundEl = document.getElementById("background");

function setBackground(state) {
  backgroundEl.className = "";

  switch (state) {
    case "win":
      backgroundEl.classList.add("bg-win");
      break;
    case "lose":
      backgroundEl.classList.add("bg-lose");
      break;
    default:
      backgroundEl.classList.add("bg-neutral");
  }
}


// ======= ESTADO DO JOGO =======
let playerHand = [];
let dealerHand = [];

// ======= UTILITARIOS =======

function getCardImage(card) {
  const suitName = suitMap[card.suit];
  return `./src/images/cards/${suitName}_${card.label}.png`;
}

function renderCards(container, hand) {
  container.innerHTML = "";

  for (const card of hand) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    const img = document.createElement("img");
    img.src = getCardImage(card);
    img.alt = `${card.label} de ${suitMap[card.suit]}`;
    img.classList.add("card-img");

    cardEl.appendChild(img);
    container.appendChild(cardEl);
  }
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
  dealerPointsEl.textContent = calculatePoints(dealerHand);
}

// ======= CONTROLE DO JOGO =======
function startGame() {
  setBackground("neutral");
  playerHand = [];
  dealerHand = [];
  messageEl.textContent = "";

  playerHand.push(drawCard(), drawCard());
  dealerHand.push(drawCard());

  renderCards(playerCardsEl, playerHand);
  renderCards(dealerCardsEl, dealerHand);
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
  playerHand.push(drawCard());
  renderCards(playerCardsEl, playerHand);
  updatePoints();

  if (calculatePoints(playerHand) > 21) {
    messageEl.textContent = "💥 Você estorou!💥";
    setBackground("win")
    endGame();
  }
});

standBtn.addEventListener("click", () => {
  while (calculatePoints(dealerHand) < 17) {
    dealerHand.push(drawCard());
  }

  renderCards(dealerCardsEl, dealerHand);
  updatePoints();

  const playerPoints = calculatePoints(playerHand);
  const dealerPoints = calculatePoints(dealerHand);

  if (dealerPoints > 21 || playerPoints > dealerPoints) {
    messageEl.textContent = "🎉 Você venceu! 🎉";
    setBackground("lose")
  } else if (playerPoints < dealerPoints) {
    setBackground("win")
    messageEl.textContent = "Dealer venceu!";
  } else {
    messageEl.textContent = "Empate!";
  }

  endGame();
});

restartBtn.addEventListener("click", startGame);

// ======= INICIAR =======
startGame();


