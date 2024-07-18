let coins = 0;
let coinsPerClick = 1; // Coins earned per click
let energy = 1000; // Starting energy value
const maxEnergy = 1000; // Maximum energy value
const energyRechargeRate = 1; // Energy recharge rate
const rechargeInterval = 3000; // Recharge every 3 seconds
let lastUpdateTime = Date.now(); // Track last update time

const feedbackQueue = [];
let inventory = [];
