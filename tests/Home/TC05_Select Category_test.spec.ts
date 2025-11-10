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
const Category='SPEAKERS'
const Category2='MICE'

test.beforeEach(async({page})=>{
    landingPage=new LandingPage(page)
    await landingPage.goto(ENV.baseURL);
    loginPage= await landingPage.goto_LoginPage();
    homePage=await loginPage.Login(Jsondata.uname , Jsondata.password);
    

})

test.describe("Select Category", async()=>{

    test("Select Category at Home Page",{tag:"@regression"}, async()=>{
     
     await test.step("Login into Application", async()=>{
        console.log("Logged in to Application: Displaying homePage")
        expect(await homePage.getDISPLAYEDUSER()).toBeTruthy();
        expect(await homePage.getDISPLAYEDUSER()).toBeVisible();
        expect(await homePage.getDisplayedUserText()).toContain(Jsondata.uname)
        console.log("username displayed at homePage")
    })
    await test.step("Select Category", async()=>{
        categoryPage=await homePage.SelectCategory(Products[0].ProductCategory);
        expect(await categoryPage.getCategoryTitle() ).toBe(Products[0].ProductCategory);
    })
      await test.step("Validate user navigates to Category Page", async()=>{
        expect(await categoryPage.getCategoryTitle()).toBe(Products[0].ProductCategory);
    })
     
})

})
    
