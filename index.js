// holds the deck of cards for the game
let cards = [];

// generates a new deck of cards, with size / 2 pairs, and shuffled
function generateCards(size) {}

// shuffles an array
function shuffle(arr) {}

// flips a card by id
function flipCard(id) {}

// marks any flipped cards as matched if they match
function checkMatched() {}

// shows a message if the game is over
function checkWin() {}

// sets all flipped props to false except for the matched ones
function flipBack() {}

// handles the click on a card
function handleCardClick(id) {}

// creates the DOM elements for the cards
function showCards() {}

// updates the classes on the card DOM elements based on the state of the cards
function updateCards() {}

// initializes the game
function createGame(size) {
  generateCards(size * size);
  showCards();
}

// INITIALIZE THE GAME WHEN THE PAGE LOADS
createGame(4);
