const pets = [
  {
    name: "Dog",
    image: "https://i.postimg.cc/FFVLxNxL/Dog.webp",
    rarity: "Common",
    release: "June 15, 2019",
    colors: ["beige"],
    obtained: "Starter Egg",
    egg: "Yes",
    exclusive: "No"
  },
  {
    name: "Dragon",
    image: "https://i.postimg.cc/5NH1YyNH/Dragon.webp",
    rarity: "Legendary",
    release: "June 15, 2019",
    colors: ["red", "black"],
    obtained: "Pet Egg",
    egg: "Yes",
    exclusive: "No"
  },
  {
    name: "Cat",
    image: "https://i.postimg.cc/5NH1YyNH/Dragon.webp",
    rarity: "Common",
    release: "June 15, 2019",
    colors: ["grey"],
    obtained: "Pet Egg",
    egg: "Yes",
    exclusive: "No"
  }
];

// Pick a random pet to guess
const correctPet = pets[Math.floor(Math.random() * pets.length)];
const feedbackContainer = document.getElementById("feedbackContainer");
let guessCount = 0;

function submitGuess() {
  const input = document.getElementById("guessInput");
  const guess = input.value.trim();
  const guessedPet = pets.find(p => p.name.toLowerCase() === guess.toLowerCase());

  if (!guessedPet) {
    alert("That pet is not on the list!");
    return;
  }

  guessCount++;

  const resultRow = document.createElement("div");
  resultRow.className = "feedback-row";

  resultRow.innerHTML = `
    <img src="${guessedPet.image}" alt="${guessedPet.name}" class="pet-image" style="width:50px; height:50px; border-radius:8px;">
    <div class="feedback-box ${getHintColor(guessedPet.rarity, correctPet.rarity)}">${guessedPet.rarity}</div>
    <div class="feedback-box ${getHintColor(guessedPet.release, correctPet.release)}">${guessedPet.release}</div>
    <div class="feedback-box ${getColorHint(guessedPet.colors, correctPet.colors)}">${guessedPet.colors.join(", ")}</div>
    <div class="feedback-box ${getHintColor(guessedPet.obtained, correctPet.obtained)}">${guessedPet.obtained}</div>
    <div class="feedback-box ${getHintColor(guessedPet.egg, correctPet.egg)}">${guessedPet.egg}</div>
    <div class="feedback-box ${getHintColor(guessedPet.exclusive, correctPet.exclusive)}">${guessedPet.exclusive}</div>
  `;

  feedbackContainer.prepend(resultRow);
  input.value = "";

  if (guessedPet.name.toLowerCase() === correctPet.name.toLowerCase()) {
    setTimeout(() => {
      alert(`You Win! You guessed today's pet in ${guessCount} tries!`);
    }, 100);
  }
}

function getHintColor(guessValue, correctValue) {
  return guessValue === correctValue ? "green" : "red";
}

function getColorHint(guessColors, correctColors) {
  if (guessColors.length === correctColors.length && guessColors.every(c => correctColors.includes(c))) {
    return "green";
  } else if (guessColors.some(c => correctColors.includes(c))) {
    return "yellow";
  } else {
    return "red";
  }
}

// Optional: add Enter key support for the input
document.getElementById('guessInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitGuess();
});
