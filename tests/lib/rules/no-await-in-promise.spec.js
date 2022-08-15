// @ts-check
const rule = require('../../../lib/rules/no-await-in-promise.js');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2017 } });

const arrNames = ['all', 'allSettled', 'any', 'race'];

ruleTester.run('no-await-in-promise', rule, {
  valid: arrNames.flatMap((name) => [
    `async function main() { Promise.${name}([foo]) }`,
    `async function main() { Promise.${name}([foo, bar]) }`,
    `async function main() { Promise.${name}([]) }`,
    `async function main() { ${name}([await foo]) }`,
    `async function main() { ${name}([foo.then(async () => await bar)]) }`,
  ]),
  invalid: arrNames.flatMap((name) => [
    {
      code: `async function main() { Promise.${name}([await foo]) }`,
      errors: [
        {
          messageId: 'noAwaitInPromise',
          data: { name },
          suggestions: [
            {
              messageId: 'removeAwait',
              output: `async function main() { Promise.${name}([foo]) }`,
            },
          ],
        },
      ],
    },
    {
      code: `async function main() { Promise.${name}([foo, await bar()]) }`,
      errors: [
        {
          messageId: 'noAwaitInPromise',
          data: { name },
          suggestions: [
            {
              messageId: 'removeAwait',
              output: `async function main() { Promise.${name}([foo, bar()]) }`,
            },
          ],
        },
      ],
    },
  ]),
});
