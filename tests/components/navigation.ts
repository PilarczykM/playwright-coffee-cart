import type { Page } from "@playwright/test";

export class Navigation {
  constructor(private readonly page: Page) {}

  get selectors() {
    return {
      homeLink: this.page.getByRole("link", { name: "Menu page" }),
      cartLink: this.page.getByRole("link", { name: "Cart page" }),
      githubLink: this.page.getByRole("link", { name: "GitHub page" }),
    };
  }

  navigateTo = async (location: keyof typeof this.selectors) => {
    await this.selectors[location].click();
  };

  getSelector = (name: keyof typeof this.selectors) => {
    return this.selectors[name];
  };
}
