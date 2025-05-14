const pets = [
  {
    name: "Dog",
    rarity: "Common",
    released: "2019-06-15",
    color: "#c2b280",
    obtained: "Starter Egg",
    egg: "Yes",
    exclusive: "No",
    image: "https://i.postimg.cc/FFVLxNxL/Dog.webp"
  },
  {
    name: "Dragon",
    rarity: "Legendary",
    released: "2019-06-15",
    color: "#ff4f4f",
    obtained: "Hatch",
    egg: "No",
    exclusive: "Yes",
    image: "https://static.wikia.nocookie.net/adoptme/images/f/f2/Dragon.png"
  }
];

const todayPet = pets[Math.floor(Math.random() * pets.length)];
let guessCount = 0;

const guessInput = document.getElementById("guessInput");
const datalist = document.getElementById("petList");
const feedback = document.getElementById("feedback");

guessInput.addEventListener("input", () => {
  datalist.innerHTML = '';
  if (guessInput.value.length > 0) {
    pets.forEach(pet => {
      if (pet.name.toLowerCase().includes(guessInput.value.toLowerCase())) {
        const option = document.createElement("option");
        option.value = pet.name;
        datalist.appendChild(option);
      }
    });
  }
});

function submitGuess() {
  const guess = guessInput.value.trim();
  const guessedPet = pets.find(p => p.name.toLowerCase() === guess.toLowerCase());

  if (!guessedPet) {
    alert("Please select a pet from the list.");
    return;
  }

  guessCount++;

  const row = document.createElement("div");
  row.className = "guess-row";

  row.appendChild(createImageCell(guessedPet.image));
  row.appendChild(createCell(guessedPet.name === todayPet.name ? "correct" : "wrong", guessedPet.name));
  row.appendChild(createCell(guessedPet.rarity === todayPet.rarity ? "correct" : "wrong", guessedPet.rarity));
  row.appendChild(createCell(guessedPet.released === todayPet.released ? "correct" : "wrong", guessedPet.released));

  let colorStatus = "wrong";
  if (guessedPet.color === todayPet.color) colorStatus = "correct";
  else if (todayPet.color.includes(guessedPet.color) || guessedPet.color.includes(todayPet.color)) colorStatus = "partial";
  row.appendChild(createColorCell(colorStatus, guessedPet.color));

  row.appendChild(createCell(guessedPet.obtained === todayPet.obtained ? "correct" : "wrong", guessedPet.obtained));
  row.appendChild(createCell(guessedPet.egg === todayPet.egg ? "correct" : "wrong", guessedPet.egg));
  row.appendChild(createCell(guessedPet.exclusive === todayPet.exclusive ? "correct" : "wrong", guessedPet.exclusive));

  feedback.insertBefore(row, feedback.firstChild);
  guessInput.value = "";

  if (guessedPet.name === todayPet.name) {
    setTimeout(() => {
      alert(`You Win! You guessed today's pet in ${guessCount} tries!`);
      showWinStats();
    }, 300);
  }
}

function createCell(status, text) {
  const cell = document.createElement("div");
  cell.className = `guess-cell ${status}`;
  cell.textContent = text;
  return cell;
}

function createImageCell(src) {
  const cell = document.createElement("div");
  const img = document.createElement("img");
  img.src = src;
  img.className = "guess-image";
  cell.className = "guess-cell";
  cell.appendChild(img);
  return cell;
}

function createColorCell(status, hex) {
  const cell = document.createElement("div");
  cell.className = `guess-cell ${status}`;
  cell.style.backgroundColor = hex;
  cell.textContent = hex;
  return cell;
}

function toggleInstructions() {
  const box = document.getElementById("instructions");
  box.classList.toggle("hidden");
  setTimeout(() => box.classList.toggle("show"), 50);
}

function showWinStats() {
  const stats = document.createElement("div");
  stats.className = "guess-row";
  stats.innerHTML = `
    <div class="guess-cell"><img class="guess-image" src="${todayPet.image}"></div>
    <div class="guess-cell correct">${todayPet.name}</div>
    <div class="guess-cell correct">${todayPet.rarity}</div>
    <div class="guess-cell correct">${todayPet.released}</div>
    <div class="guess-cell correct" style="background-color:${todayPet.color}">${todayPet.color}</div>
    <div class="guess-cell correct">${todayPet.obtained}</div>
    <div class="guess-cell correct">${todayPet.egg}</div>
    <div class="guess-cell correct">${todayPet.exclusive}</div>
  `;
  feedback.insertBefore(stats, feedback.firstChild);
}
