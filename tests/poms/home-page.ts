import type { Page } from "@playwright/test";
import type { Navigation } from "../components/navigation";

export class HomePage {
  readonly navigation: Navigation;
  constructor(
    readonly page: Page,
    navigation: Navigation,
  ) {
    this.navigation = navigation;
  }
}
