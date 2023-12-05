import { defineConfig } from '@playwright/test';
import { config } from '../../playwright.config.base';

export default defineConfig({
  ...config,
  webServer: {
    command: 'npm run start:sasha1107',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
