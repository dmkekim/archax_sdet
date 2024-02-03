const request = require('superwstest')
const backend = require('../../utils/testdataAndParams')

describe('API endpoint test for /purchase-coin', () => {
    const baseUrl = backend.baseUrl
    const purchaseCoin = backend.purchaseCoin
    const getCoins = backend.getCoins
    const purchaseCoinId = 2
    const purchaseAmount = 3

    // This is needed to reset to initial state
    beforeAll(() => {
        request(baseUrl)
            .ws(getCoins)
    })

    it('Default expected behaviors for purchase coin', () => {
        request(baseUrl)
            .post(purchaseCoin)
            .send({
                coinId: purchaseCoinId,
                amount: purchaseAmount
            })
            .expect(200)
            .then(response => {
                const inventory = response.body.inventory
                inventory.forEach((elem) => {
                    if(elem.coinId === purchaseCoinId) {
                        expect(elem.amountOwned).toEqual(purchaseAmount)
                    }
                })
            })
    })
})