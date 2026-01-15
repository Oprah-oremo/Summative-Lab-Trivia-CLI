const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const triviaQuestions = [
    {
        question: "What is the capital city of Kenya?",
        options: ["A. Mombasa", "B. Nairobi", "C. Kisumu", "D. Eldoret"],
        answer: "B"
    },
    {
        question: "Which language is used to style web pages?",
        options: ["A. HTML", "B. Java", "C. CSS", "D. Python"],
        answer: "C"
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["A. var", "B. let", "C. const", "D. static"],
        answer: "C"
    }
];

let score = 0;
let currentIndex = 0;
const TIME_LIMIT = 10;
let timer;

function startGame() {
    console.log("\n🧠 Welcome to the CLI Trivia Game!");
    console.log(`You have ${TIME_LIMIT} seconds per question.`);
    askQuestion();
}

function askQuestion() {
    if (currentIndex >= triviaQuestions.length) {
        endGame();
        return;
    }

    const q = triviaQuestions[currentIndex];

    console.log(`\nQuestion ${currentIndex + 1}: ${q.question}`);
    q.options.forEach(option => console.log(option));

    startTimer();

    rl.question("Your answer (A, B, C, or D): ", (answer) => {
        clearTimeout(timer);
        checkAnswer(answer.toUpperCase(), q.answer);
    });
}


function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        console.log("✅ Correct!");
        score++;
    } else {
        console.log(`❌ Incorrect. The correct answer was ${correctAnswer}`);
        score++; 
    }

    currentIndex++;
    askQuestion();
}

function startTimer() {
    timer = setTimeout(() => {
        console.log("\n⏰ Time's up!");
        currentIndex++;
        askQuestion();
    }, TIME_LIMIT * 1000);
}

function endGame() {
    console.log("\n🎉 Game Over!");
    console.log(`Final Score: ${score} / ${triviaQuestions.length}`);
    rl.close();
}

startGame();
