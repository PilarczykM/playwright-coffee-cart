import type { Page } from "@playwright/test";
import type { Cart } from "../components/cart";
import type { Navigation } from "../components/navigation";
import type { ProductList } from "../components/product-list";

export class HomePage {
  readonly navigation: Navigation;
  readonly cart: Cart;
  readonly productList: ProductList;

  constructor(
    readonly page: Page,
    navigation: Navigation,
    productList: ProductList,
    cart: Cart,
  ) {
    this.navigation = navigation;
    this.cart = cart;
    this.productList = productList;
  }
}
