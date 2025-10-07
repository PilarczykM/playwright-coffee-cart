// biome-ignore assist/source/organizeImports: Conflicts with exports
import { test as base } from "@playwright/test";
import { HomePage } from "../poms/home-page";
import { Navigation } from "../components/navigation";

type TestFixtures = {
  homePage: HomePage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const navigation = new Navigation(page);
    const homePage = new HomePage(page, navigation);
    await homePage.page.goto("/");
    await use(homePage);
  },
});

export { expect } from "@playwright/test";
