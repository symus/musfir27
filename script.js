const countdownEl = document.getElementById('countdown');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const playRandomMusicBtn = document.getElementById('playRandomMusic');
const birthdayMessageSection = document.getElementById('birthdayMessage');
const giftImages = document.querySelectorAll('.gifts img');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const popupOkBtn = document.getElementById('popupOk');
const toggleBalloonsBtn = document.getElementById('toggleBalloons');
const playHbdMusicBtn = document.getElementById('playHbdMusic');
const balloonContainer = document.getElementById('balloon-container');

let countdownInterval;
let balloonsInterval;
let balloonsActive = false;

const partySongs = [
  // Add URLs or local audio files for random birthday tunes or fallback
  'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg',
  'https://actions.google.com/sounds/v1/cartoon/boing.ogg',
  'https://actions.google.com/sounds/v1/cartoon/pop.ogg'
];

// Set target date - October 27 2025, 00:00:00 local time
const targetDate = new Date('2025-10-27T00:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    countdownEl.textContent = '';
    showBirthdayMessage();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days.toString().padStart(2, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function showBirthdayMessage() {
  birthdayMessageSection.classList.remove('hidden');
}

function playRandomSong() {
  const audio = new Audio();
  const randomIndex = Math.floor(Math.random() * partySongs.length);
  audio.src = partySongs[randomIndex];
  audio.loop = false;
  audio.play().catch(() => {});
  return audio;
}

function playHbdMusic() {
  const audio = new Audio('hbd.mp3');
  audio.loop = false;
  audio.play().catch(() => {});
  return audio;
}

let currentAudio = null;

// Play random song button handler
playRandomMusicBtn.addEventListener('click', () => {
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = playRandomSong();
});

// Gift image click handler for popup
giftImages.forEach((img) => {
  img.addEventListener('click', () => {
    const message = img.getAttribute('data-gift') || 'Here is your gift!';
    popupMessage.textContent = message;
    popup.classList.remove('hidden');
  });
});

// Popup OK button closes popup
popupOkBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// Balloon creation and animation
function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#9b59b6', '#3498db', '#e67e22'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.backgroundColor = color;

  balloon.style.left = Math.random() * window.innerWidth + 'px';
  balloon.style.width = balloon.style.height = (20 + Math.random() * 30) + 'px';
  balloon.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);

  balloonContainer.appendChild(balloon);

  // Animate balloon upwards and drifting sideways
  let posY = window.innerHeight + 50;
  let posX = parseFloat(balloon.style.left);
  const drift = (Math.random() - 0.5) * 2; // horizontal drift

  function animate() {
    if (!balloonsActive) {
      balloon.remove();
      return;
    }
    posY -= 2 + Math.random(); 
    posX += drift;
    balloon.style.top = posY + 'px';
    balloon.style.left = posX + 'px';
    if (posY < -60) {
      balloon.remove();
    } else {
      requestAnimationFrame(animate);
    }
  }
  animate();
}

toggleBalloonsBtn.addEventListener('click', () => {
  if (!balloonsActive) {
    balloonsActive = true;
    toggleBalloonsBtn.textContent = 'Stop Balloons';
    balloonsInterval = setInterval(createBalloon, 350);
  } else {
    balloonsActive = false;
    toggleBalloonsBtn.textContent = 'Start Balloons';
    clearInterval(balloonsInterval);
    balloonContainer.innerHTML = '';
  }
});

playHbdMusicBtn.addEventListener('click', () => {
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = playHbdMusic();
});

// Initialize countdown immediately and start interval
updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);
