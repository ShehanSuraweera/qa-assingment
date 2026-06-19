const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [['html', { outputFolder: 'docs', open: 'never' }]],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
  },
});
