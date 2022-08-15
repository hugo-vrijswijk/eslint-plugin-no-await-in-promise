/**
 * @fileoverview ESLint Plugin to error when using await inside promise statements
 * @author Hugo van Rijswijk
 */
import noAwaitInPromise from './rules/no-await-in-promise';

/** @type {Record<string, import('eslint').ESLint.ConfigData>} */
export const configs = {
  recommended: {
    plugins: ['no-await-in-promise'],
    rules: {
      'no-await-in-promise/no-await-in-promise': 'error',
    },
  },
};

/** @type {Record<string, import('eslint').Rule.RuleModule>} */
export const rules = {
  'no-await-in-promise': noAwaitInPromise,
};
