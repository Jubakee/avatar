let coins = 0;
let coinsPerClick = 1; // Coins earned per click
let energy = 1000; // Starting energy value
const maxEnergy = 1000; // Maximum energy value
const energyRechargeRate = 1; // Energy recharge rate
const rechargeInterval = 3000; // Recharge every 3 seconds
let lastUpdateTime = Date.now(); // Track last update time

const feedbackQueue = [];

let level = 1; // Starting level
const levelUpThreshold = 10000; // Coins needed to level up



let inventory = [];
let currentPage = 1; // Keep track of the current page
const itemsPerPage = 12; // Set the number of items per page


const items = [
    { title: 'Wizard Hat', image: './assets/hat1.png', description: '+20 💵 per hour', type: 'item', rarity: 'normal'},
];

