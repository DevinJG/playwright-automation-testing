import { expect } from "@playwright/test"

export class PaymentPage{
    constructor(page){
        this.page = page
        
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.creditCardOwner = page.getByPlaceholder("Credit card owner")
        this.creditCardNumber = page.getByPlaceholder("Credit card number")
        this.creditCardExpiration = page.getByPlaceholder("Valid until")
        this.creditCardCvc= page.getByPlaceholder("Credit card CVC")
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText() 
        await this.discountCodeInput.waitFor()   
        await this.discountCodeInput.fill(code)
        await expect(this.discountCodeInput).toHaveValue(code)
 
        // Option 2 for laggy inpits: slow typing
        //await this.discountCodeInput.focus()
        //await this.page.keyboard.type(code, { delay: 1000 })
        //expect (await this.discountCodeInput.inputValue()).toBe(code)

        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActivatedMessage.isVisible()).toBe(false)
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        await this.discountActivatedMessage.waitFor()
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText()
        const discountValueOnlyStringNumber = discountValueText.replace("$","")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber,10)
        
        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$","")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber,10)
        expect(discountValueNumber).toBeLessThan(totalValueNumber)
    }

    fillPaymentDetails = async (creditInfo) => {
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(creditInfo.creditOwner)
        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(creditInfo.creditNumber)
        await this.creditCardExpiration.waitFor()
        await this.creditCardExpiration.fill(creditInfo.expirationDate)
        await this.creditCardCvc.waitFor()
        await this.creditCardCvc.fill(creditInfo.creditCvc)
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/)
    }
}