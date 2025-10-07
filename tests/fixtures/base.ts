import { test as base } from "@playwright/test";
import { HomePage } from "../poms/home-page";
import { Navigation } from "../components/navigation";

type TestFixtures = {
  homePage: HomePage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    page.goto("/");
    const navigation = new Navigation(page);
    await use(new HomePage(page, navigation));
  },
});

export { expect } from "@playwright/test";
