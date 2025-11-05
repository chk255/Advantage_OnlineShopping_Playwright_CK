import {test , expect} from "@playwright/test"
import { LandingPage } from "../pages/landingPage";
import { LoginPage } from "../pages/loginPage";
import  data  from "../Testdata/LoginTestData.json"
import { ENV } from '../Utils/Env'

let landingPage:LandingPage
let loginPage:LoginPage

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
        console.log("Test case is passed")
    })
    await test.step("Login into Application", async()=>{
        await loginPage.Login(data.uid , data.password);
        console.log("Test case is passed")
    })
})
    
})