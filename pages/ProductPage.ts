import { Locator, Page , expect} from "@playwright/test"
import { basePage } from "../Utils/basePage"
import { CartPage } from "./CartPage"
import { createTracing } from "trace_events"


export class ProductPage extends basePage{

    private readonly Header:Locator
    private readonly ADDTOCART:Locator
    readonly cartPage:CartPage
    

    constructor(page:Page){
        super(page);
      
        this.Header=page.locator('#Description h1');
        this.ADDTOCART=page.getByRole("button",{name:'ADD TO CART', exact:true});
        this.cartPage=new CartPage(page)
        
        
    }


    // Convenience method to return the displayed header text.
    async getDisplayedHeaderText(): Promise<string | null> {
        await this.waitForVisibility(this.Header,10000);
        const txt = await this.Header.textContent();
        return txt?.trim() ?? null;
    }
    async AddtoCart(){
        await this.click(this.ADDTOCART);
        await this.GoToCart();
        return this.cartPage;

    }

  



}
