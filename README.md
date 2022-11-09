how to use:

from scratch:
1. `npm init` to initialise package.json
2. `npm i playwright` to have dependency installed and updated package.json
3. to create playwright devDependencies do:
   `npm init playwright@latest` # Run from your project's root directory
   `npm init playwright@latest new-project` # Or create a new project


execution
`npx playwright test --headed`
`npx playwright test --project=chromium`
`npx playwright test --debug`
running single test file
`npx playwright test {test file}`
Run the test with the title
`npx playwright test -g "add a todo item"`
Run files that have landing or login in the file name
`npx playwright test landing login`

when pulling from git *package.json exists*
`npm install`

sample scripts for docker or CI pipeline:
`"scripts": {`
`    "test": "playwright test"`
`  // "test": "playwright test --browser=all",`
`  // "test-html-report": "playwright test --browser=all --reporter=html",`
`  // "test-json-report": "PLAYWRIGHT_JSON_OUTPUT_NAME=results.json playwright test --browser=chromium --reporter=json"`
`  },`