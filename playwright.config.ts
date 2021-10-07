// playwright.config.ts
import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {

  timeout: 90000,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,

  testDir: "./tests",

  reporter: [
    ['list'],
    ['junit', {outputFile: 'report.xml'}],
    ['json', {outputFile: 'report.json'}]
  ],             
    
  projects: [
    {
      name: 'Chrome Stable',
      use: {
      browserName: 'chromium',
      // Launch options
      headless: false,
      // Context options
      viewport: { width: 1280, height: 1024 },
      ignoreHTTPSErrors: true,
      // Testing options
      screenshot: 'on',
      // slowMo:100,
      video: 'on', //'retain-on-failure', //'on'
      },
    },
        // {
        //   name: 'Desktop Safari',
        //   use: {
        //     browserName: 'webkit',
        //     viewport: { width: 1200, height: 750 },
        //   }
        // },
        // {
        //   name: 'Mobile Chrome',
        //   use: devices['Pixel 5'],
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: devices['iPhone 12'],
        // },
        // {
        //   name: 'Desktop Firefox',
        //   use: {
        //     browserName: 'firefox',
        //     viewport: { width: 1280, height: 1024 },
        //     headless: false,
        //     ignoreHTTPSErrors: true,
        //     // Testing options
        //     video: 'retain-on-failure',
        //     screenshot: 'on',
        //   }
        // },
      ],

};
export default config;