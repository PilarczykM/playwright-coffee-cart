import type { Locator } from "@playwright/test";

export const debugLocator = async (locator: Locator) => {
  console.log("count:", await locator.count());
  console.log("visible:", await locator.isVisible());
  console.log("enabled:", await locator.isEnabled());
  console.log("innerText:", await locator.innerText().catch(() => "<no innerText>"));
  console.log("innerHTML:", await locator.innerHTML().catch(() => "<no innerHTML>"));
  console.log("boundingBox:", await locator.boundingBox());
};
