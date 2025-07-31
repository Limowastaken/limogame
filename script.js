let clicks = parseInt(localStorage.getItem('clicks')) || 0;
let upgradeLevel = parseInt(localStorage.getItem('upgradeLevel')) || 1;
let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;

const clickCount = document.getElementById('click-count');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeCostSpan = document.getElementById('upgrade-cost');
const carImage = document.getElementById('car-image');

function updateUI() {
  clickCount.innerText = clicks;
  upgradeCostSpan.innerText = upgradeCost;
  carImage.src = `cars/car${upgradeLevel}.png`;
}

document.getElementById('car-container').addEventListener('click', () => {
  clicks++;
  localStorage.setItem('clicks', clicks);
  updateUI();
});

upgradeBtn.addEventListener('click', () => {
  if (clicks >= upgradeCost && upgradeLevel < 10) {
    clicks -= upgradeCost;
    upgradeLevel++;
    upgradeCost = Math.floor(upgradeCost * 1.5);

    localStorage.setItem('clicks', clicks);
    localStorage.setItem('upgradeLevel', upgradeLevel);
    localStorage.setItem('upgradeCost', upgradeCost);

    updateUI();
  }
});

updateUI();
