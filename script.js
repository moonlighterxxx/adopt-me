const correctPet = "Unicorn"; // You can change this
const guessesList = document.getElementById("guessesList");
const guessInput = document.getElementById("guessInput");

function submitGuess() {
  const guess = guessInput.value.trim();

  if (!guess) return;

  const feedbackBox = document.createElement("div");
  feedbackBox.classList.add("feedback-box");

  if (guess.toLowerCase() === correctPet.toLowerCase()) {
    feedbackBox.classList.add("feedback-green");
    feedbackBox.textContent = `🎉 Correct! It's the ${correctPet}.`;
  } else if (guess[0]?.toLowerCase() === correctPet[0]?.toLowerCase()) {
    feedbackBox.classList.add("feedback-yellow");
    feedbackBox.textContent = `🟡 Close! Starts with the same letter.`;
  } else {
    feedbackBox.classList.add("feedback-red");
    feedbackBox.textContent = `❌ Nope! Try again.`;
  }

  // Add new guess box on top
  guessesList.appendChild(feedbackBox);
  guessInput.value = "";
}
