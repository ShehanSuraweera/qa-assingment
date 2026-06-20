const { test, expect } = require('@playwright/test');

// Target: https://the-internet.herokuapp.com (baseURL set in playwright.config.js)
// Known credentials: tomsmith / SuperSecretPassword!

const CREDENTIALS = {
  valid:   { username: 'tomsmith',  password: 'SuperSecretPassword!' },
  invalid: { username: 'wronguser', password: 'wrongpassword' },
};

async function login(page, { username, password }) {
  await page.goto('/login');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
}

test.describe('User Authentication Tests', () => {

  test('Verify successful platform user authentication', async ({ page }) => {
    await login(page, CREDENTIALS.valid);

    // Dynamic structural assertion — no arbitrary timeouts
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('Verify failed login shows error message', async ({ page }) => {
    await login(page, CREDENTIALS.invalid);

    // Assert error state — dynamic, not timeout-based
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Verify login page has required UI components', async ({ page }) => {
    await page.goto('/login');

    // Assert all form elements are present and visible
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Verify logout after successful login', async ({ page }) => {
    await login(page, CREDENTIALS.valid);

    // Wait for navigation to secure area — dynamic assertion
    await expect(page).toHaveURL(/secure/);

    // Click logout and verify redirect back to login
    await page.click('a[href="/logout"]');
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });

});
