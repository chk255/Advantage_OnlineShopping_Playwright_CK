import {test , expect} from "@playwright/test"
import { LandingPage } from "../../pages/landingPage";
import { LoginPage } from "../../pages/loginPage";
import { HomePage } from "../../pages/HomePage";
import { CategoryPage } from "../../pages/CategoryPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import  Jsondata  from "../../Testdata/LoginTestData.json";
import Products from "../../Testdata/Products.json";
import { ENV } from '../../Utils/Env';

let landingPage:LandingPage
let loginPage:LoginPage
let homePage:HomePage
let categoryPage:CategoryPage
let productPage:ProductPage
let cartPage:CartPage
const ProductName1='HP Elite x2 1011 G1 Tablet';// HP ELITE X2 1011 G1 TABLET 

test.beforeEach(async({page})=>{
    landingPage=new LandingPage(page)
    await landingPage.goto(ENV.baseURL);
    loginPage= await landingPage.goto_LoginPage();
    homePage=await loginPage.Login(Jsondata.uname , Jsondata.password);
    categoryPage=await homePage.SelectCategory(Products[1].ProductCategory);
    productPage=await categoryPage.SelectProduct(ProductName1);
    

    })
//,{tag:'@main'}

test.describe("Add Product to the cart", async()=>{
 test("Validate Product Page Header",{tag:'@main'}, async()=>{

    await test.step("Validate Product Page Header", async()=>{
        expect(await productPage.getDisplayedHeaderText()).toBeTruthy();
        expect(await productPage.getDisplayedHeaderText()).toBe(ProductName1.toUpperCase());

    })
    await test.step("Add to Cart", async()=>{
        
        cartPage=await productPage.AddtoCart();
        expect(cartPage.CheckOutBTN).toBeTruthy();
        expect(cartPage.CheckOutBTN).toBeEnabled();
        expect(cartPage.CheckOutBTN).toBeVisible();

    })

})
   
})
