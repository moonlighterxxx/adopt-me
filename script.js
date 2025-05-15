// script.js

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

const correctPet = pets[Math.floor(Math.random() * pets.length)];
const feedbackContainer = document.getElementById("feedback");
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
  resultRow.className = "result-row";

  resultRow.innerHTML = `
    <img src="${guessedPet.image}" alt="${guessedPet.name}" class="pet-image">
    <div class="hint ${getHintColor(guessedPet.rarity, correctPet.rarity)}">${guessedPet.rarity}</div>
    <div class="hint ${getHintColor(guessedPet.release, correctPet.release)}">${guessedPet.release}</div>
    <div class="hint ${getColorHint(guessedPet.colors, correctPet.colors)}">${guessedPet.colors.join(", ")}</div>
    <div class="hint ${getHintColor(guessedPet.obtained, correctPet.obtained)}">${guessedPet.obtained}</div>
    <div class="hint ${getHintColor(guessedPet.egg, correctPet.egg)}">${guessedPet.egg}</div>
    <div class="hint ${getHintColor(guessedPet.exclusive, correctPet.exclusive)}">${guessedPet.exclusive}</div>
  `;

  feedbackContainer.prepend(resultRow);
  input.value = "";

  if (guessedPet.name === correctPet.name) {
    setTimeout(() => {
      alert(`You Win! You guessed today's pet in ${guessCount} tries!`);
    }, 100);
  }
}

function getHintColor(guessValue, correctValue) {
  if (guessValue === correctValue) return "green";
  return "red";
}

function getColorHint(guessColors, correctColors) {
  if (guessColors.every(color => correctColors.includes(color)) && guessColors.length === correctColors.length) {
    return "green";
  } else if (guessColors.some(color => correctColors.includes(color))) {
    return "yellow";
  } else {
    return "red";
  }
}
