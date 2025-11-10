import { Locator, Page , expect} from "@playwright/test"
import { basePage } from "../Utils/basePage"
import { ProductPage } from "./ProductPage"


export class CategoryPage extends basePage{

    private readonly CategoryPageTitle:Locator
    private readonly ProductsNames:Locator
    private readonly ProductsPrices:Locator
    private readonly productPage:ProductPage
    

    constructor(page:Page){
        super(page);
      
        this.CategoryPageTitle = this.page.locator("h3[class*='categoryTitle']");
        this.ProductsNames=page.locator('div.cell.categoryRight > ul >  li > p:first-of-type');
        this.ProductsPrices=page.locator('div.cell.categoryRight > ul >  li > p:last-of-type');
        this.productPage=new ProductPage(page);
        
        
    }

    async getCategoryTitle(): Promise<string> {
        await this.waitForVisibility(this.CategoryPageTitle,5000);
        return this.CategoryPageTitle.innerText();
    }
     async getProductNames(): Promise<Locator[]> {
        return await this.ProductsNames.all();
    }

    // // Convenience method to return the displayed username text.
    // async getDisplayedUserText(): Promise<string | null> {
    //     await this.waitForVisibility(this.DISPLAYEDUSERNAME,5000);
    //     const txt = await this.DISPLAYEDUSERNAME.textContent();
    //     return txt?.trim() ?? null;
    // }
    async SelectProduct(ProductName:string){
        await this.getCategoryTitle();
        const Names = await this.getProductNames();
        for(const Name of Names){
            const text = await Name.textContent();
            if(text === ProductName){
                await this.click(Name);
            }
        }
        return this.productPage;

    }

  



}
