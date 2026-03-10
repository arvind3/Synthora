import { expect, test } from "@playwright/test";

test("catalog search and generation smoke", async ({ page }) => {
  test.setTimeout(300000);

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Synthetic Data/i })).toBeVisible();

  await page.getByRole("button", { name: "Explore" }).click();
  await expect(page.getByLabel("Search providers and methods")).toBeVisible();

  await page.getByLabel("Search providers and methods").fill("name");

  const tryButton = page.getByRole("button", { name: "Try" }).first();
  await expect(tryButton).toBeVisible({ timeout: 20000 });
  await tryButton.click();

  await page.getByRole("button", { name: "Generate" }).click();
  await expect(page.getByText("Preview")).toBeVisible();
  await expect(page.locator("[role='alert']")).toHaveCount(0, { timeout: 120000 });
  await expect(page.locator(".preview table tbody tr").first()).toBeVisible({ timeout: 120000 });
});
