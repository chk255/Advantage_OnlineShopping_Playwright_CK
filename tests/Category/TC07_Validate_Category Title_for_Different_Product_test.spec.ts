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

test.beforeEach(async({page})=>{
    landingPage=new LandingPage(page)
    await landingPage.goto(ENV.baseURL);
    loginPage= await landingPage.goto_LoginPage();
    homePage=await loginPage.Login(Jsondata.uname , Jsondata.password);
    

})

for(let Product of Products){
test.describe("Validate Category Title", async()=>{

    test(`Validate Category Title at Category Page for ${Product.ProductCategory}`, async()=>{
     
    await test.step("Select Category", async()=>{
        categoryPage=await homePage.SelectCategory(Product.ProductCategory);
    })
      await test.step("Validate Category Title", async()=>{
        expect(await categoryPage.getCategoryTitle()).toBe(Product.ProductCategory);
    })
     
})

})
}
    
