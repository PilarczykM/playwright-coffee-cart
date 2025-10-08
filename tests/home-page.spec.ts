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

test.describe("Cart", () => {
  test.only("should open payment modal when clicking checkout button", async ({ homePage }) => {
    await homePage.cart.openPaymentModel();
    await expect(homePage.page.getByText("Payment details")).toBeVisible();
  });
});

test.describe("Product list", () => {
  const defaultProductName = "Espresso";
  test("Verify that all coffee items are displayed with their name and price", async ({
    homePage,
  }) => {
    const products = await homePage.productList.getAllProducts().all();
    for (const product of products) {
      const { name, price } = await homePage.productList.getProductDetails(product);
      expect(name.length).toBeGreaterThan(0);
      expect(price.length).toBeGreaterThan(0);
    }
  });

  test("Verify that double-clicking on a coffee title translates it to Chinese.", async ({
    homePage,
  }) => {
    const product = homePage.productList.getProductByName(defaultProductName);
    const heading = product.locator("h4");
    await heading.dblclick();
    await expect(heading).not.toHaveText(defaultProductName);
  });

  test("Verify that right-clicking on a coffee icon opens an 'add to cart' dialog", async ({
    homePage,
  }) => {
    const product = homePage.productList.getProductByName(defaultProductName);
    await product.click({ button: "right" });

    const dialog = homePage.page.locator("dialog", {
      hasText: `Add ${defaultProductName} to the cart?`,
    });
    await expect(dialog).toBeVisible();
  });

  test.only("Verify that adding a 3rd item to the cart triggers a promo coffee pop-up.", async ({
    homePage,
  }) => {
    const clickCount = 3;
    const promoDivLocator = "div.promo";

    await expect(homePage.page.locator(promoDivLocator)).not.toBeVisible();

    await homePage.productList.getProductByName(defaultProductName).click({ clickCount });

    await expect(homePage.page.locator(promoDivLocator)).toBeVisible();
  });
});
