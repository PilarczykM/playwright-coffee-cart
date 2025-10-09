import type { Locator, Page } from "@playwright/test";

export class ProductList {
  constructor(private readonly page: Page) {}

  getProductByName(name: string) {
    return this.getAllProducts()
      .filter({
        has: this.page.locator("h4"),
        hasText: new RegExp(`^${name}\\b`, "i"),
      })
      .first();
  }

  getAllProducts() {
    return this.page.locator("ul[data-v-a9662a08] > li");
  }

  getProductDetails = async (product: Locator) => {
    const fullText = await product.innerText();

    const name = fullText?.split(/\s*\$/)[0].trim() || "";
    const price = (await product.locator("small").innerText()).trim();
    return { name, price };
  };
}
