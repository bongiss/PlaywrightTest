how to use:

1. install and setup `NodeJs` on your machine -- `https://nodejs.org/en/download/`
2. run `npm i -D @playwright/test`
3. install test browsers `npx playwright install`
4. to run tests `npx playwright test`
5. if module error occurs, kindly delete the module folder and start from step 2.

extras for the experts:
1. to have a headles run, change the configuration file `playwright.config.ts` headless : true
2. I take advantage of the parallel run in playwright. if you wish to disable this, kindly remove `.parallel` in the test.describe
3. Playwright can run different browsers at once --firefox, webkit(safari), mobile etc., please help yourself to play around with it.
4. to use debug mode using PW's inspector tool, add `--debug` in cli run test command.
5. Videos and screenshots are recorded during the time of execution. change this option in config file if you want to have them only during failures.
6. Videos and Screenshots are saved under `..\test-results\`
7. Number of retries for test failures can also be changed in the config file at `retries` field.