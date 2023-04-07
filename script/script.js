let numberOfCardsRotated = 0;
let card1;
let card2;

function rotate(card) {
    card.querySelector('.front-face').classList.add('front-face-rotation');
    card.querySelector('.back-face').classList.add('back-face-rotation');

    checkCards(card);
}

function unrotate() {
    card1.querySelector('.front-face').classList.remove('front-face-rotation');
    card1.querySelector('.back-face').classList.remove('back-face-rotation');

    card2.querySelector('.front-face').classList.remove('front-face-rotation');
    card2.querySelector('.back-face').classList.remove('back-face-rotation');

    numberOfCardsRotated = 0;
}

function checkCards(card) {

    if (numberOfCardsRotated == 0) {
        card1 = card;
        numberOfCardsRotated++;
    } else {
        card2 = card;
        numberOfCardsRotated++;
        setTimeout(unrotate, 1000);
    }

    //codigo se card1 == card2

    //codigo se cadr1 != card2
    
    
}