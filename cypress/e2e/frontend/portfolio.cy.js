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

    /**
     * The flow on this test is,
     * 1. Buy all 3 coins first.
     * 2. Get amount of coins owned for all 3 coins.
     * 3. Get market value of coin and price per coin, starting with CoinA, then CoinB, then CoinC
     * 4. Then assertions.
     * 
     * This is done this way instead of Buy CoinA -> Get owned amount CoinA -> Get market value and price of CoinA -> assertions for CoinA
     * then do the same for CoinB and then CoinC 
     * is to consider the behavior that market value and price per coin changes every 5 seconds.
     * So we need to do the get market value and price per coin action as close to each other as possible
     * to minimize time difference.
     * 
     * However, despite the current design of this test, it will still fail on this edge case:
     * 1. The initial state of the screen is about to change
     * 2. getCoinMarketValue(CoinA) is fired.
     * 3. State of the screen changes.
     * 4. getPricePerCoin(CoinA) is fired.
     * 5. During assertion, theoretically, this will fail since market value is computed based on the price per coin on previous state.
     * 
     * For this exercise, I assume that this edge case is an exemption. This can be addressed, on top of my head,
     * by working on the "frozen" instance of the DOM.
     */
    it('Verify behaviors after buying three coins', { tags: [_.testTypes.SMOKE] }, () => {
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