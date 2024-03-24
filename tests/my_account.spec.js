import { test } from "@playwright/test"
import { myAccountPage } from "./../page-objects/MyAccountPage.js"
import { getLoginToken } from "./../api-calls/getLoginToken.js"
import { adminDetails } from "./../data/userDetails.js"

test("My Account using cookie injection and mocking network request", async ({page}) => {

    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })

    })

    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    const myAccount = new myAccountPage(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenInsideBrowserCode])=> {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
})