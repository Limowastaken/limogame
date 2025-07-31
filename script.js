const carImage = document.getElementById('car');
const progressBar = document.getElementById('progressBar');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const prestigeDisplay = document.getElementById('prestigePoints');
const upgradeBtn = document.getElementById('upgrade');
const prestigeBtn = document.getElementById('prestige');
const normalShop = document.getElementById('normalShop');
const prestigeShop = document.getElementById('prestigeShop');
const gameTabBtn = document.getElementById('gameTabBtn');
const shopTabBtn = document.getElementById('shopTabBtn');
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

let lastScore = -1;
let lastPrestige = -1;

function updateDisplays() {
  scoreDisplay.textContent = `Score: ${Math.floor(score)}`;
  levelDisplay.textContent = `Car Level: ${upgradeLevel}`;
  prestigeDisplay.textContent = `Prestige Points: ${prestigePoints}`;
}

function updateCarImage() {
  carImage.src = `cars/car${Math.min(upgradeLevel, maxLevel)}.png`;
}

function clickCar() {
  // Animate tap
  carImage.classList.add('tap');
  setTimeout(() => carImage.classList.remove('tap'), 200);

  progress += clickPower;
  if (progress > 100) progress = 100;
  progressBar.style.width = `${progress}%`;

  if (progress >= 100) {
    progress = 0;
    if (upgradeLevel === 1) {
      score += 4;
    } else {
      score += Math.floor(upgradeLevel * 15 * barSpeed);
    }
    progressBar.style.width = '0%';
    updateDisplays();
  }
}

function upgradeCar() {
  if (upgradeLevel >= maxLevel) {
    alert('You already maxed out your car!');
    return;
  }
  const cost = Math.floor(100 * Math.pow(1.6, upgradeLevel - 1));
  if (score >= cost) {
    score -= cost;
    upgradeLevel++;
    clickPower += 0.7;
    barSpeed += 0.1;
    updateCarImage();
    progress = 0;
    progressBar.style.width = '0%';
    updateDisplays();
  } else {
    const needed = cost - score;
    alert(`Not enough points to upgrade! Need ${needed} more.`);
  }
}

function autoProgress() {
  progress += 0.1 * barSpeed + autoPower;
  if (progress > 100) progress = 100;
  progressBar.style.width = `${progress}%`;

  if (progress >= 100) {
    progress = 0;
    if (upgradeLevel === 1) {
      score += 4;
    } else {
      score += Math.floor(upgradeLevel * 15 * barSpeed);
    }
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
    const needed = maxLevel - upgradeLevel;
    alert(`You need to max your car (level ${maxLevel}) to prestige! Level up ${needed} more.`);
  }
}

function switchTab(tab) {
  if (tab === 'game') {
    gameDiv.style.display = 'block';
    shopDiv.style.display = 'none';
    gameTabBtn.classList.add('active');
    shopTabBtn.classList.remove('active');
  } else if (tab === 'shop') {
    shopDiv.style.display = 'block';
    gameDiv.style.display = 'none';
    shopTabBtn.classList.add('active');
    gameTabBtn.classList.remove('active');
  }
}

// Optimized shop render only if points changed
function renderShops() {
  if (lastScore === score && lastPrestige === prestigePoints) return;
  lastScore = score;
  lastPrestige = prestigePoints;

  normalShop.innerHTML = '';
  prestigeShop.innerHTML = '';

  upgrades.forEach((upg, i) => {
    const cost = Math.floor(upg.baseCost * Math.pow(1.5, i));
    upg.cost = cost;

    const item = document.createElement('div');
    item.className = 'shopItem';
    item.textContent = `${upg.name} - ${cost} points`;
    if (score < cost) {
      item.classList.add('disabled');
      item.onclick = () => alert(`You need ${cost - score} more points to buy this upgrade.`);
    } else {
      item.onclick = () => {
        score -= cost;
        upg.action();
        updateDisplays();
        renderShops();
      };
    }
    normalShop.appendChild(item);
  });

  prestigeUpgrades.forEach((upg, i) => {
    const cost = Math.floor(upg.baseCost * Math.pow(1.8, i));
    upg.cost = cost;

    const item = document.createElement('div');
    item.className = 'shopItem';
    item.textContent = `${upg.name} - ${cost} prestige`;
    if (prestigePoints < cost) {
      item.classList.add('disabled');
      item.onclick = () => alert(`You need ${cost - prestigePoints} more prestige points to buy this upgrade.`);
    } else {
      item.onclick = () => {
        prestigePoints -= cost;
        upg.action();
        updateDisplays();
        renderShops();
      };
    }
    prestigeShop.appendChild(item);
  });
}

// Event listeners
carImage.addEventListener('click', clickCar);
upgradeBtn.addEventListener('click', upgradeCar);
prestigeBtn.addEventListener('click', prestige);
gameTabBtn.addEventListener('click', () => switchTab('game'));
shopTabBtn.addEventListener('click', () => switchTab('shop'));

// Init
switchTab('game');
updateCarImage();
setInterval(() => {
  autoProgress();
  renderShops();
}, 100);
updateDisplays();
