const gameBoard = document.getElementById("game-board");
const startBtn = document.getElementById("start-btn");

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


startBtn.addEventListener("click", startGame);

function startGame() {
    const pairCount = parseInt(document.getElementById("card-pairs").value);
    const previewTime = parseInt(document.getElementById("preview-time").value) * 1000;

    const selectedImages = getRandomItems(allImages, pairCount);
    const cardImages = shuffle([...selectedImages, ...selectedImages]);

    document.querySelector(".settings").style.display = "none";

    resetBoard();
    adjustGrid(pairCount);

    cardImages.forEach((imgSrc, index) => {
        const card = createCard(imgSrc, index);
        card.classList.add("flipped"); // показати всі одразу
        gameBoard.appendChild(card);
    });

    if (previewTime > 0) {
        // Зачекати previewTime, після чого сховати всі картки
        setTimeout(() => {
            flipAllCards();
        }, previewTime);
    } else {
        flipAllCards();
    }


}

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

let flippedCards = [];
let lock = false;

function handleCardClick() {
    if (lock || this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const match = card1.dataset.value === card2.dataset.value;

        console.log(document.getElementById("hard-mode").checked);

        if (!match) {
            lock = true;
            setTimeout(() => {
                if (document.getElementById("hard-mode").checked) {
                    // В hard mode перевертаємо всі відкриті картки
                    document.querySelectorAll(".card.flipped").forEach(card => {
                        card.classList.remove("flipped");
                        console.log("FLIP ALL!!!")
                    });
                } else {
                    card1.classList.remove("flipped");
                    card2.classList.remove("flipped");
                }
                flippedCards = [];
                lock = false;
            }, 1000);
        } else {
            flippedCards = [];
        }
    }

    if (document.querySelectorAll(".card:not(.flipped)").length === 0) {
        setTimeout(() => {
            showFireworks();
        }, 500); // невелика пауза перед феєрверком
    }
}

function resetBoard() {
    gameBoard.innerHTML = "";
    flippedCards = [];
    lock = false;
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

function showFireworks() {
    let animationDuration = 6000;
    const fireworks = document.getElementById("fireworks");
    fireworks.classList.remove("hidden");

    setTimeout(() => {
        fireworks.classList.add("hidden");

    }, animationDuration);

    setTimeout(() => {
        document.querySelector(".settings").style.display = "flex";
    }, animationDuration)

}

function flipAllCards() {
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("flipped");
    });
}