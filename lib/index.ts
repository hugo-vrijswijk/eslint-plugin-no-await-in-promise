import type { ESLint, Rule } from 'eslint';

/**
 * @fileoverview ESLint Plugin to error when using await inside promise statements
 * @author Hugo van Rijswijk
 */
import noAwaitInPromise from './rules/no-await-in-promise';

export const configs: Record<string, ESLint.ConfigData> = {
  recommended: {
    plugins: ['no-await-in-promise'],
    rules: {
      'no-await-in-promise/no-await-in-promise': 'error',
    },
  },
};

export const rules: Record<string, Rule.RuleModule> = {
  'no-await-in-promise': noAwaitInPromise,
};
