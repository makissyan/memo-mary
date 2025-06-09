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

    disableScroll();
}


function handleCardClick() {
    if (lock || this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const match = card1.dataset.value === card2.dataset.value;

        if (!match) {
            lock = true;
            setTimeout(() => {
                if (document.getElementById("hard-mode").checked) {
                    // В hard mode перевертаємо всі відкриті картки
                    document.querySelectorAll(".card.flipped").forEach(card => {
                        card.classList.remove("flipped");
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
        enableScroll();
    }
}



function resetBoard() {
    gameBoard.innerHTML = "";
    flippedCards = [];
    lock = false;
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

function disableScroll() {
  document.body.classList.add('no-scroll');
}

function enableScroll() {
  document.body.classList.remove('no-scroll');
}
