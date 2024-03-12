import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:8080',
    browser: 'chrome',
  },
});
