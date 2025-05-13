// script.js
const answer = "Terraria"; // or load from an array
const guessInput = document.getElementById("guessInput");
const feedbackDiv = document.getElementById("feedback");

function submitGuess() {
  const guess = guessInput.value.trim();
  let feedback = "";

  if (guess.toLowerCase() === answer.toLowerCase()) {
    feedback = "✅ Correct!";
  } else if (answer.toLowerCase().includes(guess.toLowerCase())) {
    feedback = "🟨 Contains it!";
  } else if (guess.toLowerCase() < answer.toLowerCase()) {
    feedback = "🔺 The correct answer comes *after* your guess alphabetically.";
  } else {
    feedback = "🔻 The correct answer comes *before* your guess alphabetically.";
  }

  feedbackDiv.innerHTML += `<p>${guess}: ${feedback}</p>`;
  guessInput.value = "";
}
