import {test , expect} from "@playwright/test"
import { LandingPage } from "../../pages/landingPage";
import { LoginPage } from "../../pages/loginPage";
import { HomePage } from "../../pages/HomePage";
import { CategoryPage } from "../../pages/CategoryPage";
import  Jsondata  from "../../Testdata/LoginTestData.json";
import Products from "../../Testdata/Products.json";
import { ENV } from '../../Utils/Env';

let landingPage:LandingPage
let loginPage:LoginPage
let homePage:HomePage
let categoryPage:CategoryPage
const ProductName1='HP Elite x2 1011 G1 Tablet';

test.beforeEach(async({page})=>{
    landingPage=new LandingPage(page)
    await landingPage.goto(ENV.baseURL);
    loginPage= await landingPage.goto_LoginPage();
    homePage=await loginPage.Login(Jsondata.uname , Jsondata.password);
    

    })


test.describe("Validate Category Title", async()=>{
 test(`Validate Category Title at Category Page for ${Products[1].ProductName}`, async()=>{
     
     await test.step("Login into Application", async()=>{
        console.log("Logged in to Application: Displaying homePage")
        expect(await homePage.getDISPLAYEDUSER()).toBeTruthy();
        expect(await homePage.getDISPLAYEDUSER()).toBeVisible();
        expect(await homePage.getDisplayedUserText()).toContain(Jsondata.uname)
        console.log("username displayed at homePage")
    })
    await test.step("Select Category", async()=>{
        categoryPage=await homePage.SelectCategory(Products[1].ProductName);
        expect(await categoryPage.getCategoryTitle() ).toBe(Products[1].ProductName);
    })
      await test.step("Validate Category Title", async()=>{
        expect(await categoryPage.getCategoryTitle()).toBe(Products[1].ProductName);
    })
     await test.step("Select Product", async()=>{
        await categoryPage.SelectProduct(ProductName1);
    })

})
   
})
