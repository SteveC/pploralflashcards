let currentCard = -1;
let answerVisible = false;
let shuffledCards = [];
let currentIndex = 0;

document.getElementById("showAnswerBtn").addEventListener("click", function() {
    const answerElement = document.getElementById("answer");
    answerElement.style.visibility = "visible";
    answerVisible = true;
    document.getElementById("showAnswerBtn").style.display = "none";
    document.getElementById("nextQuestionBtn").style.display = "inline-block";
    // Remove the condition for showing the previous button
    document.getElementById("prevQuestionBtn").style.display = "inline-block";
});

document.getElementById("nextQuestionBtn").addEventListener("click", showNextCard);

document.getElementById("prevQuestionBtn").addEventListener("click", showPreviousCard);

function generateQuestionHash(question) {
    return Math.abs(question.split('').reduce((a, b) => {
        return ((a << 5) - a) + b.charCodeAt(0);
    }, 0)).toString(16).substring(0, 4); // Convert to hex and limit to 4 characters
}

function shuffleCards() {
    shuffledCards = [...flashcards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    currentIndex = 0;
}

function showNextCard() {
    const allFlashcardsDiv = document.querySelector(".all-flashcards");
    allFlashcardsDiv.style.display = "none"; 

    const flashcardDiv = document.querySelector(".flashcard");
    flashcardDiv.style.display = "flex"; 

    if (currentIndex >= shuffledCards.length) {
        shuffleCards();
    }

    const card = shuffledCards[currentIndex];
    const questionHash = generateQuestionHash(card.question);

    document.getElementById("question").textContent = `Question ${questionHash}: ${card.question}`;
    document.getElementById("answer").textContent = card.answer;
    document.getElementById("answer").style.visibility = "hidden";
    answerVisible = false;

    document.getElementById("showAnswerBtn").style.display = "inline-block";
    document.getElementById("nextQuestionBtn").style.display = "none";
    
    updateButtonState();

    currentIndex++;
}

function showPreviousCard() {
    if (currentIndex > 1) {
        currentIndex -= 2;
        showNextCard();
    }
}

function listAllFlashcards() {
    const flashcardDiv = document.querySelector(".flashcard");
    flashcardDiv.style.display = "none";

    const allFlashcardsDiv = document.querySelector(".all-flashcards");
    allFlashcardsDiv.innerHTML = "";
    allFlashcardsDiv.style.display = "block";

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

        const questionHash = generateQuestionHash(card.question);
        const cardElement = document.createElement("div");
        cardElement.innerHTML = `Question ${questionHash}: <b>${card.question}</b><br />Answer: ${card.answer}<br /><br />`;
        allFlashcardsDiv.appendChild(cardElement);
    });
}

document.getElementById("navItem1").addEventListener("click", function() {
    currentIndex = 0;
    showNextCard();
});

document.getElementById("navItem2").addEventListener("click", listAllFlashcards);

function updateButtonState() {
    const prevButton = document.getElementById("prevQuestionBtn");
    if (currentIndex === 0) {
        prevButton.disabled = true;
        prevButton.classList.add("btn-secondary");
        prevButton.classList.remove("btn-primary");
    } else {
        prevButton.disabled = false;
        prevButton.classList.add("btn-primary");
        prevButton.classList.remove("btn-secondary");
    }
}

window.onload = function() {
    shuffleCards();
    updateButtonState(); // Call this before showing the first card
    showNextCard();
};
