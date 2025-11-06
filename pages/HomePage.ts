import { Locator, Page , expect} from "@playwright/test"
import { basePage } from "../Utils/basePage"


export class HomePage extends basePage{

    private readonly DISPLAYEDUSERNAME:Locator

    constructor(page:Page){
        super(page);
        // Use a robust locator that finds the last span under the user menu link.
        // This avoids hardcoding a specific username and uses Playwright's built-in locators.
        this.DISPLAYEDUSERNAME = this.page.locator('#menuUserLink').locator('span').last();
        
    }

    // Return the Locator for the displayed username (raw locator)
    getDisplayedUserLocator(): Locator {
        return this.DISPLAYEDUSERNAME;
    }

    // Backwards-compatible method (keeps older test code working)
    async getDISPLAYEDUSER(): Promise<Locator> {
        await this.waitForVisibility(this.DISPLAYEDUSERNAME,5000);
        return this.DISPLAYEDUSERNAME;
    }

    // Convenience method to return the displayed username text.
    async getDisplayedUserText(): Promise<string | null> {
        await this.waitForVisibility(this.DISPLAYEDUSERNAME,5000);
        const txt = await this.DISPLAYEDUSERNAME.textContent();
        return txt?.trim() ?? null;
    }

  



}
