how to use:

1. install node manager on your machine
2. run `npm i -D @playwright/test`
3. install test browser `npx playwright install`
4. to run tests `npx playwright test`
5. if module error occurs, kindly delete the module folder and start from step 2.

extras for the experts:
1. to have a headles run, change the configuration file `playwright.config.ts` headless : true
2. the test suite is running parallel, if dont want that option, change the config workers:1
3. Playwright can run all browsers at once, please help yourself to play around with it.
4. to use debug mode using PW's inspector tool, add `--debug` in cli run test command.
5. Videos and screenshots are recorded during the time of execution. change this option in config file if you want to have them only during failures.
6. Videos and Screenshots are saved under `..\test-results\`
7. Number of retries for test failures can also be changed in the config file at `retries` field.
8. I take advantage of the parallel run in playwright. if you wish to disable this, kindly remove `.parallel` in the test.describe