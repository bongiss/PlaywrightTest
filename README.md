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

when pulling from git *package.json exists*
`npm install`