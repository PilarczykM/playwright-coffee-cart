// biome-ignore assist/source/organizeImports: Conflicts with exports
import { test as base } from "@playwright/test";
import { HomePage } from "../poms/home-page";
import { Navigation } from "../components/navigation";
import { Cart } from "../components/cart";
import { ProductList } from "../components/product-list";

type TestFixtures = {
  homePage: HomePage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const navigation = new Navigation(page);
    const cart = new Cart(page);
    const productList = new ProductList(page);
    const homePage = new HomePage(page, navigation, productList, cart);
    await homePage.page.goto("/");
    await use(homePage);
  },
});

export { expect } from "@playwright/test";
