export class myAccountPage {
    constructor(page) {
        this.page = page 
    }

    visit = async () => {
        await this.page.goto("/my-account")
       
    }
}