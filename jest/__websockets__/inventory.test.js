const request = require('superwstest')
const backend = require('../../utils/testdataAndParams');

describe('Verify /get-inventory endpoint functionalities', () => {
    afterEach(() => {
        request.closeAll();
      });

    const baseUrl = backend.baseUrl
    const getInventory = backend.getInventory
    const purchaseCoin = backend.purchaseCoin
    const coinIdPriceIncrementTest = 3
    const coinBasePriceIncrementTest = 100
    const purchaseCoinId = 3
    const purchaseAmount = 4

    it('CoinB coin price should increase 1 dollar for every message received in client side', async () => {
        await request(baseUrl)
            .ws(getInventory)
            .expectJson((resp) => {
                // Check initial price of CoinB, which is 100.
                resp.coins.forEach(coin => {
                    if(coin.id === coinIdPriceIncrementTest) {
                        expect(coin.price).toEqual(coinBasePriceIncrementTest)
                    }
                });                
            })
            .expectJson((resp) => {
                // Check price of CoinB after receiving next message.
                // It should increment by 1
                resp.coins.forEach(coin => {
                    if(coin.id === coinIdPriceIncrementTest) {
                        expect(coin.price).toEqual(coinBasePriceIncrementTest + 1)
                    }
                });   
            })
        }
    )

    it('Check changes in inventory after a coin purchase', async () => {
        await request(baseUrl)
            .ws(getInventory)
            .expectJson() // Gets the first message before the purchase-coin event.
            .exec(async() => {
                await request(baseUrl)
                    .post(purchaseCoin)
                    .send({
                        coinId: purchaseCoinId,
                        amount: purchaseAmount
                    })
                    .expect(200)
            })
            // Gets the message after the purchase-coin event
            .expectJson((resp) => {
                resp.inventory.forEach(item => {
                    if(item.coinId === purchaseCoinId) {
                        expect(item.amountOwned).toEqual(purchaseAmount)
                    }
                })
            })
        }
    )
})