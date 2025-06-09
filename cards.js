const allImages = [
    'img/skye.png',
    'img/rokki.png',
    'img/rider.png',
    'img/marshall.png',
    'img/kremez.png',
    'img/everest.png',
    'img/chase.png',
    'img/18.png',
    'img/17.png',
    'img/16.png',
    'img/15.png',
    'img/14.png',
    'img/13.png',
    'img/12.png',
    'img/11.png',
    'img/10.png',
    'img/9.png',
    'img/8.png',
    'img/7.png',
    'img/6.png',
    'img/5.png',
    'img/4.png',
    'img/3.png',
    'img/2.png',
    'img/1.png',
    'img/1559859056chase-paw-patrol-clipart-png-10.png',
    'img/fa40eb0049cede8a9bdf294a141dbd0d.png',
    'img/paw-sup22-grp-001-cgi-skye-no-cable_ver_1.png',
    'img/imageMarshall.png',
    'img/cocomelon-monkey-png-12.png',
    'img/Cocomelon-PNG-Image.png',
    'img/Pickles_29NANA.webp'
];

function createCard(imgSrc, index) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = imgSrc;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"><img src="img/card_back.png" alt="img" /></div>
            <div class="card-back"><img src="${imgSrc}" alt="img" /></div>
        </div>
    `;

    card.addEventListener("click", handleCardClick);
    return card;
}



function getRandomItems(arr, count) {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function adjustGrid(pairCount) {
    const columns = Math.ceil(Math.sqrt(pairCount * 2));
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 5fr)`;
}

function flipAllCards() {
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("flipped");
    });
}
