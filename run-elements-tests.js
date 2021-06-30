// run-elements-tests.js

const cypress = require('cypress')

cypress.run({
  browser: 'chrome',
  env: {
    tags: 'elements',
  },
})