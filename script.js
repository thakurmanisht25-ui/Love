const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonsArea = document.getElementById("buttonsArea");
const attemptsText = document.getElementById("attemptsText");

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.getElementById("closeModalBtn");
const celebration = document.getElementById("celebration");

let dodgeCount = 0;
let celebrationTimer = null;

const NO_IMAGE = "assets/sorry-image.jpeg";
const YES_IMAGE = "assets/forgive-image.jpg";

function updateAttempts() {
  attemptsText.textContent = `Try count: ${Math.min(dodgeCount, 4)} / 4`;
}

function setNoButtonRandomPosition() {
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, areaRect.width - btnRect.width - 10);
  const maxY = Math.max(0, areaRect.height - btnRect.height - 10);

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none";
}

function showModal(imageSrc, title, text) {
  modalImage.src = imageSrc;
  modalTitle.textContent = title;
  modalText.textContent = text;
  imageModal.classList.remove("hidden");
}

function closeModal() {
  imageModal.classList.add("hidden");
}

function makeHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "💖" : "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = 18 + Math.random() * 24 + "px";
  celebration.appendChild(heart);

  setTimeout(() => heart.remove(), 4200);
}

function makeConfetti() {
  const conf = document.createElement("span");
  conf.className = "confetti";
  const colors = ["#ff7eb6", "#ffd6e7", "#ffffff", "#d9b3ff", "#ffb3c7"];
  conf.style.background = colors[Math.floor(Math.random() * colors.length)];
  conf.style.left = Math.random() * 100 + "vw";
  conf.style.top = "-20px";
  conf.style.transform = `rotate(${Math.random() * 360}deg)`;
  celebration.appendChild(conf);

  setTimeout(() => conf.remove(), 3800);
}

function startCelebration() {
  celebration.classList.remove("hidden");

  for (let i = 0; i < 24; i++) {
    setTimeout(makeHeart, i * 120);
  }

  for (let i = 0; i < 36; i++) {
    setTimeout(makeConfetti, i * 70);
  }

  if (celebrationTimer) clearInterval(celebrationTimer);
  celebrationTimer = setInterval(() => {
    makeHeart();
    makeConfetti();
  }, 180);

  setTimeout(() => {
    clearInterval(celebrationTimer);
    celebrationTimer = null;
  }, 5000);
}

function handleNoClick(e) {
  e.preventDefault();

  if (dodgeCount < 4) {
    dodgeCount++;
    updateAttempts();

    noBtn.classList.add("floating");
    setNoButtonRandomPosition();

    if (dodgeCount === 4) {
      attemptsText.textContent = "Okay... one last try 😏";
    }
  } else {
    showModal(
      NO_IMAGE,
      "Caught you 😘",
      "You tried 5 times already. Now look at this cute surprise and stop being mad at me."
    );
  }
}

function handleYesClick() {
  startCelebration();
  showModal(
    YES_IMAGE,
    "Yayyy 💖",
    "Thank you for forgiving me. You mean so much to me, and I love you from the bottom of my heart."
  );
}

noBtn.addEventListener("click", handleNoClick);
noBtn.addEventListener("pointerdown", handleNoClick);
noBtn.addEventListener("pointerenter", () => {
  if (window.innerWidth > 700) {
    handleNoClick(new Event("click"));
  }
});

yesBtn.addEventListener("click", handleYesClick);
closeModalBtn.addEventListener("click", closeModal);

imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) closeModal();
});

window.addEventListener("resize", () => {
  if (dodgeCount > 0 && dodgeCount < 4) {
    setNoButtonRandomPosition();
  }
});

updateAttempts();
