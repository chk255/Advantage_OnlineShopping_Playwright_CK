import {test , expect} from "@playwright/test"
import { LandingPage } from "../../pages/landingPage";
import { LoginPage } from "../../pages/loginPage";
import { HomePage } from "../../pages/HomePage";
import  Jsondata  from "../../Testdata/LoginTestData.json";
import { ENV } from '../../Utils/Env';

let landingPage:LandingPage
let loginPage:LoginPage
let homePage:HomePage

const AUT='https://www.advantageonlineshopping.com/#/';
test.beforeEach(async({page})=>{
    landingPage=new LandingPage(page)
    await landingPage.goto(ENV.baseURL);
    loginPage= await landingPage.goto_LoginPage();
    

})

test.describe("Login Test", async()=>{

    test("Login With Invalid Credentials", async()=>{
     await test.step("Validating Login Page Navigation", async()=>{
        expect(await loginPage.getLOGINWITHFACEBOOK()).toBeTruthy();
        expect(await loginPage.getLOGINWITHFACEBOOK()).toBeVisible();
        console.log("Navigated to Login Page")
    })
     await test.step("Login into Application", async()=>{
        const errormsg=await loginPage.InvalidLogin(Jsondata.Invaliduname , Jsondata.Invalidpassword);
        expect(errormsg).toBe(Jsondata.errormessage);
        console.log("***Error Message Validated***");
    })
    
})
   
    
})