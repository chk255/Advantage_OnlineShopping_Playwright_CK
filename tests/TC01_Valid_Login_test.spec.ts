import {test , expect} from "@playwright/test"
import { LandingPage } from "../pages/landingPage";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/HomePage";
import  data  from "../Testdata/LoginTestData.json";
import { ENV } from '../Utils/Env';

let landingPage:LandingPage
let loginPage:LoginPage
let homePage:HomePage

const AUT='https://www.advantageonlineshopping.com/#/';
test.beforeEach(async({page})=>{
    landingPage=new LandingPage(page)
    await landingPage.goto(ENV.baseURL);
    loginPage= await landingPage.goto_LoginPage();
    

})

test.describe("Login with Valid Credential", async()=>{

    test("Login Positive Validation", async()=>{
     await test.step("Validating Login Page Navigation", async()=>{
        expect(await loginPage.getLOGINWITHFACEBOOK()).toBeTruthy();
        expect(await loginPage.getLOGINWITHFACEBOOK()).toBeVisible();
        console.log("Navigated to Login Page")
    })
     await test.step("Login into Application", async()=>{
        homePage=await loginPage.Login(data.uid , data.password);
        console.log("Logged in to Application: Displaying homePage")
    })
    await test.step("Successfully navigated to Dashboard Page", async()=>{
        expect(await homePage.getDISPLAYEDUSER()).toBeTruthy();
        expect(await homePage.getDISPLAYEDUSER()).toBeVisible();
        await expect(await homePage.getDISPLAYEDUSER()).toHaveText('chandan.kumar')
        console.log("username displayed at homePage")
    })
})
    
})