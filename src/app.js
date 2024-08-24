/* eslint-disable */
import "bootstrap";
import "./style.css";

// Datos de cartas
const cardValues = [
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
  "A"
];
const cardSuits = ["♦", "♠", "♥", "♣"];

// Función para generar un valor aleatorio
function getRandomValue() {
  const options = cardValues;
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Función para generar una pinta aleatoria
function getRandomSuit() {
  const suits = cardSuits;
  const randomIndex = Math.floor(Math.random() * suits.length);
  return suits[randomIndex];
}

// Función para crear una carta aleatoria
function createRandomCard() {
  const value = cardValues[Math.floor(Math.random() * cardValues.length)];
  const suit = cardSuits[Math.floor(Math.random() * cardSuits.length)];
  return { value, suit };
}

// Función para generar un número específico de cartas aleatorias
function createCardDeck(count) {
  const deck = [];
  for (let i = 0; i < count; i++) {
    deck.push(createRandomCard());
  }
  return deck;
}

// Función para mostrar las cartas en un contenedor
function displayCards(cards, container) {
  container.innerHTML = "";
  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.className = `card ${
      card.suit === "♥" || card.suit === "♦" ? "red" : "black"
    }`;
    cardElement.innerHTML = `<span class="top-suit">${card.suit}</span>
                              <span class="number">${card.value}</span>
                              <span class="bottom-suit">${card.suit}</span>`;
    container.appendChild(cardElement);
  });
}

// Función de ordenamiento Bubble Sort
const bubbleSortCards = deck => {
  let isSorted = false;
  const steps = [];
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < deck.length - 1; i++) {
      if (
        cardValues.indexOf(deck[i].value) >
        cardValues.indexOf(deck[i + 1].value)
      ) {
        let temp = deck[i];
        deck[i] = deck[i + 1];
        deck[i + 1] = temp;
        isSorted = false;
      }
    }
    steps.push([...deck]);
  }
  return steps;
};

// Función para renderizar los pasos del ordenamiento
function displaySortingSteps(steps, container) {
  container.innerHTML = "";
  steps.forEach((step, index) => {
    const stepElement = document.createElement("div");
    stepElement.className = "step";
    const title = document.createElement("h3");
    title.textContent = `Step ${index}`;
    stepElement.appendChild(title);
    const cardRow = document.createElement("div");
    cardRow.className = "card-row";
    step.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.className = `card ${
        card.suit === "♥" || card.suit === "♦" ? "red" : "black"
      }`;
      cardElement.innerHTML = `<span class="top-suit">${card.suit}</span>
                                <span class="number">${card.value}</span>
                                <span class="bottom-suit">${card.suit}</span>`;
      cardRow.appendChild(cardElement);
    });
    stepElement.appendChild(cardRow);
    container.appendChild(stepElement);
  });
}

// Event listener para el botón de generar cartas
document.getElementById("drawButton").addEventListener("click", () => {
  const numberOfCards = parseInt(document.getElementById("cardCount").value);
  if (isNaN(numberOfCards) || numberOfCards < 1) return;
  const deck = createCardDeck(numberOfCards);
  displayCards(deck, document.getElementById("cardContainer"));
  document.getElementById("sortButton").dataset.deck = JSON.stringify(deck);
});

// Event listener para el botón de ordenar cartas
document.getElementById("sortButton").addEventListener("click", () => {
  const deck = JSON.parse(document.getElementById("sortButton").dataset.deck);
  const sortingSteps = bubbleSortCards(deck);
  displaySortingSteps(sortingSteps, document.getElementById("logContainer"));
});
