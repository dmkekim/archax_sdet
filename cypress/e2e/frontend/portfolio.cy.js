import * as $ from '../../pageActions/portfolioPage'
const _ = require('../../../utils/testdataAndParams')

describe('Verify Portfolio page behaviors/validations', () => {
    const initialBalance = '1000'
    const numberOfCoinOptions = 4

    it('Checking defaults of the page on load', { tags: [_.testTypes.SMOKE] }, () => {
        $.goToPortfolioPage()

        // Assert that you begin with a $1000 USD balance
        $.checkBalance()
        cy.get('@balance').then((balance) => {
            expect(balance).to.equal(initialBalance)
        })
        
        // Assert that there are four coin options available
        $.countNumberOfCoinOptions()
        cy.get('@optionCount').then((coinOptionsCount) => {
            expect(coinOptionsCount).to.equal(numberOfCoinOptions)
        })
    })

    it('Verify behaviors after buying a coin', { tags: [_.testTypes.SMOKE] }, () => {
        const noOfCoinAToBuy = '2'
        const noOfCoinBToBuy = '3'
        const noOfCoinCToBuy = '1'

        $.goToPortfolioPage()

        $.buyCoin(_.coins.COIN_A, noOfCoinAToBuy)
        $.buyCoin(_.coins.COIN_B, noOfCoinBToBuy)
        $.buyCoin(_.coins.COIN_C, noOfCoinCToBuy)

        // Assert "Coins owned" has incremented by the quantity you provided
        $.getCoinsOwned(_.coins.COIN_A)
        cy.get('@numberOfOwnedCoinA').then((coinCountAfterPurchase) => {
            expect(coinCountAfterPurchase).to.equal(noOfCoinAToBuy)
        })

        $.getCoinsOwned(_.coins.COIN_B)
        cy.get('@numberOfOwnedCoinB').then((coinCountAfterPurchase) => {
            expect(coinCountAfterPurchase).to.equal(noOfCoinBToBuy)
        })

        $.getCoinsOwned(_.coins.COIN_C)
        cy.get('@numberOfOwnedCoinC').then((coinCountAfterPurchase) => {
            expect(coinCountAfterPurchase).to.equal(noOfCoinCToBuy)
        })

        $.getCoinMarketValue(_.coins.COIN_A)
        $.getPricePerCoin(_.coins.COIN_A)
        $.getCoinMarketValue(_.coins.COIN_B)
        $.getPricePerCoin(_.coins.COIN_B)
        $.getCoinMarketValue(_.coins.COIN_C)
        $.getPricePerCoin(_.coins.COIN_C)

        // Assert that the "Market value" correctly reflects the cost per coin.
        cy.get('@CoinAMarketValue').then((CoinAMarketValue) => {
            cy.get('@priceCoinA').then((priceOfCoinA) => {
                cy.get('@numberOfOwnedCoinA').then((numberOfOwnedCoinA) => {
                    expect(CoinAMarketValue).to.be.equal(`${priceOfCoinA*numberOfOwnedCoinA}`)
                })
            })
        })

        cy.get('@CoinBMarketValue').then((CoinBMarketValue) => {
            cy.get('@priceCoinB').then((priceOfCoinB) => {
                cy.get('@numberOfOwnedCoinB').then((numberOfOwnedCoinB) => {
                    expect(CoinBMarketValue).to.be.equal(`${priceOfCoinB*numberOfOwnedCoinB}`)
                })
            })
        })

        cy.get('@CoinCMarketValue').then((CoinCMarketValue) => {
            cy.get('@priceCoinC').then((priceOfCoinC) => {
                cy.get('@numberOfOwnedCoinC').then((numberOfOwnedCoinC) => {
                    expect(CoinCMarketValue).to.be.equal(`${priceOfCoinC*numberOfOwnedCoinC}`)
                })
            })
        })
    })
})