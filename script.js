const pets = [
  {
    name: "Dog",
    image: "https://i.postimg.cc/FFVLxNxL/Dog.webp",
    rarity: "Common",
    release: "2019",
    colors: ["beige"],
    obtained: "Starter Egg",
    egg: "Yes",
    exclusive: "No"
  },
  {
    name: "Dragon",
    image: "https://i.postimg.cc/5NH1YyNH/Dragon.webp",
    rarity: "Legendary",
    release: "2020",
    colors: ["red", "black"],
    obtained: "Royal Egg",
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

  guesses.push(guessedPet);

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
  guessedPet.colors.forEach(color =>
::contentReference[oaicite:0]{index=0}
 
