import { test, expect } from '@playwright/test';

test('Landing page loads and has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Digital Product Passport/);
  
  // Verify B2C scan button is present
  const scanButton = page.getByText(/Scan Demo Product|No Demo Product Found/);
  await expect(scanButton).toBeVisible();
});

test('Middleware protects admin routing', async ({ page }) => {
  // Clear the cookie to simulate public
  await page.context().clearCookies();
  await page.goto('/admin');
  
  // Should bounce back to home
  await expect(page).toHaveURL(/.*\/?error=unauthorized_admin/);
});
