import type { Navigation } from "./components/navigation";
import { expect, test } from "./fixtures/base";

const links: {
  key: keyof typeof Navigation.prototype.selectors;
  text: string;
  link: string;
}[] = [
  { key: "homeLink", text: "menu", link: "/" },
  { key: "cartLink", text: "cart", link: "/cart" },
  { key: "githubLink", text: "github", link: "/github" },
];

test.describe("Navigation", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigation.navigateTo("homeLink");
  });

  for (const { key, text } of links) {
    test(`"${key}" has text "${text}"`, async ({ homePage }) => {
      await expect(homePage.navigation.getSelector(key)).toContainText(text);
    });
  }

  for (const { key, link } of links) {
    test(`"${key}" goes to "${link}"`, async ({ homePage, page }) => {
      await homePage.navigation.navigateTo(key);
      await expect(page).toHaveURL(link);
    });
  }
});
