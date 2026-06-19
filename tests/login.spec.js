const { test, expect } = require('@playwright/test');

// Target: https://the-internet.herokuapp.com/login
// Known credentials: tomsmith / SuperSecretPassword!

test.describe('User Authentication Tests', () => {

  test('Verify successful platform user authentication', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    // Populate login form selectors
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    // Dynamic structural assertion — no arbitrary timeouts
    const flashMessage = page.locator('#flash');
    await expect(flashMessage).toContainText('You logged into a secure area!');
  });

  test('Verify failed login shows error message', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Assert error state — dynamic, not timeout-based
    const flashMessage = page.locator('#flash');
    await expect(flashMessage).toContainText('Your username is invalid!');
  });

  test('Verify login page has required UI components', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    // Assert all form elements are present and visible
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Verify logout after successful login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    // Wait for navigation to secure area — dynamic assertion
    await expect(page).toHaveURL(/secure/);

    // Click logout and verify redirect back to login
    await page.click('a[href="/logout"]');
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });

});
