import {Page , Locator} from "@playwright/test"

export class basePage{
     readonly page:Page;
     private readonly CartButton:Locator;

     constructor(page:Page){
        this.page=page;
        this.CartButton=page.locator('#menuCart');
     }
     async navigate(url:string):Promise<void>{
        await this.page.goto(url , {waitUntil:'load'});
     }
     async waitForPageLoad():Promise<void>{
        await this.page.waitForLoadState('networkidle');
     }
     async waitForVisibility(locator:Locator,timeout=15000) {
        await locator.waitFor({ state: 'visible', timeout });
     }

     async GoToCart(){
      await this.waitForVisibility(this.CartButton);
      await this.CartButton.click();
     }

      async click(Element: Locator) {
    // Ensure the element is visible and enabled before clicking
    await Element.waitFor({ state: 'visible', timeout: 15000 });

    // Try clicking and retry a couple of times if the click is intercepted
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await Element.click();
        return;
      } catch (err) {
        // If this was the last attempt, rethrow
        if (attempt === maxAttempts) throw err;
      }
    }
  }



}