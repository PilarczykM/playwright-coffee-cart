import type { Navigation } from "./components/navigation";
import { expect, test } from "./fixtures/base";

const DEFAULT_PRODUCT_NAME = "Espresso";
const ANOTHER_PRODUCT_NAME = "Cappuccino";

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

test.describe("Cart button", () => {
  test("should open payment modal when clicking checkout button", async ({ homePage }) => {
    await homePage.cart.openPaymentModel();
    await expect(homePage.page.getByText("Payment details")).toBeVisible();
  });

  test("should add item to cart when clicking on product", async ({ homePage }) => {
    await homePage.productList.getProductByName(DEFAULT_PRODUCT_NAME).click();

    await expect(homePage.cart.getCartItem(DEFAULT_PRODUCT_NAME)).toContainText(
      DEFAULT_PRODUCT_NAME,
    );
    await expect(homePage.cart.getCartItemQuantity(DEFAULT_PRODUCT_NAME)).toContainText("1");
  });

  test("should increase item quantity when clicking add button", async ({ homePage }) => {
    const expectedQuantity = "2";

    await homePage.productList.getProductByName(DEFAULT_PRODUCT_NAME).click();
    await homePage.cart.hoverCart();
    await homePage.cart.getCartItemAddButton(DEFAULT_PRODUCT_NAME).click();

    await expect(homePage.cart.getCartItemQuantity(DEFAULT_PRODUCT_NAME)).toContainText(
      expectedQuantity,
    );
  });

  test("should decrease item quantity when clicking remove button", async ({ homePage }) => {
    const expectedQuantity = "1";
    const clickCount = 2;

    await homePage.productList
      .getProductByName(DEFAULT_PRODUCT_NAME)
      .click({ clickCount: clickCount });
    await homePage.cart.hoverCart();
    await homePage.cart.getCartItemRemoveButton(DEFAULT_PRODUCT_NAME).click();

    await expect(homePage.cart.getCartItemQuantity(DEFAULT_PRODUCT_NAME)).toContainText(
      expectedQuantity,
    );
  });

  test("should remove item from cart when quantity is 0", async ({ homePage }) => {
    await homePage.productList.getProductByName(DEFAULT_PRODUCT_NAME).click();
    await homePage.productList.getProductByName(ANOTHER_PRODUCT_NAME).click();
    await homePage.cart.hoverCart();
    await homePage.cart.getCartItemRemoveButton(DEFAULT_PRODUCT_NAME).click();

    await expect(homePage.cart.getCartItem(DEFAULT_PRODUCT_NAME)).not.toBeVisible();
  });

  test("should update total price when adding items to cart", async ({ homePage }) => {
    const product = homePage.productList.getProductByName(DEFAULT_PRODUCT_NAME);
    const { price } = await homePage.productList.getProductDetails(product);
    await test.step("Add first item to cart and check price", async () => {
      await product.click();
      await expect(homePage.cart.selectors.checkoutButton).toContainText(`${price}`);
    });

    await test.step("Add second item to cart and check price", async () => {
      await homePage.cart.hoverCart();
      await homePage.cart.getCartItemAddButton(DEFAULT_PRODUCT_NAME).click();
      const totalPrice = (Number(price.replace("$", "")) * 2).toFixed(2);

      await expect(homePage.cart.selectors.checkoutButton).toContainText(`${totalPrice}`);
    });

    await test.step("Remove one item from cart and check price", async () => {
      await homePage.cart.getCartItemRemoveButton(DEFAULT_PRODUCT_NAME).click();
      await expect(homePage.cart.selectors.checkoutButton).toContainText(`${price}`);
    });
  });
});

test.describe("Product list", () => {
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
    const product = homePage.productList.getProductByName(DEFAULT_PRODUCT_NAME);
    const heading = product.locator("h4");
    await heading.dblclick();
    await expect(heading).not.toHaveText(DEFAULT_PRODUCT_NAME);
  });

  test("Verify that right-clicking on a coffee icon opens an 'add to cart' dialog", async ({
    homePage,
  }) => {
    const product = homePage.productList.getProductByName(DEFAULT_PRODUCT_NAME);
    await product.click({ button: "right" });

    const dialog = homePage.page.locator("dialog", {
      hasText: `Add ${DEFAULT_PRODUCT_NAME} to the cart?`,
    });
    await expect(dialog).toBeVisible();
  });

  test("Verify that adding a 3rd item to the cart triggers a promo coffee pop-up.", async ({
    homePage,
  }) => {
    const clickCount = 3;
    const promoDivLocator = "div.promo";

    await expect(homePage.page.locator(promoDivLocator)).not.toBeVisible();

    await homePage.productList.getProductByName(DEFAULT_PRODUCT_NAME).click({ clickCount });

    await expect(homePage.page.locator(promoDivLocator)).toBeVisible();
  });

  test("Verify that an error is thrown when adding a coffee to the cart with the `?breakable=1` parameter.", async ({
    homePage,
  }) => {
    const errors: string[] = [];
    homePage.page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await homePage.page.goto("/?breakable=1");
    const product = homePage.productList.getProductByName(DEFAULT_PRODUCT_NAME);
    await product.click();

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toMatch(/broken/);
  });

  test("Verify that hovering over the `Pay` button shows a quick cart preview.", async ({
    homePage,
  }) => {
    await homePage.productList.getProductByName(DEFAULT_PRODUCT_NAME).click();
    await homePage.cart.hoverCart();

    await expect(homePage.cart.selectors.cartItems).toHaveClass(/show/);
  });
});

test.skip("@performance Verify that the page loads slower when the `?ad=1` parameter is present.", async ({
  browser,
  baseURL,
}) => {
  const minimalDeviations = 200;

  const makeAbsolute = (path: string) => (baseURL ? new URL(path, baseURL).toString() : path);

  const measure = async (path: string) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const url = makeAbsolute(path);
    await page.goto(url, { waitUntil: "load" });

    const duration = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (nav) return nav.duration;
    });

    await context.close();
    return duration as number;
  };

  const normal = await measure("/");
  const ad = await measure("/?ad=1");

  const delta = ad - normal;
  expect(delta).toBeGreaterThan(minimalDeviations);
});
