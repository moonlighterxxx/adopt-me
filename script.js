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

const answer = pets[1]; // change daily if needed
let guesses = [];

const guessInput = document.getElementById("guessInput");
const feedbackContainer = document.getElementById("feedbackContainer");
const autocompleteList = document.getElementById("autocompleteList");
const petDetailBox = document.getElementById("petDetailBox");

document.getElementById("howToPlayToggle").onclick = () => {
  const popup = document.getElementById("howToPlayPopup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
};

guessInput.addEventListener("input", () => {
  const val = guessInput.value.toLowerCase();
  autocompleteList.innerHTML = "";
  if (val.length === 0) {
    autocompleteList.style.display = "none";
    return;
  }
  const matches = pets.filter(p => p.name.toLowerCase().startsWith(val));
  matches.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${p.image}" /> ${p.name}`;
    li.onclick = () => {
      guessInput.value = p.name;
      autocompleteList.style.display = "none";
      submitGuess();
    };
    autocompleteList.appendChild(li);
  });
  autocompleteList.style.display = matches.length ? "block" : "none";
});

function submitGuess() {
  const val = guessInput.value.trim().toLowerCase();
  const guessedPet = pets.find(p => p.name.toLowerCase() === val);
  if (!guessedPet) return;

  guesses.unshift(guessedPet);

  const row = document.createElement("div");
  row.className = "feedback-row";

  const feedback = [
    guessedPet.name,
    guessedPet.rarity === answer.rarity ? "green" : "red",
    guessedPet.release === answer.release ? "green" : "red",
    colorMatch(guessedPet.colors, answer.colors),
    guessedPet.obtained === answer.obtained ? "green" : "red",
    guessedPet.egg === answer.egg ? "green" : "red",
    guessedPet.exclusive === answer.exclusive ? "green" : "red"
  ];

  const colorsBox = document.createElement("div");
  colorsBox.className = `feedback-box ${feedback[3].status}`;
  guessedPet.colors.forEach(color => {
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.background = color;
    swatch.setAttribute("data-color", color);
    colorsBox.appendChild(swatch);
  });

  row.innerHTML = `
    <div class="feedback-box"><img src="${guessedPet.image}" width="40" /></div>
    <div class="feedback-box ${feedback[1]}">${guessedPet.rarity}</div>
    <div class="feedback-box ${feedback[2]}">${guessedPet.release}</div>
  `;
  row.appendChild(colorsBox);
  row.innerHTML += `
    <div class="feedback-box ${feedback[4]}">${guessedPet.obtained}</div>
    <div class="feedback-box ${feedback[5]}">${guessedPet.egg}</div>
    <div class="feedback-box ${feedback[6]}">${guessedPet.exclusive}</div>
  `;

  feedbackContainer.prepend(row);

  if (guessedPet.name === answer.name) {
    showWinPopup();
    showCorrectPet(guessedPet);
  }
}

function showWinPopup() {
  alert(`www.weblink says:\nYou Win! You guessed today's pet in ${guesses.length} tries!`);
}

function showCorrectPet(pet) {
  petDetailBox.innerHTML = `
    <div class="pet-card">
      <img src="${pet.image}" />
      <div class="pet-info">
        <p><strong>Name:</strong> ${pet.name}</p>
        <p><strong>Rarity:</strong> ${pet.rarity}</p>
        <p><strong>Release:</strong> ${pet.release}</p>
        <p><strong>Colors:</strong> ${pet.colors.join(", ")}</p>
        <p><strong>Obtained:</strong> ${pet.obtained}</p>
        <p><strong>Egg?</strong> ${pet.egg}</p>
        <p><strong>Exclusive?</strong> ${pet.exclusive}</p>
      </div>
    </div>
  `;
}

function colorMatch(guessColors, answerColors) {
  const allMatch = guessColors.every(c => answerColors.includes(c)) && guessColors.length === answerColors.length;
  const someMatch = guessColors.some(c => answerColors.includes(c));
  return {
    status: allMatch ? "green" : someMatch ? "yellow" : "red"
  };
}
