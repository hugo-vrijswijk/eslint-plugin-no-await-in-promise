import rule from '../../rules/no-await-in-promise.js';
import { RuleTester } from 'eslint';
import { it, describe } from 'node:test';
const ruleTester = new RuleTester({});

RuleTester.it = it;
RuleTester.describe = describe;
RuleTester.itOnly = it.only;

const arrNames = ['all', 'allSettled', 'any', 'race'];

ruleTester.run('no-await-in-promise', rule, {
  valid: arrNames.flatMap((name) => [
    `async () => Promise.${name}([foo])`,
    `async () => Promise.${name}([foo, bar])`,
    `async () => Promise.${name}([])`,
    `async () => ${name}([await foo])`,
    `async () => ${name}([foo.then(async () => await bar)])`,
    `async () => { await Promise.${name}([foo()]) }`,
  ]),
  invalid: arrNames.flatMap((name) => [
    {
      code: `async () => Promise.${name}([await foo])`,
      output: `async () => Promise.${name}([foo])`,
      errors: [{ messageId: 'noAwaitInPromise', data: { name } }],
    },
    {
      code: `async () => Promise.${name}([foo, await bar()])`,
      output: `async () => Promise.${name}([foo, bar()])`,
      errors: [{ messageId: 'noAwaitInPromise', data: { name } }],
    },
  ]),
});
