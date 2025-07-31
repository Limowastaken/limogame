const carImage = document.getElementById('car');
const progressBar = document.getElementById('progressBar');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const prestigeDisplay = document.getElementById('prestigePoints');
const upgradeBtn = document.getElementById('upgrade');
const prestigeBtn = document.getElementById('prestige');
const normalShop = document.getElementById('normalShop');
const prestigeShop = document.getElementById('prestigeShop');
const normalTabBtn = document.getElementById('gameTabBtn');
const prestigeTabBtn = document.getElementById('shopTabBtn');
const gameDiv = document.getElementById('gameDiv');
const shopDiv = document.getElementById('shopDiv');

let score = 0;
let progress = 0;
let upgradeLevel = 1;
let clickPower = 1;
let barSpeed = 0.3;
let prestigePoints = 0;
let maxLevel = 10;
let prestigeBonus = 1;
let autoPower = 0;

// Normal shop upgrades (cost balanced)
const upgrades = [
  { name: "+1 Click Power", baseCost: 100, cost: 100, action: () => clickPower++ },
  { name: "+0.2 Bar Speed", baseCost: 150, cost: 150, action: () => barSpeed += 0.2 },
  { name: "Double Score", baseCost: 300, cost: 300, action: () => clickPower *= 2 },
  { name: "Faster Fill", baseCost: 500, cost: 500, action: () => barSpeed *= 1.5 },
  { name: "+3 Click Power", baseCost: 1000, cost: 1000, action: () => clickPower += 3 }
];

// Prestige shop upgrades (cost balanced)
const prestigeUpgrades = [
  { name: "+1 Prestige Point per Prestige", baseCost: 5, cost: 5, action: () => prestigeBonus++ },
  { name: "+0.5 Bar Speed", baseCost: 8, cost: 8, action: () => barSpeed += 0.5 },
  { name: "AutoClicker Boost +1", baseCost: 12, cost: 12, action: () => autoPower += 1 },
  { name: "+5 Click Power", baseCost: 10, cost: 10, action: () => clickPower += 5 },
  { name: "Click Multiplier x2", baseCost: 20, cost: 20, action: () => clickPower *= 2 }
];

function updateDisplays() {
  scoreDisplay.textContent = `Score: ${Math.floor(score)}`;
  levelDisplay.textContent = `Car Level: ${upgradeLevel}`;
  prestigeDisplay.textContent = `Prestige Points: ${prestigePoints}`;
}

function updateCarImage() {
  carImage.src = `cars/car${Math.min(upgradeLevel, maxLevel)}.png`;
}

function clickCar() {
  progress += clickPower;
  if (progress > 100) progress = 100;
  progressBar.style.width = `${progress}%`;

  if (progress >= 100) {
    progress = 0;
    score += Math.floor(upgradeLevel * 15 * barSpeed);
    progressBar.style.width = '0%';
  }
  updateDisplays();
}

function upgradeCar() {
  const cost = Math.floor(100 * Math.pow(1.6, upgradeLevel - 1));
  if (score >= cost && upgradeLevel < maxLevel) {
    score -= cost;
    upgradeLevel++;
    clickPower += 0.7;
    barSpeed += 0.1;
    updateCarImage();
    progress = 0;
    progressBar.style.width = '0%';
    updateDisplays();
  }
}

function autoProgress() {
  progress += 0.1 * barSpeed + autoPower;
  if (progress > 100) progress = 100;
  progressBar.style.width = `${progress}%`;

  if (progress >= 100) {
    progress = 0;
    score += Math.floor(upgradeLevel * 15 * barSpeed);
    progressBar.style.width = '0%';
  }
  updateDisplays();
}

function prestige() {
  if (upgradeLevel === maxLevel) {
    prestigePoints += prestigeBonus;
    score = 0;
    progress = 0;
    upgradeLevel = 1;
    clickPower = 1;
    barSpeed = 0.3;
    updateCarImage();
    updateDisplays();
    progressBar.style.width = '0%';
  } else {
    alert('You need to max your car (level 10) to prestige!');
  }
}

function switchTab(tab) {
  if (tab === 'game') {
    gameDiv.style.display = 'block';
    shopDiv.style.display = 'none';
    normalTabBtn.classList.add('active');
    prestigeTabBtn.classList.remove('active');
  } else if (tab === 'shop') {
    shopDiv.style.display = 'block';
    gameDiv.style.display = 'none';
    prestigeTabBtn.classList.add('active');
    normalTabBtn.classList.remove('active');
  }
}

function renderShops() {
  normalShop.innerHTML = '';
  prestigeShop.innerHTML = '';

  upgrades.forEach((upg, i) => {
    const item = document.createElement('div');
    item.className = 'shopItem';
    const cost = Math.floor(upg.baseCost * Math.pow(1.5, i));
    upg.cost = cost;
    item.textContent = `${upg.name} - ${cost} points`;
    if (score < cost) item.classList.add('disabled');
    else item.classList.remove('disabled');
    item.onclick = () => {
      if (score >= cost) {
        score -= cost;
        upg.action();
        updateDisplays();
        renderShops();
      }
    };
    normalShop.appendChild(item);
  });

  prestigeUpgrades.forEach((upg, i) => {
    const item = document.createElement('div');
    item.className = 'shopItem';
    const cost = Math.floor(upg.baseCost * Math.pow(1.8, i));
    upg.cost = cost;
    item.textContent = `${upg.name} - ${cost} prestige`;
    if (prestigePoints < cost) item.classList.add('disabled');
    else item.classList.remove('disabled');
    item.onclick = () => {
      if (prestigePoints >= cost) {
        prestigePoints -= cost;
        upg.action();
        updateDisplays();
        renderShops();
      }
    };
    prestigeShop.appendChild(item);
  });
}

// Event listeners
carImage.addEventListener('click', clickCar);
upgradeBtn.addEventListener('click', upgradeCar);
prestigeBtn.addEventListener('click', prestige);
normalTabBtn.addEventListener('click', () => switchTab('game'));
prestigeTabBtn.addEventListener('click', () => switchTab('shop'));

// Init
switchTab('game');
updateCarImage();
setInterval(() => {
  autoProgress();
  renderShops();
}, 100);
updateDisplays();
