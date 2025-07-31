let score = 0;
let prestigePoints = 0;
let upgradeLevel = 1;
let progress = 0;
let clickPower = 1;
let barSpeed = 0.5;
const maxLevel = 10;

const scoreEl = document.getElementById('score');
const prestigeEl = document.getElementById('prestige');
const progressBar = document.getElementById('progressBar');
const carImage = document.getElementById('carImage');

document.getElementById('upgradeBtn').onclick = upgradeCar;
document.getElementById('prestigeBtn').onclick = prestige;

carImage.addEventListener('click', () => {
  progress += clickPower;
  if (progress >= 100) {
    progress = 0;
    score += 4 * upgradeLevel;
    updateDisplays();
  }
  updateBar();
});

function updateBar() {
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function updateCarImage() {
  carImage.src = `cars/car${upgradeLevel}.png`;
}

function updateDisplays() {
  scoreEl.textContent = score;
  prestigeEl.textContent = prestigePoints;
  updateCarImage();
}

function upgradeCar() {
  if (upgradeLevel >= maxLevel) {
    alert('Maxed out! Prestige to go further.');
    return;
  }
  const cost = Math.floor(100 * Math.pow(1.6, upgradeLevel - 1));
  if (score >= cost) {
    score -= cost;
    upgradeLevel++;
    clickPower += 0.7;
    barSpeed += 0.2;
    progress = 0;
    updateDisplays();
    updateBar();
  } else {
    alert(`You need ${cost - score} more points to upgrade.`);
  }
}

function prestige() {
  if (upgradeLevel < maxLevel) {
    alert('Upgrade to max first!');
    return;
  }
  const prestigeCost = 1000;
  if (score >= prestigeCost) {
    score = 0;
    upgradeLevel = 1;
    clickPower = 1;
    barSpeed = 0.5;
    prestigePoints += 1;
    progress = 0;
    updateDisplays();
    updateBar();
    alert('Prestige complete!');
  } else {
    alert(`Need ${prestigeCost - score} more points to prestige.`);
  }
}

function switchTab(tab) {
  document.getElementById('gameDiv').classList.add('hidden');
  document.getElementById('shopDiv').classList.add('hidden');

  if (tab === 'game') {
    document.getElementById('gameDiv').classList.remove('hidden');
  } else {
    document.getElementById('shopDiv').classList.remove('hidden');
  }
}

setInterval(() => {
  progress += barSpeed;
  if (progress >= 100) {
    progress = 0;
    score += 4 * upgradeLevel;
    updateDisplays();
  }
  updateBar();
}, 100);
