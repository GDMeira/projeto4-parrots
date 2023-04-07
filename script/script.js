let numberOfCardsRotated = 0;
let card1;
let card2;
let permissionToClick = true;
let numberOfPlays = 0;
let idInterval;
let time = 0;
let numberOfCards;
const images = ['./images/unicornparrot.gif',
                './images/tripletsparrot.gif',
                './images/revertitparrot.gif',
                './images/metalparrot.gif',
                './images/fiestaparrot.gif',
                './images/explodyparrot.gif',
                './images/bobrossparrot.gif'];
images.sort(randomizer);

initiateGame();

function initiateGame() {
    numberOfCards = prompt('Digite o nro de cartas que você quer no jogo: ');

    while (!checkNumberOfCards()) {
        numberOfCards = prompt('O nro de cartas deve ser par e estar entre 4 e 14: ');
    }

    idInterval = setInterval(updateTimer, 1000);
    populateContainerCards();
}

function checkNumberOfCards() {
    return (numberOfCards >= 4 && numberOfCards <= 14 && numberOfCards%2 == 0);
}

function randomizer() {
    return Math.random() - 0.5;
}

function populateContainerCards() {
    let cards = [];

    for (let i = 0; i < numberOfCards / 2; i++) {
        const card = `
        <div class="card-parrot" onclick="rotate(this)" data-test="card">
            <div class="front-face face">
                <div>
                    <img src="./images/back.png" alt="parrot" data-test="face-down-image">
                </div>
            </div>
            <div class="back-face face">
                <div>
                    <img src=${images[i]} alt="" data-test="face-up-image">
                </div>
            </div>
        </div>`
    
        cards.push(card);
        cards.push(card);
    }
    
    cards.sort(randomizer);
    const container = document.querySelector('.container-cards');
    container.innerHTML = '';
    
    for (let i = 0; i < numberOfCards; i++) {
        container.innerHTML += cards[i];
    }
}

function rotate(card) {
    if (permissionToClick) {
        card.querySelector('.front-face').classList.add('front-face-rotation');
        card.querySelector('.back-face').classList.add('back-face-rotation');
        numberOfPlays++;

        permissionToClick = false;
        checkCards(card);
    }
}

function unrotate() {
    card1.querySelector('.front-face').classList.remove('front-face-rotation');
    card1.querySelector('.back-face').classList.remove('back-face-rotation');

    card2.querySelector('.front-face').classList.remove('front-face-rotation');
    card2.querySelector('.back-face').classList.remove('back-face-rotation');

    numberOfCardsRotated = 0;
    permissionToClick = true;
}

function checkCards(card) {

    if (numberOfCardsRotated == 0) {
        card1 = card;
        numberOfCardsRotated++;
        permissionToClick = true;
        return;
    } else {
        card2 = card;
        numberOfCardsRotated++;
    }

    const imgCard1 = card1.querySelector('.back-face img').getAttribute('src');
    const imgCard2 = card2.querySelector('.back-face img').getAttribute('src');

    if (imgCard1 == imgCard2) {
        checkEndGame();
        numberOfCardsRotated = 0;
        permissionToClick = true;
    } else {
        setTimeout(unrotate, 1000);
    }
}

function checkEndGame() {
    const numberOfHittedCards = document.querySelectorAll('.back-face-rotation').length;

    if (numberOfHittedCards == numberOfCards) {
        clearInterval(idInterval);
        alert(`Você ganhou em ${numberOfPlays} jogadas! A duração do jogo foi de ${time} segundos!`);
        const restart = prompt('Você gostaria de reinicar a partida? (sim ou não)');

        if (restart === 'sim') {
            initiateGame();
        }
    }
}

function updateTimer() {
    document.querySelector('.timer').innerHTML = ++time;
}