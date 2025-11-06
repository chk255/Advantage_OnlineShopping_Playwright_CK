import { Locator, Page , expect} from "@playwright/test"
import { basePage } from "../Utils/basePage"
import { HomePage } from "./HomePage";

export class LoginPage extends basePage{

   private readonly LOGINWITHFACEBOOK:Locator
   private readonly USERNAME:Locator
   private readonly PASSWORD:Locator
   private readonly SIGNINBTN:Locator
   private readonly homePage:HomePage;
   private readonly error:Locator

    constructor(page:Page){
        super(page);
        this.LOGINWITHFACEBOOK=page.getByText('SIGN IN WITH FACEBOOK',{exact:true});
        this.USERNAME=page.locator("input[name='username']")
        this.PASSWORD=page.locator("input[name='password']")
        this.SIGNINBTN=page.getByRole('button' ,{name:'SIGN IN' , exact:true});
        this.error=page.getByText('Incorrect user name or password.');
        this.homePage=new HomePage(this.page);
    }

    async getLOGINWITHFACEBOOK(){
        return this.LOGINWITHFACEBOOK;
    }
    async waitForSIGNINBTN(timeout = 5000) {
        await this.waitForVisibility(this.SIGNINBTN,5000);
    }
    async InvalidLogin(username:string, password:string) {
       //  await  expect(this.SIGNINBTN).not.toBeEnabled();
        await this.USERNAME.fill(username);
        await this.PASSWORD.fill(password);
        await  expect(this.SIGNINBTN).toBeEnabled();
        await  expect(this.SIGNINBTN).toBeVisible();
        await this.click(this.SIGNINBTN);
        await this.waitForVisibility(this.error,5000);
        return await this.error.textContent();
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

    // Waits for the login form to be visible (username input is a reliable signal)
    async waitForLoginForm(timeout = 5000) {
        await this.waitForVisibility(this.USERNAME,5000);
    }



}
