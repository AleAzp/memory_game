//elementos del HTML
const input = document.getElementById('cardsInput');
const error = document.getElementById('errorMessage');
const grid = document.getElementById('grid')
const pareja = document.getElementById('conseguistePareja');

let cards = []
let pairFlipped = [] 
let cardArr = [] 
let cardArrWIN = []

//acción bottón let's play
function generarPartida(event) {
  grid.innerHTML = '';
  event.preventDefault();
  validateNumber()
  pareja.textContent = ''
  
}


//validar que el numero del input esté entre el 2-10 (lo mínimo y máximo para poder jugar)
function validateNumber() {
  const value = input.value; //guardar el contenido escrito en el input
  error.textContent = ''; //formatear el mensaje de error
  if (value <= 10 && value >= 2) {
    console.log(value)
  } else {
    error.textContent = '¡Introduce un número entre 2 y 10!'; //nos devuelve el contenido de texto de un elemento HTML concreto
    generarPartida()
  } 
  generateCards(value) //llamar función
}


// generates a new deck of cards, with size / 2 pairs, and shuffled
function generateCards(size) { //size = num de parejas
   //declaro cards como un array, donde meteré mis cartas ordenadas
  cards = []
  for (let i=1;i<=size;i++){
    cards.push(i) //dos push, pq necesito dos cartas de cada
    cards.push(i)
  }
  cards = shuffle(cards) 
  introducirDOM (cards)
}

// shuffles an array
function generateRandomIntegers(min, max) { //genero un número random entre min y max
  return Math.floor(Math.random() * (max - min) + min);
}

function removeAtarray(arr, index){ //elimina del array un elemento por índice
  arr = arr.slice(0, index).concat(arr.slice(index + 1))
  return arr
}
function shuffle(arr) { 
  let cardsAux = [] //declaro variable array para luego meter ahí mis cartas mezcladas
  
  let initial_length = arr.length-1 //guardo en una variable el length inicial (pq luego voy a ir borrando y lo voy a perder)
  for (let i=0; i<=initial_length; i++){ //recorro arr 
    let index=generateRandomIntegers(0, arr.length-1) //llamo la funcion y activo la función generateRandomIntegers para generar un num radom (será mi índice)
    cardsAux.push(arr[index]) //meto el elemento seleccionado por índice (en cardAux)
    arr = removeAtarray(arr, index) ////llamo la función removeArray para evitar que me vuelva a salir aleatoriamente su mismo índice y se repita en num
  }

  return cardsAux 
}

function introducirDOM (cardsAux) {
  grid.innerHTML = ''; //formateo (me aseguro que no hay nada en el grid)
  for (let i=0;i<cardsAux.length;i++){
    const newCard = document.createElement('div') //creo elemento div en el DOM
    // newCard.innerText=cardsAux[i]  //(para ver las parejas)
    grid.appendChild(newCard); //inserto en el DOM
    newCard.classList = "tarjeta"; //añado una clase tarjeta para poder cambiar el css
    newCard.addEventListener("click", function() { //hago que las cartas sean clicables y llamen a la función flipCard
      flipCard(i);
    })
    newCard.id = "tarjeta"+i; //declaro que los IDs de las tarjetas en newCards deben ser la palabra "tarjeta"+ su índice para que sean únicos
    }
}


function flipCard(index) {// flips a card by id
  // console.log(index)
  // console.log (cards)
  const card = document.getElementById("tarjeta"+index); //del DOM al js
  const pairNumber = cards[index];  // numero de pareja
  // console.log(cards[index])
  if (card.classList.contains("flipped")===true) { //chequeas si la carta ya está flipped, y is lo está... no hace nada más
    return ;
  }
  card.classList.add ("flipped"); //añadir clase flipped
  card.classList.add ("pair-"+pairNumber) //añadir clase pareja (que cards[index])
  pairFlipped.push(pairNumber) //meto pairNumber de las dos cartas clicadas en el array pairFlipped, para chequear que si length es 2 y luego compararlas
  cardArr.push(card) //meto el array card completo en carArr para tener la info fuera del scope
  if (pairFlipped.length==2){ //aseguro que sólo hice dos clics
    checkMatched(cardArr) 
    pairFlipped = [] //reseteo
    cardArr = [] //reseteo
  } 
  console.log (pairFlipped)
}

// console.log (pairFlipped)
// console.log (cardArr)

// comparo el pairNumber de mis dos cartas seleccionadas
function checkMatched(cardArr) {
  if(pairFlipped[0]!==pairFlipped[1]){ 
    console.log ("son distintas")
    pareja.textContent = '¡Sigue intentando!'
    setTimeout(() => { //delay
      pareja.textContent = ''
    }, 800);
    setTimeout(() => { //delay
      flipBack(cardArr)
    }, 800);
  } else { 
    cardArrWIN.push(cardArr[0])
    cardArrWIN.push(cardArr[1])
    console.log("conseguiste una pareja")
    pareja.textContent = '¡Conseguiste una pareja!'
    setTimeout(() => { //delay
      pareja.textContent = ''
    }, 800);
    checkWin(cardArrWIN)
  }
}

// // shows a message if the game is over
function checkWin(cardArrWIN) {
  let size0 = cardArrWIN.length
  if (size0===cards.length){
    console.log("ganaste")
    ganarJuego()
  }
}

function ganarJuego() {
  const modal = document.getElementById("popupGanador");
  modal.style.display = "block";
  }
  // Función para cerrar el modal
  function cerrarModal() {
  const modal = document.getElementById("popupGanador");
  modal.style.display = "none";
  location.reload(); // Recarga la página
  }

function flipBack(cardArr) { //le quito las clases que hacen que estén visibles
    cardArr[0].classList.remove("flipped")
    cardArr[1].classList.remove("flipped")
  }


