/**
 * 1. All web element locators will be placed on this single js file.
 * 2. Locators will be grouped per page, then per section of the page if necessary
 */
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