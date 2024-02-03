const backEndUrl = 'http://localhost:3100'
const purchase = '/purchase-coin'
const getInventory = '/get-inventory'
const getCoins = '/get-coins'
const coins = {
    // Do not alter ordering of entry.
    // Order of entry here should correspond to how they are ordered on screen.
    // This is important to get the correct locators.
    COIN_A: 'CoinA',
    COIN_B: 'CoinB',
    COIN_C: 'CoinC',
    COIN_D: 'CoinD'
}
const environments = {
    dev: 'DEV',
    qa: 'QA',
    staging: 'STAGING',
    prod: 'PROD'
}

const testTypes = {
    SMOKE: 'smoke',
    REGRESSION: 'regression'
}

module.exports = {
    baseUrl: backEndUrl,
    purchaseCoin: purchase,
    getInventory: getInventory,
    getCoins: getCoins,
    coins: coins,
    envs: environments,
    testTypes
}