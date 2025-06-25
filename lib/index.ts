import type { ESLint, Linter, Rule } from 'eslint';
import pkg from '../package.json' with { type: 'json' };
import noAwaitInPromise from './rules/no-await-in-promise.js';

const { version } = pkg;

/**
 * @fileoverview ESLint Plugin to error when using await inside promise statements
 * @author Hugo van Rijswijk
 */

const plugin = {
  meta: {
    name: 'eslint-plugin-no-await-in-promise',
    version,
  },
  configs: {},
  rules: {
    'no-await-in-promise': noAwaitInPromise,
  },
  processors: {},
} satisfies ESLint.Plugin;

export const configs = {
  recommended: {
    name: 'no-await-in-promise/recommended',
    plugins: {
      'no-await-in-promise': plugin,
    },
    rules: {
      'no-await-in-promise/no-await-in-promise': 'error',
    },
  },
} satisfies Record<string, Linter.Config>;
Object.assign(plugin.configs, configs);

export const rules: Record<string, Rule.RuleModule> = {
  'no-await-in-promise': noAwaitInPromise,
};

export default plugin as typeof plugin & { configs: typeof configs };
