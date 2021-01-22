/// <reference types="cypress" />

/**
 * Filter Cypress tests based on a given tag or tags. If no tags are present, run tests.
 *
 * @param {[string]} definedTags An array of tags
 * @param {Function} runTest All tests captured within a Cypress run
 * @example npm run open --env tags=api
 */
const filterTests = (definedTags, runTest) => {
  if (Cypress.env('TEST_TAGS')) {
    const tags = Cypress.env('TEST_TAGS').split(',');
    console.log(tags);
    const isFound = definedTags.some((definedTag) => tags.includes(definedTag));

    if (isFound) {
      runTest();
    }
  } else {
    runTest();
  }
};

export default filterTests;
