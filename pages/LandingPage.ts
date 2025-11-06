import { Locator, Page} from "@playwright/test"
import { basePage } from "../Utils/basePage"
import { LoginPage } from "./loginPage";


export class LandingPage extends basePage{

    private readonly LOGINICON:Locator
    private readonly loginPage:LoginPage;
    
    constructor(page:Page){
        super(page);
        this.LOGINICON=page.locator("#menuUserLink");
        this.loginPage=new LoginPage(this.page)
        
    }

    async goto(url:string):Promise<void>{
        await this.navigate(url);
        await this.waitForPageLoad();
    }
    async goto_LoginPage() {
       console.log("**Landing Page Opened**")
       await this.click(this.LOGINICON)
         // Wait for the login form to be visible before returning the page object
         await this.loginPage.waitForLoginForm();
         return this.loginPage;
    }

}
