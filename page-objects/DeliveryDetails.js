import { expect } from "@playwright/test"

export class DeliveryDetails{
    constructor(page){
        this.page = page

        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByPlaceholder('Last name')
        this.streetName = page.getByPlaceholder('Street')
        this.postCode = page.getByPlaceholder('Post code')
        this.city = page.getByPlaceholder('City')
        this.countryDropDown = page.getByRole('combobox')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('.saved-address-container')
        this.savedAddressFirstName = page.locator('.saved-address-firstName')
        this.savedAddressLastName = page.locator('.saved-address-lastName')
        this.savedAddressStreet = page.locator('.saved-address-street')
        this.savedAddressPostcode = page.locator('.saved-address-postcode')
        this.savedAddressCity = page.locator('.saved-address-city')
        this.savedAddressCountry = page.locator('.saved-address-country')
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async (userAddress) =>{
        await this.firstName.waitFor()
        await this.firstName.fill(userAddress.firstName)
        await this.lastName.waitFor()
        await this.lastName.fill(userAddress.lastName)
        await this.streetName.waitFor()
        await this.streetName.fill(userAddress.street)
        await this.postCode.waitFor()
        await this.postCode.fill(userAddress.postCode)
        await this.city.waitFor()
        await this.city.fill(userAddress.city)
        await this.countryDropDown.waitFor()
        await this.countryDropDown.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)

        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstName.inputValue())
        
        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastName.inputValue())

        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetName.inputValue())

        await this.savedAddressPostcode.first().waitFor()
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCode.inputValue())

        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.city.inputValue())

        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropDown.inputValue())
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/)
    }
}