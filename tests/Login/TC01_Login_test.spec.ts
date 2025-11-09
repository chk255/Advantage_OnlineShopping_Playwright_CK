import {test , expect} from "@playwright/test"
import { LandingPage } from "../../pages/landingPage";
import { LoginPage } from "../../pages/loginPage";
import { HomePage } from "../../pages/HomePage";
import  Jsondata  from "../../Testdata/LoginTestData.json";
import { ENV } from '../../Utils/Env';

let landingPage:LandingPage
let loginPage:LoginPage
let homePage:HomePage


test.beforeEach(async({page})=>{
    landingPage=new LandingPage(page)
    await landingPage.goto(ENV.baseURL);
    loginPage= await landingPage.goto_LoginPage();
    

})

test.describe("Login Test", async()=>{

    test("Login With Valid Credentials", {tag:'@regression'}, async()=>{
     await test.step("Validating Login Page Navigation", async()=>{
        expect(await loginPage.getLOGINWITHFACEBOOK()).toBeTruthy();
        expect(await loginPage.getLOGINWITHFACEBOOK()).toBeVisible();
        console.log("Navigated to Login Page")
    })
    await test.step("Login With No Credentials", async()=>{
        expect(await loginPage.getLOGINWITHFACEBOOK()).toBeTruthy();
        expect(await loginPage.getLOGINWITHFACEBOOK()).toBeVisible();
        console.log("Navigated to Login Page")
        expect(await loginPage.waitForSIGNINBTN()).not.toBeTruthy();
        console.log("***SIGNIN Button is Disabled***")
    })
     await test.step("Login into Application", async()=>{
        try{
        homePage=await loginPage.Login(Jsondata.uname , Jsondata.password);
        console.log("Logged in to Application: Displaying homePage")
        expect(await homePage.getDISPLAYEDUSER()).toBeTruthy();
        expect(await homePage.getDISPLAYEDUSER()).toBeVisible();
        expect(await homePage.getDisplayedUserText()).toContain(Jsondata.uname)
        console.log("username displayed at homePage")
        }
        catch(err){
        const errormsg=await loginPage.InvalidLogin(Jsondata.uname , Jsondata.password);
        expect(errormsg).toBe(Jsondata.errormessage);
        console.log("***Error Message Validated***");
        }
    })
     
})

})
    
