const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'docs', open: 'never' }],
  ],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
  },
});
