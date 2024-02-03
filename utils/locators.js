export const locators = {
    portfolioPage: {
        balance: 'div.inventory > :nth-child(2)',
        inventoryItems: {
            container: 'div.inventory-item',
            marketValue: 'div.amount-owned'
        },
        coinOptions: {
            container: 'div.container > div.ticket',
            purchaseInput: 'input.purchase-input',
            buyButton: 'button.action-button:contains("Buy")',
            coinPrice: 'div.ticket-price'
        } 
    }
}