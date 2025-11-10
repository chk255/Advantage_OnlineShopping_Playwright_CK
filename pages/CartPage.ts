import { Locator, Page , expect} from "@playwright/test"
import { basePage } from "../Utils/basePage"


export class CartPage extends basePage{

    private readonly CHECKOUTBTN:Locator
    

    constructor(page:Page){
        super(page);
      
        this.CHECKOUTBTN=page.locator('#checkOutButton');
        
        
    }

    get CheckOutBTN():Locator{
         this.waitForVisibility(this.CHECKOUTBTN,10000);
         return this.CHECKOUTBTN;

    }



  



}
