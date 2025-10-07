import { test as setup } from "@playwright/test";

const baseFile = "tests/setup/.auth/storageState.json";

setup("authenticate", async ({ page, baseURL }) => {
  if (!baseURL) {
    throw new Error("baseURL is not defined in the configuration.");
  }
  await page.goto(baseURL);
  await page.context().storageState({ path: baseFile });
});
