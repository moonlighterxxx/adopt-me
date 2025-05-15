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

let correctPet = pets[Math.floor(Math.random() * pets.length)];
let guesses = [];

function submitGuess() {
  const input = document.getElementById("guessInput");
  const guess = input.value.trim();
  const pet = pets.find(p => p.name.toLowerCase() === guess.toLowerCase());

  if (!pet) return;

  guesses.unshift(pet);
  input.value = "";
  updateFeedback();

  if (pet.name === correctPet.name) {
    setTimeout(() => {
      alert(`You Win! You guessed today's pet in ${guesses.length} tries!`);
    }, 100);
  }
}

function updateFeedback() {
  const feedback = document.getElementById("feedback");
  feedback.innerHTML = "";

  guesses.forEach((pet, index) => {
    const container = document.createElement("div");
    container.className = "guessRow fadeIn";

    if (index === 0 && pet.name === correctPet.name) {
      const congrats = document.createElement("div");
      congrats.textContent = "🎉 Congrats! 🎉";
      congrats.className = "congratsMessage";
      feedback.appendChild(congrats);
    }

    const img = document.createElement("img");
    img.src = pet.image;
    img.alt = pet.name;
    img.className = "petImage";
    container.appendChild(img);

    const stats = ["rarity", "release", "colors", "obtained", "egg", "exclusive"];
    stats.forEach(key => {
      const box = document.createElement("div");
      box.className = "statBox";

      if (key === "colors") {
        const correctColors = correctPet.colors;
        const matchedColors = pet.colors.filter(color => correctColors.includes(color));

        if (matchedColors.length === pet.colors.length && matchedColors.length === correctColors.length) {
          box.classList.add("green");
        } else if (matchedColors.length > 0) {
          box.classList.add("yellow");
        } else {
          box.classList.add("red");
        }

        pet.colors.forEach(color => {
          const swatch = document.createElement("div");
          swatch.className = "colorSwatch";
          swatch.style.backgroundColor = color;
          swatch.title = color;
          box.appendChild(swatch);
        });

      } else {
        const value = pet[key];
        box.textContent = value;
        if (value === correctPet[key]) {
          box.classList.add("green");
        } else if (typeof value === "string" && typeof correctPet[key] === "string") {
          box.classList.add("yellow");
        } else {
          box.classList.add("red");
        }
      }

      container.appendChild(box);
    });

    feedback.appendChild(container);
  });
}

function filterSuggestions(query) {
  return pets.filter(pet => pet.name.toLowerCase().includes(query.toLowerCase()));
}

document.getElementById("guessInput").addEventListener("input", function () {
  const query = this.value;
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";
  if (!query) return;

  const matches = filterSuggestions(query);
  matches.forEach(pet => {
    const option = document.createElement("div");
    option.className = "suggestionItem";
    option.innerHTML = `<img src="${pet.image}" class="suggestionImage"> ${pet.name}`;
    option.onclick = () => {
      document.getElementById("guessInput").value = pet.name;
      suggestions.innerHTML = "";
    };
    suggestions.appendChild(option);
  });
});
