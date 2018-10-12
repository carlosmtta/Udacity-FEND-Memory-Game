/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

// Movimentos do jogador
const moves = document.getElementsByClassName('moves');
const stars = document.getElementsByClassName('stars');

// Reiniciar jogo
const restart = document.getElementsByClassName('restart');

//Array com as cartas do jogo
var cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
var openedCards = [];

// Controla os cliques nas cartas
var holdCards = false;

// Função para embaralhar as cartas
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Embaralha cartas e as adiciona ao html
function init() {
    cards = shuffle(cards)
    for (var i = 0; i < cartas.length; i++) {
        cartas[i].firstElementChild.className = "fa " + cards[i];
    }
}



// Função que adiciona carta aberta no jogo em um array
function addCard(card) {
    //openedCards.push(card)
    
    var teste;
    var finish;
    if (openedCards.length != 0) {
        teste = checkMatch(card);
        if (teste) {
            lockCards(card);
            addMove();
            finish = checkFinish();
            if (finish) {
                setTimeout(function() {
                alert("Parabéns, você concluíu o jogo em " + moves[0].innerHTML + " jogadas.")
            }, 1000)
            }
            openedCards = [];
        } else {
            openedCards.push(card);
            holdCards = true;
            setTimeout(function() {
                hideCards();
                holdCards = false;
            }, 1800)
            addMove();
            openedCards = [];
        }
    } else {
        openedCards.push(card);
    }
}

// Função que trava os pares de cartas acertados
function lockCards(card) {
    for (var i = 0; i < cartas.length; i++) {
        if (cartas[i].firstElementChild.className.indexOf(card) > -1) {
            cartas[i].firstElementChild.className += " lock";
        }
    }   
}

// Função que volta a esconder os cards
function hideCards() {
    for (let i = 0; i < cartas.length; i++) {
            if (cartas[i].firstElementChild.className.indexOf("lock") == -1) {
                cartas[i].classList.remove("open", "show");
            }
        }
}

// Função que verifica se o jogo acabou
function checkFinish() {
    for (let i = 0; i < cartas.length; i++) {
            if (cartas[i].firstElementChild.className.indexOf("lock") == -1) {
                return false;
            }
    }
    return true;

}


// Função que remove carta fechada no jogo do array
function removeCard() {
        hideCards();
        openedCards = [];
}

// Função que checa se a carta bateu
function checkMatch(card) {
    for (var i = 0; i < openedCards.length; i++) {
        if (card == openedCards[i]) {
            return true;
        }
    }
    return false;
}

// Incrementa os movimentos do jogador

function addMove() {
    stars[0].innerHTML += '<li><i class="fa fa-star"></i></li>';
    moves[0].innerHTML = parseInt(moves[0].innerHTML) + 1;
}

// Exibe ou esconde card
function showSymbol(card) {
    // Exibe ou esconde cards conforme estado atual.
    card.classList.toggle('open');
    card.classList.toggle('show');

    // verifica esta
    if (card.classList.contains("open") && card.classList.contains("show")) {
        var getCard = card.lastElementChild.className.split(" ")
        addCard(getCard[1]);
    } else {
        removeCard();
        addMove();
    }
}

// armazena cards e adiciona um gerenciador de eventos a cada card
const cartas = document.getElementsByClassName('card');
for (let i = 0; i < cartas.length; i++) {
cartas[i].addEventListener("click", function() {
    if (cartas[i].firstElementChild.className.indexOf("lock") == -1 && !holdCards) {
        showSymbol(cartas[i]);
    }
});
}

restart[0].addEventListener("click", function() {
    for (let i = 0; i < cartas.length; i++) {
            cartas[i].classList.remove("open", "show");
    }
    stars[0].innerHTML = ''
    moves[0].innerHTML = 0;
    init();
});


init();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */