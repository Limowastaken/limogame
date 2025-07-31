let clicks = parseInt(localStorage.getItem('clicks')) || 0;
let upgradeLevel = parseInt(localStorage.getItem('upgradeLevel')) || 1;
let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;
const maxLevel = 10;
const xpPerLevel = 10;

const clickCount = document.getElementById('click-count');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeCostSpan = document.getElementById('upgrade-cost');
const carImage = document.getElementById('car-image');
const clickFloat = document.getElementById('click-float');
const xpBar = document.getElementById('xp-bar');

function updateUI() {
  clickCount.innerText = clicks;
  upgradeCostSpan.innerText = upgradeCost;
  carImage.src = `cars/car${upgradeLevel}.png`;
  xpBar.style.width = `${(clicks % xpPerLevel) / xpPerLevel * 100}%`;
}

function animateClick() {
  clickFloat.style.opacity = 1;
  clickFloat.style.transform = 'translate(-50%, -80%)';
  setTimeout(() => {
    clickFloat.style.opacity = 0;
    clickFloat.style.transform = 'translate(-50%, -50%)';
  }, 300);
}

document.getElementById('car-container').addEventListener('click', () => {
  clicks++;
  localStorage.setItem('clicks', clicks);
  animateClick();
  updateUI();
});

upgradeBtn.addEventListener('click', () => {
  if (clicks >= upgradeCost && upgradeLevel < maxLevel) {
    clicks -= upgradeCost;
    upgradeLevel++;
    upgradeCost = Math.floor(upgradeCost * 1.5);

    localStorage.setItem('clicks', clicks);
    localStorage.setItem('upgradeLevel', upgradeLevel);
    localStorage.setItem('upgradeCost', upgradeCost);

    carImage.classList.add('upgrade-animation');
    setTimeout(() => carImage.classList.remove('upgrade-animation'), 400);

    updateUI();
  }
});

updateUI();
