let currentCard = -1;
let answerVisible = false;

function toggleAnswer() {
    const answerElement = document.getElementById("answer");
    if (answerVisible) {
        showNextCard();
    } else {
        answerElement.style.visibility = "visible";
        answerVisible = true;
    }
}

function showNextCard() {
    const allFlashcardsDiv = document.querySelector(".all-flashcards");
    allFlashcardsDiv.style.display = "none"; // Hide the list of all flashcards

    const flashcardDiv = document.querySelector(".flashcard");
    flashcardDiv.style.display = "flex"; // Show the single flashcard

    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * flashcards.length);
    } while (newIndex === currentCard);
    currentCard = newIndex;

    const card = flashcards[currentCard];
    document.getElementById("question").textContent = card.question;
    document.getElementById("answer").textContent = card.answer;
    document.getElementById("answer").style.visibility = "hidden";
    answerVisible = false;
}

function listAllFlashcards() {
    const flashcardDiv = document.querySelector(".flashcard");
    flashcardDiv.style.display = "none"; // Hide the single flashcard view

    const allFlashcardsDiv = document.querySelector(".all-flashcards");
    allFlashcardsDiv.innerHTML = ""; // Clear previous content
    allFlashcardsDiv.style.display = "block"; // Show the list of all flashcards

    const cardCount = flashcards.length;
    const cardCountElement = document.createElement("div");
    cardCountElement.innerHTML = `Total Cards: ${cardCount}<br /><br />`;
    allFlashcardsDiv.appendChild(cardCountElement);

    let currentCategory = null;
    flashcards.forEach(card => {
        if (card.category !== currentCategory) {
            currentCategory = card.category;
            const categoryElement = document.createElement("div");
            categoryElement.innerHTML = `<h1>${currentCategory}:</h1>`;
            allFlashcardsDiv.appendChild(categoryElement);
        }

        const cardElement = document.createElement("div");
        cardElement.innerHTML = `Question: <b>${card.question}</b><br />Answer: ${card.answer}<br /><br />`;
        allFlashcardsDiv.appendChild(cardElement);
    });
}

// Event listeners for card interactions
document.querySelector(".flashcard").addEventListener("click", toggleAnswer);

document.getElementById("navItem1").addEventListener("click", function() {
    showNextCard();
    document.getElementById("answer").style.visibility = "hidden";
    answerVisible = false;
});

document.getElementById("navItem2").addEventListener("click", listAllFlashcards);

// Initialize the app with the first card visible
window.onload = showNextCard;
