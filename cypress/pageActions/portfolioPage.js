import { locators } from "../../utils/locators";
const _ = require('../../utils/testdataAndParams')

export function goToPortfolioPage() {
    switch(Cypress.env('ENVIRONMENT')) {
        case _.envs.qa:
            cy.visit(Cypress.env('baseUrl').qa)
            cy.wait(1000) // Wait till the page is fully loaded before starting the actual test
            break
        case _.envs.dev:
            // TODO
            break
        // TODO other envs
        default:
            // TODO
    }
}

export function checkBalance() {
    cy.get(locators.portfolioPage.balance).invoke('text').then((text) => {
        cy.wrap(text.substring(14)).as('balance')
    })
}

export function countNumberOfCoinOptions() {
    cy.get(locators.portfolioPage.coinOptions.container).then((elem) => {
        cy.wrap(elem.length).as('optionCount')
    })
}

export function buyCoin(buyCoin, amount) {
    const coins = _.coins
    Object.values(coins).forEach((coin, index) => {
        if(coin === buyCoin) {
            cy.get(locators.portfolioPage.coinOptions.purchaseInput).eq(index).type(amount)
            cy.get(locators.portfolioPage.coinOptions.buyButton).eq(index).click()
        } else {
            cy.log('Coin not available')
        }
    })
}

export function getCoinsOwned(buyCoin) {
    const coins = _.coins
    cy.wait(500)
    Object.values(coins).forEach((coin, index) => {
        if(coin === buyCoin) {
            cy.get(locators.portfolioPage.inventoryItems.container).eq(index).find('div').eq(1).invoke('text').then((elem) => {
                cy.wrap(elem.substring(13)).as(`numberOfOwned${coin}`)
            })
        } else {
            cy.log('Coin not available')
        }
    })
}

export function getCoinMarketValue(buyCoin) {
    const coins = _.coins
    Object.values(coins).forEach((coin, index) => {
        if(coin === buyCoin) {
            cy.get(locators.portfolioPage.inventoryItems.marketValue).eq(index).invoke('text').then((elem) => {
                cy.wrap(elem.substring(15)).as(`${coin}MarketValue`)
            })
        } else {
            cy.log('Coin not available')
        }
    })
}

export function getPricePerCoin(buyCoin) {
    const coins = _.coins
    Object.values(coins).forEach((coin, index) => {
        if(coin === buyCoin) {
            cy.get(locators.portfolioPage.coinOptions.coinPrice).eq(index).invoke('text').then((elem) => {
                cy.wrap(elem.substring(1).replace(' / coin', '')).as(`price${coin}`)
            })
        } else {
            cy.log('Coin not available')
        }
    })
}

export function countNumberOfInventoryItems() {
    cy.get(locators.portfolioPage.inventoryItems.container).then((elem) => {
        cy.log(elem.length)
        cy.wrap(elem.length).as('itemCount')
    })
}




