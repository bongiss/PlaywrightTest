**Get started**

**Playwright 1.12.0 has been released**
```
https://playwright.dev/docs/test-intro/
```

**Installation**

```
npm install playwright
npm i -D @playwright/test
```
**How to run**
```
1. Kindly install node js (can be downloaded here : https://nodejs.org/en/download/)
2. git clone my repo
3. inside my repo please run `npm install playwright`.
4. run `npm i -D @playwright/test` too.
5. to execute, `npx playwright test`
6. test screenshots are available at `test-results` folder. each scenario will have its own folder.
```
**View Test Results and screenshots**
```
test-results/
```

**Helpful Configurations**
```
./playwright.config.ts
1. `retries: 1` - indicates how many retries when a test scenario fails
2.  `workers: 6`, - indicates how may parallel runs. however, it is only usable when running with multiple test files or multiple browsers.
3. `headless:false`, can be run headlessly when true, screenshots are still available.
4. `video: 'retain-on-failure'`, will save a video recording when the test failed. can be set to `on` so all test will have a recorded video regardless of run status.
5. feel free to comment out the other browsers to see the multiple browser run, however, the application becomes unstable when i tried with both chromium and firefox, but still you are free to do so.
```







