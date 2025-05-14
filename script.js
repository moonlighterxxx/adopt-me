const pets = [
  {
    name: "Dog",
    rarity: "Common",
    released: "2019-06-15",
    type: "Mammal",
    image: "https://static.wikia.nocookie.net/adoptme/images/e/e5/Dog.png"
  },
  {
    name: "Dragon",
    rarity: "Legendary",
    released: "2019-06-15",
    type: "Mythical",
    image: "https://static.wikia.nocookie.net/adoptme/images/f/f2/Dragon.png"
  }
  // Add more pets here
];

const todayPet = pets[Math.floor(Math.random() * pets.length)];
const guessInput = document.getElementById("guessInput");
const datalist = document.getElementById("petList");
const feedback = document.getElementById("feedback");

// Populate datalist
pets.forEach(pet => {
  const option = document.createElement("option");
  option.value = pet.name;
  datalist.appendChild(option);
});

function submitGuess() {
  const guess = guessInput.value.trim();
  const guessedPet = pets.find(p => p.name.toLowerCase() === guess.toLowerCase());

  if (!guessedPet) {
    alert("Please select a pet from the list.");
    return;
  }

  const row = document.createElement("div");
  row.className = "guess-row";

  // Pet image
  const img = document.createElement("img");
  img.src = guessedPet.image;
  img.className = "guess-image";
  row.appendChild(img);

  // Name
  row.appendChild(createCell(guessedPet.name === todayPet.name ? "correct" : "wrong", guessedPet.name));

  // Rarity
  row.appendChild(createCell(guessedPet.rarity === todayPet.rarity ? "correct" : "wrong", guessedPet.rarity));

  // Release date
  row.appendChild(createCell(guessedPet.released === todayPet.released ? "correct" : "wrong", guessedPet.released));

  // Type
  row.appendChild(createCell(guessedPet.type === todayPet.type ? "correct" : "wrong", guessedPet.type));

  feedback.appendChild(row);
  guessInput.value = "";
}

function createCell(status, text) {
  const cell = document.createElement("div");
  cell.className = `guess-cell ${status}`;
  cell.textContent = text;
  return cell;
}
