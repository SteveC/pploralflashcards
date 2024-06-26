let currentCard = -1;
let answerVisible = false;

document.getElementById("showAnswerBtn").addEventListener("click", function() {
    const answerElement = document.getElementById("answer");
    answerElement.style.visibility = "visible";
    answerVisible = true;
    document.getElementById("showAnswerBtn").style.display = "none";
    document.getElementById("nextQuestionBtn").style.display = "inline-block";
});

document.getElementById("nextQuestionBtn").addEventListener("click", function() {
    showNextCard();
    document.getElementById("nextQuestionBtn").style.display = "none";
    document.getElementById("showAnswerBtn").style.display = "inline-block";
});

function generateQuestionHash(question) {
    return Math.abs(question.split('').reduce((a, b) => {
        return ((a << 5) - a) + b.charCodeAt(0);
    }, 0)).toString(16).substring(0, 4); // Convert to hex and limit to 4 characters
}

function showNextCard() {
    const allFlashcardsDiv = document.querySelector(".all-flashcards");
    allFlashcardsDiv.style.display = "none"; 

    const flashcardDiv = document.querySelector(".flashcard");
    flashcardDiv.style.display = "flex"; 

    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * flashcards.length);
    } while (newIndex === currentCard);
    currentCard = newIndex;

    const card = flashcards[currentCard];
    const questionHash = generateQuestionHash(card.question);

    document.getElementById("question").textContent = `Question ${questionHash}: ${card.question}`;
    document.getElementById("answer").textContent = card.answer;
    document.getElementById("answer").style.visibility = "hidden";
    answerVisible = false;
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
    showNextCard();
    document.getElementById("answer").style.visibility = "hidden";
    answerVisible = false;
    document.getElementById("nextQuestionBtn").style.display = "none";
    document.getElementById("showAnswerBtn").style.display = "inline-block";
});

document.getElementById("navItem2").addEventListener("click", listAllFlashcards);

window.onload = showNextCard;
