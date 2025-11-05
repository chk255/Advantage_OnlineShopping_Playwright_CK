import { Locator, Page , expect} from "@playwright/test"
import { basePage } from "../Utils/basePage"
import { HomePage } from "./HomePage";

export class LoginPage extends basePage{

   private readonly LOGINWITHFACEBOOK:Locator
   private readonly USERNAME:Locator
   private readonly PASSWORD:Locator
   private readonly SIGNINBTN:Locator
   readonly homePage:HomePage;
    constructor(page:Page){
        super(page);
        this.LOGINWITHFACEBOOK=page.getByText('SIGN IN WITH FACEBOOK',{exact:true});
        this.USERNAME=page.locator("input[name='username']")
        this.PASSWORD=page.locator("input[name='password']")
        this.SIGNINBTN=page.getByRole('button' ,{name:'SIGN IN' , exact:true});
        this.homePage=new HomePage(this.page);
    }

    async getLOGINWITHFACEBOOK(){
        return this.LOGINWITHFACEBOOK;
    }
    async Login(username:string, password:string){
        await  expect(this.SIGNINBTN).not.toBeEnabled();
        await this.USERNAME.fill(username);
        await this.PASSWORD.fill(password);
        await  expect(this.SIGNINBTN).toBeEnabled();
        await  expect(this.SIGNINBTN).toBeVisible();
        await this.click(this.SIGNINBTN);
        return this.homePage;
    }



}
