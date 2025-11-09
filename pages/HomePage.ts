import { Locator, Page , expect} from "@playwright/test"
import { basePage } from "../Utils/basePage"
import { CategoryPage } from "./CategoryPage";


export class HomePage extends basePage{

    private readonly DISPLAYEDUSERNAME:Locator
    private readonly ALLCATEGORY:Locator;
    private readonly categoryPage:CategoryPage

    constructor(page:Page){
        super(page);
      
        this.DISPLAYEDUSERNAME = this.page.locator('#menuUserLink').locator('span').last();
        this.ALLCATEGORY=this.page.locator('div.container div.rowSection div div span');
        this.categoryPage=new CategoryPage(page);
        
    }

    // Return the Locator for the displayed username (raw locator)
    getDisplayedUserLocator(): Locator {
        return this.DISPLAYEDUSERNAME;
    }
    async getCategory(): Promise<Locator[]> {
        return await this.ALLCATEGORY.all();
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
    async SelectCategory(CategoryName:string){

        const categories = await this.getCategory();
        for(const category of categories){
            const text = await category.textContent();
            if(text === CategoryName){
                await category.click();
            }
        }
        return this.categoryPage;

    }

  



}
