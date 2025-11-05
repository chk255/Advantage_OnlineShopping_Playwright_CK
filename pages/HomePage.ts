import { Locator, Page , expect} from "@playwright/test"
import { basePage } from "../Utils/basePage"


export class HomePage extends basePage{

   private readonly DISPLAYEDUSERNAME:Locator
//    private readonly USERNAME:Locator
//    private readonly PASSWORD:Locator
//    private readonly SIGNINBTN:Locator
    constructor(page:Page){
        super(page);
        this.DISPLAYEDUSERNAME=page.locator("//span[text()='chandan.kumar']").last();;
        
    }

    async getDISPLAYEDUSER(){
        await this.DISPLAYEDUSERNAME.waitFor({state:"visible"});
        return  this.DISPLAYEDUSERNAME;
    }

  



}
