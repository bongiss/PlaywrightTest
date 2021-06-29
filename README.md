**Get started**

**Playwright 1.12.0 has been released**
```
https://playwright.dev/docs/test-intro/
```
**Tech Assessment Summary**
```
 I've used Page Object Model Framework using Playwright automation tool. I chose this framework as it fits my free time at the moment. Though I know BDD, creating a feature file takes a lot of time and pressure on me. I also chose Playwright tool because this is the current automation tool that I've been playing around and did a Proof of Concept in my company to replace our current automation tool. Please bear with me regarding my scripting skills, I've known a lot of programming languages, e.g. ruby, java,javascript,typescript, vbscript, perl,python but I'm not a master of one. I've used typescript and still learning from it.

Most of the scenarios I've covered are end to end (mostly starts from registration of users). Every car vote and selection is randomly selected and not hard coded, though limited only to page one. Random String generator is also created to have dynamic user though passwords are all the same with "Qwerty.101". New instance of chromium is created every test scenario run. Screenshots are also captured on each of the tests. Video recording is also available on failure, can be configured as well when pass (instructions below). Retries and headless run can also be configured below.

I came up with total of 11 scenarios, 9 are passing and 2 are known bugs and my scripts will report it as failure with screenshots and video. Videos can be watched using chrome browser.

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







